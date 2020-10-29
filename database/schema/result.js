const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const result = new Schema(
    {  
        student:{
            type:String,
        },
        quiz:{
            type:String,
        },
        subject:{
            type:String,
        },
        score:{
            type:Number
        },
        total:{
            type:Number,
        },
        submit_time:{
            type:String,
        },
        end_time:{
            type:String,
        },
        responses:{
            type:Array,
        }
        
    },
    {
        collection:"results"
    }
)

module.exports = mongoose.model("result",result);