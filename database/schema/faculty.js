const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const faculty = new Schema(
    {
        name:{
            type:String
        },
        email:{
            type:String
        },
        faculty_id:{
            type:String,
        },
        department:{
            type:String,
        },
        is_registered:{
            type:Boolean
        },
        subjects:{
            type:Array
        },
        photo_path:{
            type:String,
        }
    },{
        timestamps:true
    },
    {
        collection:"faculties"
    }
)

module.exports = mongoose.model("faculty",faculty);