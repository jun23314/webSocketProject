import Dice from "./Dice";
import "./Board.css";

function Board({ name, color, gameHistory }) {
  const num = gameHistory[gameHistory.length - 1] || 1;
  const nameStyle = {
    fontSize: '15px', // 원하는 글자 크기로 변경
  };
  /*const sum = gameHistory.reduce((a, b) => a + b, 0);*/
  return (
    <div className="Board">
      <h2 style={nameStyle}>{name}</h2>
      <Dice color={color} num={num} />
    </div>
  );
}

export default Board;
