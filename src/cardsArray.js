import TwoClub from "./images/PNG/2C.png"
import TwoDiamond from "./images/PNG/2D.png"
import TwoHeart from "./images/PNG/2H.png"
import TwoSpare from "./images/PNG/2S.png"

const cardsArray = [
  {
    type: "2C",
    image: TwoClub
  },
  {
    type: "2D",
    image: TwoDiamond
  },
//   {
//     type: "2H",
//     image: TwoHeart
//   },
//   {
//     type: "2S",
//     image: TwoSpare
//   },
  
  
];
export function shuffleCards(array) {
    const length = array.length;
    for (let i = length; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * i);
      const currentIndex = i - 1;
      // bubble sort
      const temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array;
  }

export default cardsArray;