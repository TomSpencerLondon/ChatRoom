const express = require('express');
var app = express();
const server = require("http").Server(app); 
const io = require("socket.io")(server); 

const port = 3000; 

server.listen(port, ()=>{
    console.log(`Server is listening on Port: ${port}`); 
});

app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/html/index.html');
}); 

app.get('/maths', (req, res)=>{
    res.sendFile(__dirname + '/html/maths.html');
}); 

app.get('/coding', (req, res)=>{
    res.sendFile(__dirname + '/html/coding.html');
});

app.get('/english', (req, res)=>{
    res.sendFile(__dirname + '/html/english.html'); 
}); 

const tech = io.of('/tech'); 

tech.on('connection', (socket)=>{

    socket.on('join', (data) =>{
        socket.join(data.room); 
        tech.in(data.room).emit('message', `New User Joined ${data.room} root!`); 
    }); 

    socket.on('message', (data)=>{
        tech.in(data.room).emit('message', data.msg);
    })

    io.on('disconnect', ()=>{
        console.log('User Disconnected');
        tech.emit('message', 'User Disconnected'); 
    })
}); 

