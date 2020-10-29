const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const admin = new Schema(
    {
        name:{
            type:String
        },
        email:{
            type:String
        },
    },{
        timestamps:true
    },
    {
        collection:"admins"
    }
)

module.exports = mongoose.model("admin",admin);