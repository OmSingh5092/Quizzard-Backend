const { OAuth2Client } = require('google-auth-library');
const   jwt = require('jsonwebtoken');
const config = require('../config');

const Faculty = require('../database/schema/faculty');
const Student =require('../database/schema/student');
const Admin = require('../database/schema/admin');

const facultyGoogleSignIn= async (req,res)=>{
    const idToken = req.body.idToken;
    const client = new OAuth2Client(config.gcp.clientId);

    if(idToken == null){
        return res.json({
            success:false,
            message:"Token not found"
        })
    }
    
    const ticket = await client.verifyIdToken({
        idToken:idToken,
        audience:config.gcp.clientId,
    });

    const payload = ticket.getPayload();
    const userEmail = payload['email'];
    const userName = payload['name'];

    const authData = {
        email: userEmail,
        name: userName,
    }

    try{
        const document = await Faculty.findOne({email:userEmail});
        console.log("User Exists")
        authData.id = document.id;
        const token = jwt.sign(authData,config.jwt.TOKEN_SECRET);
        return res.status(200).json({
            success:true,
            newUser:false,
            jwt:token
        })
    }
    catch(err){
        console.log("error",err);
        console.log("User doesnot exists");
        const faculty = new Faculty({
            name:userName,
            email:userEmail,
        })
        faculty.save()
        .then((data)=>{
            authData.id = data.id;
            const token = jwt.sign(authData,config.jwt.TOKEN_SECRET);
            return res.status(200).json({
                success:true,
                newUser:true,
                jwt: token
            })
        })
        .catch((err)=>{
            console.log(err);
            return res.status(500).json({
                success:false,
                msg:"Internal server error",
            })
        })
    }    
}

const studentGoogleSignIn = async (req,res)=>{
    const idToken = req.body.idToken;
    const client = new OAuth2Client(config.gcp.clientId);

    if(idToken == null){
        return res.json({
            success:false,
            message:"Token not found"
        })
    }
    
    const ticket = await client.verifyIdToken({
        idToken:idToken,
        audience:config.gcp.clientId,
    });

    const payload = ticket.getPayload();
    const userEmail = payload['email'];
    const userName = payload['name'];

    const authData = {
        email: userEmail,
        name: userName,
    }

    try{
        const document = await Student.findOne({email:userEmail});
        console.log("User Exists")
        authData.id = document.id;
        const token = jwt.sign(authData,config.jwt.TOKEN_SECRET);
        return res.status(200).json({
            success:true,
            newUser:false,
            jwt:token
        })
    }
    catch(err){
        console.log("error",err);
        console.log("User doesnot exists");
        const student = new Student({
            name:userName,
            email:userEmail,
        })
        student.save()
        .then((data)=>{
            authData.id = data.id;
            const token = jwt.sign(authData,config.jwt.TOKEN_SECRET);
            return res.status(200).json({
                success:true,
                newUser:true,
                jwt: token
            })
        })
        .catch((err)=>{
            console.log(err);
            return res.status(500).json({
                success:false,
                msg:"Internal server error",
            })
        })
    }    
}

const adminGoogleSignIn = (req,res)=>{

    const idToken = req.body.idToken;
    const client = new OAuth2Client(config.gcp.clientId);

    if(idToken == null){
        return res.json({
            success:false,
            message:"Token not found"
        })
    }
    
    const ticket = await client.verifyIdToken({
        idToken:idToken,
        audience:config.gcp.clientId,
    });

    const payload = ticket.getPayload();
    const userEmail = payload['email'];
    const userName = payload['name'];

    const authData = {
        email: userEmail,
        name: userName,
    }

    try{
        const document = await Admin.findOne({email:userEmail});
        console.log("User Exists")
        authData.id = document.id;
        const token = jwt.sign(authData,config.jwt.TOKEN_SECRET);
        return res.status(200).json({
            success:true,
            newUser:false,
            jwt:token
        })
    }
    catch(err){
        console.log("error",err);
        return res.status(500).json({
            success:false,
            msg:"Admin doesnot exists!",
        })
    }

}

module.exports = {facultyGoogleSignIn,studentGoogleSignIn,adminGoogleSignIn};