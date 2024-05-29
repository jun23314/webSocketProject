import diceBlack1 from "./assets/dice-black-1.svg";
import diceBlack2 from "./assets/dice-black-2.svg";
import diceBlack3 from "./assets/dice-black-3.svg";
import diceBlack4 from "./assets/dice-black-4.svg";
import diceBlack5 from "./assets/dice-black-5.svg";
import diceBlack6 from "./assets/dice-black-6.svg";
import diceWhite1 from "./assets/dice-white-1.svg";
import diceWhite2 from "./assets/dice-white-2.svg";
import diceWhite3 from "./assets/dice-white-3.svg";
import diceWhite4 from "./assets/dice-white-4.svg";
import diceWhite5 from "./assets/dice-white-5.svg";
import diceWhite6 from "./assets/dice-white-6.svg";

const Dice_Images = {
  black: [diceBlack1, diceBlack2, diceBlack3, diceBlack4, diceBlack5, diceBlack6],
  white: [diceWhite1, diceWhite2, diceWhite3, diceWhite4, diceWhite5, diceWhite6],
};

function Dice({ color = "blue", num = "1" }) {
  const src = Dice_Images[color][num - 1];
  const alt = `${color} ${num}`;
  return <img src={src} alt={alt} />;
}

export default Dice;
