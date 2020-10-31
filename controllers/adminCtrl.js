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

module.exports.getStudentById = (req,res)=>{
    const student= req.headers.student;

    Faculty.findOne({_id:student})
    .then((doc)=>{
        return res.status(200).json({
            success:true,
            student:doc,
        })
    }).catch((err)=>{
        console.log("Error",err);

        return res.status(500).json({
            success:false,
            msg:"Internal Server Error!",
        })
    })
}

module.exports.registerStudent = (req,res)=>{
    const student = req.headers.student;
    const register = req.headers.register;

    Student.updateOne({_id:student},{is_registered:register})
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

module.exports.removeStudent = (req,res)=>{
    const student = req.headers.student;

    Student.deleteOne({_id:student})
    .then((log)=>{
        return res.status(200).json({
            success:true,
            msg:"Delete Successfull!",
        })
    }).catch((err)=>{
        console.log("Error",err);

        return res.staus(500).json({
            success:false,
            msg:"Delete unsuccessfull!",
        })
    })
}

module.exports.removeStudentSubject = (req,res)=>{
    const id = req.headers.student;
    const subjectId = req.headers.subject;

    Student.updateOne({_id:id},{$pull:{subjects:subjectId}})
    .then((doc)=>{
        return res.status(200).json({
            success:true,
            msg:"Remove subject Successfull!",
        })
    }).catch((err)=>{
        console.log("Error",err);
        res.status(500).json({
            success:false,
            msg:"Remove subject unsuccessfull!",
        })
    })
}

module.exports.addStudentSubject = (req,res)=>{
    const id =  req.headers.student;
    const subjectId = req.headers.subject;
    Student.updateOne({_id:id},{$push:{subjects:subjectId}})
    .then((doc)=>{
        res.status(200).json({
            success:true,
            msg:"Update Succesfull!",
        })
    }).catch((err)=>{
        console.log("Error",err);
        res.status(500).json({
            success:false,
            msg:"Update unsuccessfull!",
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

module.exports.getFacultyById = (req,res)=>{
    const faculty= req.headers.faculty;

    Faculty.findOne({_id:faculty})
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

module.exports.registerFaculty = (req,res)=>{
    const faculty = req.headers.faculty;
    const register = req.headers.register;

    Faculty.updateOne({_id:faculty},{is_registered:register})
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

module.exports.removeFaculty= (req,res)=>{
    const faculty = req.headers.faculty;

    Faculty.deleteOne({_id:faculty})
    .then((log)=>{
        return res.status(200).json({
            success:true,
            msg:"Delete Successfull!",
        })
    }).catch((err)=>{
        console.log("Error",err);

        return res.staus(500).json({
            success:false,
            msg:"Delete unsuccessfull!",
        })
    })
}

module.exports.addFacultySubject = (req,res)=>{
    const id =  req.headers.faculty
    const subjectId = req.headers.subject;
    Faculty.updateOne({_id:id},{$push:{subjects:subjectId}})
    .then((doc)=>{
        res.status(200).json({
            success:true,
            msg:"Update Succesfull!",
        })
    }).catch((err)=>{
        console.log("Error",err);
        res.status(500).json({
            success:false,
            msg:"Update unsuccessfull!",
        })
    })
}

module.exports.removeFacultySubject = (req,res)=>{
    const id = req.headers.faculty;
    const subjectId = req.headers.subject;

    Faculty.updateOne({_id:id},{$pull:{subjects:subjectId}})
    .then((doc)=>{
        return res.status(200).json({
            success:true,
            msg:"Remove subject Successfull!",
        })
    }).catch((err)=>{
        console.log("Error",err);
        res.status(500).json({
            success:false,
            msg:"Remove subject unsuccessfull!",
        })
    })
}
