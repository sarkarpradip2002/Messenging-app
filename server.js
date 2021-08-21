const io=require('socket.io')(4000,{
    cors:{
        origin: "*"
    }
});
const express=require('express')
const app=express();
const port=process.env.PORT;

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
app.listen(port,()=>{
    console.log(`Listening on the port ${port}`);
})