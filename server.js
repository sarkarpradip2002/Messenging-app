const io=require('socket.io')(4000,{
    cors:{
        origin: "*"
    }
});

const port=process.env.PORT || 4000;

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