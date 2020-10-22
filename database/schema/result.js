const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const student = new Schema(
    {  
        score:{
            type:Number
        },
        total:{
            type:Number,
        },
        start_time:{
            type:String
        },
        submit_time:{
            type:String,
        }
        
    },
    {
        collection:"results"
    }
)

module.exports = mongoose.model("result",student);