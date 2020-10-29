const Admin = require('../database/schema/admin');
const Student = require('../database/schema/student');
const Faculty = require('../database/schema/faculty');

module.exports.updateProfile = (req,res)=>{
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

module.exports.getProfile = (req,res)=>{
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

module.exports.createAdmin = (req,res)=>{
    const body = req.body;

    const admin = new Admin(body);
    admin.save()
    .then((doc)=>{
        return res.status(200).json({
            success:true,
            admin:doc,
        })
    }).catch((err)=>{
        console.log("Error",err);

        return res.status(500).json({
            success:false,
            msg:"Internal server error!",
        })
    })
}

//Student related controllers

module.exports.registerStudent = (req,res)=>{
    const student = req.headers.student;

    Student.updateOne({_id:student},{is_registered:true})
    .then((update)=>{
        return res.status(200).json({
            success:true,
            msg:"Registration Successfull!"
        })
    }).catch((err)=>{
        console.log("Error",err);

        return res.status(500).json({
            success:false,
            msg:"Internal Server Error!",
        })
    })
}

module.exports.getStudents = (req,res)=>{
    const registered = req.headers.registered;
    
    Student.find({is_registered:registered})
    .then((docs)=>{
        return res.status(200).json({
            success:true,
            students:docs,
        })
    }).catch((err)=>{
        console.log("Error",err);

        return res.status(500).json({
            success:false,
            msg:"Internal Server Error!",
        })
    })
}

//Faculty related controllers

module.exports.getFaculties = (req,res)=>{
    const registered = req.headers.registered;

    Faculty.find({is_registered:registered})
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

module.exports.registerFaculty = (req,res)=>{
    const faculty = req.headers.faculty;

    Faculty.updateOne({_id:faculty},{is_registered:true})
    .then((update)=>{
        return res.status(200).json({
            success:true,
            msg:"Registration Successfull!"
        })
    }).catch((err)=>{
        console.log("Error",err);

        return res.status(500).json({
            success:false,
            msg:"Internal Server Error!",
        })
    })
}
