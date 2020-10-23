const Quiz = require('../database/schema/quiz');
const Student = require('../database/schema/student');
const websocket = require('../websocket');

const createQuiz = (req,res)=>{
    const body = req.body;

    const quiz = new Quiz(body);
    
    quiz.save()
    .then((doc)=>{
        const date = new Date();
        console.log("Quiz",doc);
        //Setting timer for making quiz live
     
        setTimeout(function(){
            console.log("Making quiz live!");
            Quiz.updateOne({_id:doc._id},{is_live:true})
            .then((doc)=>{
                websocket.quizSocket.quizStart(doc._id);
            })
            
        }, parseInt(quiz.start_time)-date.getTime());

        //Setting timer for stopping live quiz
        setTimeout(function(){
            console.log("Stopping live quiz!")
            Quiz.updateOne({_id:doc._id},{is_live:false})
            .then((doc)=>{
                websocket.quizSocket.quizStop(doc._id);
            })
            
        },parseInt(quiz.end_time)-date.getTime())

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

const getQuizByFaculty = (req,res)=>{
    const id = req.user.id;

    Quiz.find({faculty:id})
    .then((docs)=>{
        return res.status(200).json({
            success:true,
            quizzes: docs,
        })
    }).catch((err)=>{
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

        const quizzes = await Quiz.find({$or:condition});

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

module.exports = {createQuiz,getQuizByFaculty,getQuizBySubject,getQuizByStudent,getQuiz};