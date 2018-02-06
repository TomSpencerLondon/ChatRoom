const app = require('express')();
const server = require("http").Server(app); 
const io = require("socket.io")(server); 

const port = 3000; 

server.listen(port, ()=>{
    console.log(`Server is listening on Port: ${port}`); 
});

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html');
}); 

app.get('/maths', (req, res)=>{
    res.sendFile(__dirname + '/public/maths.html');
}); 

app.get('/coding', (req, res)=>{
    res.sendFile(__dirname + '/public/coding.html');
});

app.get('/english', (req, res)=>{
    res.sendFile(__dirname + '/public/english.html'); 
}); 

