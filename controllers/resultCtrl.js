const Result = require('../database/schema/result');
const Quiz = require('../database/schema/quiz');

const util = require('../utils/resultUtil');

const createResult = async (req,res)=>{
    const id = req.user.id;
    const body = req.body;
    body.student = id;

    try{
        const result = new Result(body);
        result.student = id;
        const quiz = await Quiz.findById(result.quiz);
        result.score = util.calculateScore(result.responses,quiz.questions)
        const doc = await result.save()

        return res.status(200).json({
            success:true,
            result:doc,
        })
        
    }catch(err){
        console.log("Error",err);
            return res.status(500).json({
                success:false,
                msg:"Internal server error!",
            })
    }
    
}

const updateResult = async (req,res)=>{
    const body = req.body;
    console.log("Body",body);
    const quiz = await Quiz.findById(body.quiz);
    //Calculating the score
    body.score = util.calculateScore(body.responses,quiz.questions);
    Result.updateOne({_id:body._id},body)
    .then((doc)=>{
        return res.status(200).json({
            success:true,
            result:doc,
        })
    }).catch((err)=>{
        console.log("Error",err);
        return res.status(500).json({
            success:false,
            msg:"Internal Server Error!",
        })
    })
}

const getResultById = async (req,res)=>{
    const id = req.headers.id;
    try{
        const result = await Result.findById(id);
        return res.status(200).json({
            success:true,
            result:result,
        });
    }catch(err){
        return res.status(500).json({
            success:false,
            msg:"Internal Server Error!",
        })
    }
    
}

const getResultByQuizandStudent = (req,res)=>{
    const quiz = req.headers.quiz;
    const id = req.user.id;

    console.log("Quiz",quiz);
    console.log("Id",id);

    Result.findOne({$and:[{quiz:quiz},{student:id}]})
    .then((doc)=>{
        console.log("Document",doc);
        return res.status(200).json({
            success:true,
            result:doc
        })
    }).catch((err)=>{
        console.log("Error",err);
        return res.status(500).json({
            success:false,
            msg:"Internal Server Error!",
        })
    })
}

const getResultOfSubject = (req,res)=>{
    const subjectId = req.headers.subject;

    Result.find({subject:subjectId})
    .then((docs)=>{
        console.log("Docs",docs);
        return res.status(200).json({
            success:true,
            results:docs,
            average:util.getAverageMarks(docs),
            attendance:util.getPercentageStudents(docs),
        })
    }).catch((err)=>{
        console.log("Error",err);

        return res.status(500).json({
            success:false,
            msg:"Internal Server Error!",
        });
    });

}

const getResultOfStudent = (req,res)=>{

}

module.exports = {createResult,updateResult,getResultById,getResultByQuizandStudent,getResultOfSubject};