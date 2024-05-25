const express = require('express');
const app = express();

const server = app.listen(3001, () =>{
  console.log('Start server : localhost:3001');
});

app.get('/api', async (req, res) => {
  var randomNumber = Math.floor(Math.random() * 6) + 1; // 1부터 6까지 랜덤 수 생성
  res.send({ok: true, number : randomNumber});
});

app.post('/winner', async (req, res) => {
  res.send({ok: true, winner : req.get('winner')});
  //request가 {winner : a} 형식으로 들어오는 경우.
});