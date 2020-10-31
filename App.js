const express = require('express');
const app = express();
const config = require('./config');
const database = require('./database/database');
const http = require('http');
require('./passport');

//Applying middlewares
app.use(express.json());

//Importing rotues
const signInRoute = require('./routes/signinRouter');
const studentRoute = require('./routes/studentRouter');
const facultyRoute = require('./routes/facultyRouter')
const subjectRoute = require('./routes/subjectRouter');
const quizRoute = require('./routes/quizRouter');
const resultRoute = require('./routes/resultRouter');
const adminRoute = require('./routes/adminRouter');
const chatRoute = require('./routes/chatRouter');

//Applying routes
app.use('/api/signin',signInRoute);
app.use('/api/student',studentRoute);
app.use('/api/faculty',facultyRoute);
app.use('/api/subject',subjectRoute);
app.use('/api/quiz',quizRoute);
app.use('/api/result',resultRoute);
app.use('/api/admin',adminRoute);
app.use('/api/chat',chatRoute);

const server = http.createServer(app);

const io = require('socket.io')(server);
module.exports.io = io;
io.on("connection",(socket)=>{
    console.log("Client Connected...");
    const websocket = require('./websocket');
    websocket.setWebSocket(socket,io);
})


server.listen(config.app.local.port, ()=>{
    console.log("\n\n App listening... \n\n");
})

