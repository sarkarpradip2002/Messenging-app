const express=require('express')
const app=express();
const port=process.env.PORT || 4000;
app.use(express.static('static'));
const http=require('http').Server(port);

const io=require('socket.io')(http,{
    cors:{
        origin: "*"
    }
});

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
})
console.log("The port is 4000");
const users={};

io.on('connection',socket =>{
    socket.on('new-user-joined',name=>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message, name:users[socket.id]});
    });

    socket.on('disconnecting',message=>{
        socket.broadcast.emit('leave',users[socket.id]);
        delete users[socket.id];
    });

})

io.listen(port);