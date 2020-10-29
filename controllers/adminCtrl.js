const Admin = require('../database/schema/admin');

const updateProfile = (req,res)=>{
    const id = req.user.id;
    const body = req.body;

    Admin.updateOne({_id:id},body)
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

    Admin.findOne({_id:id})
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

module.exports = {updateProfile,getProfile};