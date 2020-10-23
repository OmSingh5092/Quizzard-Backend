const websocket =function(){
    var socket;
    var io;

    function setWebSocket(newSocket,newIO){
        socket = newSocket;
        io = newIO;
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

    return {setWebSocket,quizSocket}
}();


module.exports = websocket;