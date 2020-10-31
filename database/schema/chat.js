const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chat = new Schema(
    {
        sender:{
            type:String,
        },
        receiver:{
            type:String,
        },
        message:{
            type:String,
        },
        media:{
            type:String
        }
    },{
        timestamps:true
    },
    {
        collection:"chats"
    }
)

module.exports = mongoose.model("chat",chat);