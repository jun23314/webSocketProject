import { useState } from "react";
import Board from "./Board";
import Button from "./Button";
import "./Game.css";


/*function random(n) {
  return Math.ceil(Math.random() * n);
}*/
async function fetchRandomNumber() {
  try{
    const response = await fetch('http://61.101.176.197:3001/api'); // 서버에서 랜덤 숫자를 가져옴
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json(); // 응답을 JSON 형식으로 변환
    console.log(data);
    return data.number; // 랜덤 숫자를 반환
  }
  catch(error){
    console.error('Error fetching random number:', error);
  }
 
}

async function postWinner(winner) {
  try{
    const response = await fetch('http://61.101.176.197:3001/winner', {
      method: 'POST', // POST 메소드 사용
      headers: {
        'Content-Type': 'application/json', // JSON 형식으로 전송
      },
      body: JSON.stringify({ winner }) // 승자를 요청 본문에 포함
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log(response);
  }
  catch(error){
    console.error('Error posting winner:', error);
  }
  
}

function Game() {
  const [myHistory, setMyHistory] = useState([]);
  const [otherHistory, setOtherHistory] = useState([]);

  const handleRollClick = async () => {
    const nextNum = await fetchRandomNumber();
    const nextOtherNum = await fetchRandomNumber();
    console.log(nextNum);
    console.log(nextOtherNum);
    setMyHistory([...myHistory, nextNum]);
    setOtherHistory([...otherHistory, nextOtherNum]);

    if (nextNum > nextOtherNum) {
      await postWinner("나"); // 나의 숫자가 더 크면 승자 전송
    } else if (nextNum < nextOtherNum) {
      await postWinner("상대방"); // 상대방의 숫자가 더 크면 승자 전송
    } else {
      await postWinner("무승부"); // 숫자가 같으면 무승부 전송
    }
  };

  const handleClearClick = () => {
    setMyHistory([]);
    setOtherHistory([]);
  };

  return (
    <div className="App">
      <div className="Button-container">
        <Button className="App-button" color="white" onClick={handleRollClick}>
          던지기
        </Button>
        <Button className="App-button" color="white" onClick={handleClearClick}>
          리셋
        </Button>
      </div>

      <div id="board">
        <Board name="나" color="white" mygameHistory={myHistory} othergameHistory={otherHistory} />
        <Board name="상대" color="white" mygameHistory={otherHistory} othergameHistory={myHistory} />
      </div>
    </div>
  );
}

export default Game;
