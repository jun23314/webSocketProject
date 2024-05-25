const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'chat.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => { // 사용자가 메시지를 보냈다면
    io.emit('chat message', msg); //전송
    console.log(msg);
  });
  socket.on('disconnect', () => { // 연결이 끊긴 경우
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});