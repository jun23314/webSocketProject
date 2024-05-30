import Dice from "./Dice";
import "./Board.css";

function Board({ name, color, mygameHistory, othergameHistory}) {
  const mynum = mygameHistory[mygameHistory.length - 1] || 1;
  const othernum = othergameHistory[othergameHistory.length - 1] || 1;
  let result=""

  if (mynum>othernum){
    result="win"
  }
  
  else if (mynum<othernum){
    result="lose"
  }
  else result="draw"

  const nameStyle = {
    fontSize: '15px', // 원하는 글자 크기로 변경
  };

  return (
    <div className="Board">
      <h2 style={nameStyle}>{name}</h2>
      <Dice color={color} num={mynum} />
      <h2 style={nameStyle}>{result}</h2>
    </div>
  );
}

export default Board;
