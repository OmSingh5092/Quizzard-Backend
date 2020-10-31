const Faculty = require('../database/schema/faculty');

const updateProfile = (req,res)=>{
    const id = req.user.id;
    const body = req.body;

    Faculty.updateOne({_id:id},body)
    .then((doc)=>{
        return res.status(200).json({
            success:true,
            update:doc,
        })
    }).catch((err)=>{
        return res.status(500).json({
            success:false,
            msg:"Update couldnot be done!",
        })
    })
}

const getProfile = (req,res)=>{
    const id = req.user.id;

    Faculty.findOne({_id:id})
    .then((doc)=>{
        return res.status(200).json({
            success:true,
            faculty:doc,
        })
    }).catch((err)=>{
        console.log("Error",err);
        return res.status(500).json({
            success:false,
            msg:"Internal Server Error!",
        })
    })
}

const getAllFaculties = (req,res)=>{
    const id = req.user.id;
    Faculty.find({_id:{$ne:id}})
    .then((docs)=>{
        return res.status(200).json({
            success:true,
            faculties:docs,
        })
    }).catch((err)=>{
        console.log("Error",err);

        return res.status(500).json({
            success:false,
            msg:"Internal Server Error!",
        })
    })
}

module.exports = {updateProfile,getProfile,getAllFaculties}