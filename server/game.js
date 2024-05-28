const express = require('express');
const app = express();
const cors = require("cors");
const server = app.listen(3001, () =>{
  console.log('Start server : localhost:3001');
});

app.use(cors());

app.use(express.json()); // JSON 요청 본문을 파싱하기 위해 추가

app.get('/api', function (req, res) {
    try{
        
        var randomNumber = Math.floor(Math.random() * 6) + 1; // 1부터 6까지 랜덤 수 생성
        res.send({ok: true, number : randomNumber});
    }
    catch(error) {
        console.log(error);
        res.status(500).send({ ok: false, error: error.message });
    }
  
});

app.post('/winner', async (req, res) => {
    try{
        const winner = req.body.winner; // 요청 본문에서 승자 정보 추출
        console.log(`Winner is: ${winner}`); // 승자를 콘솔에 출력
        res.send({ok: true, winner});
        //request가 {winner : a} 형식으로 들어오는 경우.
    }
    catch(error){
        console.log(error);
        res.status(500).send({ ok: false, error: error.message });
    }

});