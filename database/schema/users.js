const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema(
    {  
        email:{
            type:String,
        },
        is_student:{
            type:Boolean,
        },
        college:{
            type:String,
        }
    },
    {
        collection:"users"
    }
)

module.exports = mongoose.model("user",user);