const socket=io("/");

const messageappend=document.getElementById('chatspace');
const inputmessage=document.getElementById('messageinput');
const form=document.getElementById('sendmessage');
const audio=new Audio('notification.wav');

const appendjoined=(message)=>{
    const messageelement=document.createElement('div');
    messageelement.classList.add('joined');
    messageelement.innerText=message;
    messageappend.appendChild(messageelement);
}

const append=(message,position)=>{
    const messageelement=document.createElement('div');
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    messageelement.innerText=message;
    messageappend.appendChild(messageelement);
    if(position=='left')
    {
        audio.play();
    }
}
const name=prompt("Enter you name to join the chat!!");
appendjoined(`You have joined the chat`);

socket.emit('new-user-joined',name);

socket.on('user-joined',data=>{
    appendjoined(`${data} joined the chat`);
})

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const messageputten=inputmessage.value;
    append(`${messageputten}`,'right');
    socket.emit('send',messageputten);
    inputmessage.value=" ";
})

socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'left');
})

socket.on('leave',data=>{
    appendjoined(`${data} leave the chat`);
})