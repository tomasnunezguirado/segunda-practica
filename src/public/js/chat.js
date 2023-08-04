const socket = io();
let user;
let chatBox = document.getElementById('chatBox');

socket.on('newUserConnected', data => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `${data} se ha unido al chat`,
        showConfirmButton: false,
        timer: 10000
    })
});

Swal.fire({
    title: 'Hola Flowerier!',
    input: 'text',
    text: 'Ingresa tu usuario para identificarte en el chat',
    inputValidator: (value) => {
        return !value && 'Necesitas ingresar un usuario!'
    },
    allowOutsideClick: false
}).then((result) => {
    user = result.value;
    let title = document.getElementById('title');
    title.innerHTML = `Bienvenido ${user} a Flowery 4107 Webchat!`;
    socket.emit('authenticated', user);
});    

chatbox.addEventListener('keyup', evt => {
    if (evt.key === "Enter") {
        if (chatbox.value.trim().length > 0) {
            socket.emit('message', { user: user, message: chatbox.value });
            chatbox.value = "";
        }
    }
})

socket.on('messageLogs', data => {
    if (!user) return;
    let log = document.getElementById('messageLogs');
    let messages = "";
    data.forEach(message => {
        messages += `${message.user} dice: ${message.message}<br/>`
    })
    log.innerHTML = messages;
})

