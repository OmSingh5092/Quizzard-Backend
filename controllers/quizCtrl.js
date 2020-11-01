const { $where } = require('../database/schema/quiz');
const Quiz = require('../database/schema/quiz');
const Student = require('../database/schema/student');
const websocket = require('../websocket');
const schedule = require('node-schedule');

const createQuiz = (req,res)=>{
    const body = req.body;
    const id = req.user.id;
    const quiz = new Quiz(body);
    quiz.faculty = id;
    quiz.save()
    .then((doc)=>{
        var date = new Date(parseInt(doc.start_time));
        console.log("Quiz",doc);
        //Setting timer for making quiz live
     
        schedule.scheduleJob(date,function(){
            console.log("Making quiz live!");
            Quiz.updateOne({_id:doc._id},{is_live:true})
            .then((update)=>{
                websocket.quizSocket.quizStart(doc._id);
            }).catch((err)=>{
                console.log("Error",err);
            })
        })
        date = new Date(parseInt(doc.end_time));
        //Setting timer for stopping live quiz
        schedule.scheduleJob(date,function(){
            console.log("Stopping live quiz!")
            Quiz.updateOne({_id:doc._id},{is_live:false,is_completed:true})
            .then((update)=>{
                websocket.quizSocket.quizStop(doc._id);
            }).catch((err)=>{
                console.log("Error",err);
            })
        })

        return res.status(200).json({
            success:true,
            quiz:doc,
        })
    }).catch((err)=>{
        console.log("Error",err);
        return res.status(500).json({
            success:false,
            msg:"Internal Server Error!"
        })
    })

}

const updateQuiz = (req,res)=>{
    const id = req.user.id;
    const body = req.body;
    Quiz.updateOne({_id:body._id},body)
    .then((doc)=>{
        return res.status(200).json({
            success:true,
            quiz:doc,
        })
    }).catch((err)=>{
        console.log("Error",err);
        return res.status(500).json({
            success:false,
            msg:"Update Unsuccessfull",
        })
    })
}

const deleteQuiz = (req,res) =>{
    const quizId = req.headers.id;
    const id = req.user.id;
    

    Quiz.findByIdAndDelete(quizId).then((doc)=>{
        return res.status(200).json({
            success:true,
            quiz:doc,
        })
    }).catch((err)=>{
        console.log("Error",err);
        return res.status(500).json({
            success:false,
            msg:"Delete Unsuccessfull!",
        })
    })
}

const getQuizByFaculty = (req,res)=>{
    const id = req.user.id;
    //taking completed argument from the header
    const completed = req.headers.completed;

    Quiz.find({$and:[{faculty:id},{is_completed:completed}]})
    .then((docs)=>{
        return res.status(200).json({
            success:true,
            quizzes: docs,
        })
    }).catch((err)=>{
        console.log("Error",err);
        return res.status(500).json({
            success:false,
            msg:"Internal Server Error!",
        })
    })
}

const getQuizBySubject = (req,res)=>{
    const id = req.headers.id;

    Quiz.find({subject:id})
    .then((docs)=>{
        return res.status(200).json({
            success:true,
            quizzes:docs,
        })
    }).catch((err)=>{
        return res.status(500).json({
            success:false,
            msg:"Internal Server Error!",
        })
    })
}

const getQuizByStudent = async (req,res)=>{
    const id = req.user.id;

    //taking completed argument from the header
    const completed = req.headers.completed;

    try{
        const student = await Student.findById(id);

        console.log("Student",student);
        const condition = [];
        student.subjects.map((item,index)=>{
            condition.push({subject:item});
        })

        if(condition.length ==0){
            return res.status(200).json({
                success:true,
                quizzes:[],
            })
        }

        const quizzes = await Quiz.find({$and:[{$or:condition},{is_completed:completed}]});

        return res.status(200).json({
            success:true,
            quizzes:quizzes,
        })
    }catch(err){
        console.log("Error",err);
        res.status(500).json({
            success:false,
            msg:"Internal Server Error!",
        })
    }
}

const getQuiz = async (req,res)=>{
    const id = req.headers.id;
    try{
        const quiz = await Quiz.findById(id);
        return res.status(200).json({
            success:true,
            quiz:quiz,
        })
    }catch(err){
        console.log("Error",err);
        return res.status(500).json({
            success:false,
            msg:"Internal server error!",
        })
    }
}

module.exports = {createQuiz,deleteQuiz,updateQuiz,getQuizByFaculty,getQuizBySubject,getQuizByStudent,getQuiz};