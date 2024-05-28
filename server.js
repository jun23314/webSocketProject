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
  socket.on("join_room", (data) => {
    socket.join(data.room);
    console.log(`${data.username}유저가 ${data.room}번 방에 입장했습니다`);
    let noti = {
      message:`${data.username} 유저가 방에 입장했습니다`,
      author:'알림'
    }
    socket.to(data.room).emit('receive_message', noti);
  });

  socket.on("chat message", (data) => {
    console.log('chat message', data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on('disconnect', () => { // 연결이 끊긴 경우
    console.log(`${socket.id}가 접속을 끊었습니다`);
  });
});

server.listen(4000, () => {
  console.log('server running at http://localhost:4000');
});