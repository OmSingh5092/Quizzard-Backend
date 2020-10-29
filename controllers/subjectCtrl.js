const Subject = require('../database/schema/subject');
const Student = require('../database/schema/student');

const getSubject = async (req,res)=>{
    const id = req.headers.id;

    try{
        const subject = await Subject.findById(id);

        return res.status(200).json({
            success:true,
            subject:subject,
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            msg:"Internal Server Error",
        })
    }
}

const getSubjectsByStudent = async(req,res)=>{
    const id = req.user.id;
    
    try{
        const student = await Student.findById(id);
        var condition = [];

        student.subjects.map((item,index)=>{
            condition.push({_id:item});
        })

        const subjects = await Subject.find({$or:condition});

        var studentSubject ={};
        
        subjects.map((item,index)=>{
            studentSubject[item._id] = item;
        });


        return res.status(200).json({
            success:true,
            subjects: studentSubject,
        })


    }catch(err){
        console.log("Error",err);
        return res.status(500).json({
            success:false,
            msg:"Internal server error!",
        })
    }

}

const addSubject = (req,res)=>{

    const body = req.body;

    const subject = new Subject(body);

    subject.save()
    .then((doc)=>{
        return res.status(200).json({
            success:true,
            subject:doc,
        })
    }).catch((err)=>{
        return res.status(500).json({
            success:false,
            msg:"Internal Server error!"
        })
    })
}

const getAllSubjects = (req,res)=>{
    Subject.find({})
    .then((docs)=>{
        return res.status(200).json({
            success:true,
            subjects:docs,
        })
    }).catch((err)=>{
        console.log("Error",err);
        return res.status(500).json({
            success:false,
            msg:"Internal Server Error!"
        })
    })
}

module.exports = {getSubject,getSubjectsByStudent,addSubject,getAllSubjects};