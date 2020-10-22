const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const student = new Schema(
    {  
        name:{
            type:String,
        },
        subject_code:{
            type:String,
        },
        department:{
            type:String,
        }
    },
    {
        collection:"subjects"
    }
)

module.exports = mongoose.model("subject",student);