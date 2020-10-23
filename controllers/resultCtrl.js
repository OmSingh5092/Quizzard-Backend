const Result = require('../database/schema/result');

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

module.exports = {createResult};