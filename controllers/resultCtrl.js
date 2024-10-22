const Result = require('../database/schema/result');
const Quiz = require('../database/schema/quiz');
const Student = require('../database/schema/student');

const util = require('../utils/resultUtil');
const { json } = require('express');
const result = require('../database/schema/result');
const { $where } = require('../database/schema/student');

const createResult = async (req,res)=>{
    const id = req.user.id;
    const body = req.body;
    body.student = id;

    try{
        const result = new Result(body);
        result.student = id;
        const quiz = await Quiz.findById(result.quiz);
        result.score = util.calculateScore(result.responses,quiz.questions)
        result.total = util.calculateTotal(quiz.questions);
        result.submit_time = new Date().getTime();
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
    body.submit_time = new Date().getTime();
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

    Result.findOne({$and:[{quiz:quiz}]})
    .then((doc)=>{
        console.log("Document",doc);
        
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

const getResultByStudent = (req,res)=>{
    const id = req.user.id;
    
    Result.find({student:id})
    .then((docs)=>{
        const date = new Date().getTime();
        var validResults =[];
        docs.map((item,index)=>{
            if(parseInt(item.end_time)<date){
                validResults.push(item);
            }
        })
        console.log("Valid Results",validResults);
        return res.status(200).json({
            success:true,
            results:validResults,
        })
    }).catch((err)=>{
        console.log("Error",err);
        return res.status(500).json({
            success:false,
            msg:"Internal Server Error",
        })
    })
}

const getResultOfSubject = async (req,res)=>{
    const subjectId = req.headers.subject;

    try{
        const results = await Result.find({subject:subjectId})
        const attendance = await  util.getPercentageStudents(results)
        
        var studentIds = [];

        results.map((item,index)=>{
            studentIds.push(item.student);
        });

        const students = await Student.find({_id:{$all:studentIds}});
        const studentMap = {};

        students.map((item,index)=>{
            studentMap[item._id] = item;
        })
        console.log("Students",studentMap);

        console.log("Attendance",attendance);
        return res.status(200).json({
            success:true,
            results:results,
            students:studentMap,
            average:util.getAverageMarks(results),
            attendance: attendance
        });
    }catch(err){
        console.log("Error",err);

        return res.status(500).json({
            success:false,
            msg:"Internal Server Error!",
        });
    }

}

const getResultOfStudent = (req,res)=>{

}

module.exports = {createResult,updateResult,getResultByStudent,getResultById,getResultByQuizandStudent,getResultOfSubject};