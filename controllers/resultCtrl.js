const Result = require('../database/schema/result');

const util = require('../utils/resultUtil');

const createResult = (req,res)=>{
    const id = req.user.id;
    const body = req.body;
    body.student = id;

    const result = new Result(body);
    result.save()
    .then((doc)=>{
        return res.status(200).json({
            success:true,
            result:doc,
        })
    }).catch((err)=>{
        console.log("Error",err);
        return res.status(500).json({
            success:false,
            msg:"Internal server error!",
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

const getResultOfSubject = (req,res)=>{
    const subjectId = req.headers.subject;

    Result.find({subject:subjectId})
    .then((docs)=>{
        
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

module.exports = {createResult,getResultById,getResultOfSubject};