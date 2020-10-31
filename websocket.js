const chat = require('./database/schema/chat');
const Chat = require('./database/schema/chat');

const websocket =function(){
    var socket;
    var io;

    function setWebSocket(newSocket,newIO){
        socket = newSocket;
        io = newIO;

        chatSocket();
    }

    const quizSocket = function(){
        const quizStart = (quizId)=>{
            io.emit('quizStart',quizId);
        }
        const quizStop = (quizId)=>{
            io.emit('quizStop',quizId);
        }

        return {quizStart,quizStop};

    }();

    const chatSocket = function(){
        socket.on("receive_chat",(data)=>{
            
            console.log("Data",data);
            const chat = new Chat(data);
            chat.save()
            .then((doc)=>{
                io.emit("send_chat/"+data.receiver,doc);
            })
        })
    }

    return {setWebSocket,quizSocket}
}();


module.exports = websocket;