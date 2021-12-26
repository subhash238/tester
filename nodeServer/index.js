//Node server which handle socket io connections
// var PORT=process.env.PORT || 5000;
// var express=require('express')
// var app=express();
// var http=require('http');
// var server=http.Server(app);
// app.use(express.static('client'));
// server.listen(PORT,function(){
//     console.log('chat server runing')
// })
// const path = require('path');
// const express =require("express")
// const app =express()
// const publicPath = path.join(__dirname, "../frontend/" );
// console.log(publicPath)
const io=require('socket.io')(process.env.PORT||8000);
// app.use(express.static(publicPath));
// const port = process.env.PORT || 8000

const users ={}

io.on('connection',Socket=>{
    Socket.on('new-user-joined',name=>{
        users[Socket.id]=name;
        Socket.broadcast.emit('user-joined',name);
    });
    Socket.on('send',message=>{
        Socket.broadcast.emit('receive',{message: message,name:users[Socket.id]})
    });
    Socket.on('disconnect',message=>{
        Socket.broadcast.emit('left',users[Socket.id])
        delete users[Socket.id]
    });
}) 
// app.listen(port, ()=>{
//     console.log(`Server is up on port ${port}`);
//   })
  