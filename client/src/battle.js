const io = require('socket.io-client');
const socket = io('http://your-server-url');
const startButton = document.getElementById('start-battle');

startButton.addEventListener('click', () => {
  socket.emit('singlebattle', { /* battle data */ });
});

socket.on('battle-started', (data) => {
    // Handle the battle start event here
  });