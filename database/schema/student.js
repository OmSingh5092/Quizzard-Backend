const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const student = new Schema(
    {
        name:{
            type:String
        },
        registration_number:{
            type:String,
        },
        email:{
            type:String
        },
        photo_path:{
            type:String,
        },
        admit_card_path:{
            type:String,
        },
        department:{
            type:String,
        },
        year:{
            type:String
        },
        is_registered:{
            type:Boolean
        },
        subjects:{
            type:Array
        },
        results:{
            type:Array
        }

    },{
        timestamps:true
    },
    {
        collection:"students"
    }
)

module.exports = mongoose.model("student",student);