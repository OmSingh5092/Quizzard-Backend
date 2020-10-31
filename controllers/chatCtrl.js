const Chat = require('../database/schema/chat')

module.exports.getAllChats = (req,res)=>{
    const id = req.user.id;
    const sender = req.headers.sender;

    Chat.find({$and:[{$or:[{sender:id},{receiver:sender}]},{$or:[{sender:sender},{receiver:id}]}]})
    .then((docs)=>{
        return res.status(200).json({
            success:true,
            chats:docs,
        })
    })
    .catch((err)=>{
        console.log("Error",err);
        return res.status(500).json({
            success:false,
            msg:"Internal Server Error!",
        })
    })

}