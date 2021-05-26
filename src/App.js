import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogActions,
  Button,
  DialogTitle
} from "@material-ui/core";
import Card from "./components/card/card";
import "./app.scss";
import cardsArray ,{shuffleCards} from './cardsArray'


export default function App() {
  const [cards, setCards] = useState(() =>
    shuffleCards(cardsArray.concat(cardsArray))
  );
  // Example cardArray [2D,2H,2D,2H]
  const [openCards, setOpenCards] = useState([]); 
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const timeout = useRef(null);

  const disableAllCards = () => {
    setShouldDisableAllCards(true);
  };
  const enableAllCards = () => {
    setShouldDisableAllCards(false);
  };

  const checkAllPairs = () => {
    // console.log("CHECKING if it all done", clearedCards);
    if (Object.keys(clearedCards).length === cardsArray.length) {
      setShowModal(true);
      // console.log("You Win!!");
    } else { // is not able to show dialog
      console.log('Not finished yet');
      setShowModal(false);
    }
  };

  const comparison = () => {
    const [firstCard, secondCard] = openCards;
    enableAllCards();
    if (cards[firstCard].type === cards[secondCard].type) {
      setClearedCards((prev) => ({ ...prev, [cards[firstCard].type]: true }));
      setOpenCards([]);
      return;
    }
    // This is to flip the cards back if they r not the same
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 200);
  };
  const handleCardClick = (index) => {
    if (openCards.length === 1) { // second flip append to openCard array and disable all click
      setOpenCards((prev) => [...prev, index]);
      disableAllCards();
    } else { // first flip add to openCard with the index
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    let timeout = null;
    
    // if (openCards.length >= 2) {
    //   timeout = setTimeout(comparison, 300);
    // }
    if (openCards.length === 2) { // everytime i opend two card check if they are the same
      timeout = setTimeout(comparison, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    // console.log(cardsArray);
    checkAllPairs();
  }, [clearedCards]);

  const handleRestart = () => {
    // clean
    setClearedCards({});
    setOpenCards([]);
    setShowModal(false);
    setShouldDisableAllCards(false);
    // shuffle again
    setCards(shuffleCards(cardsArray.concat(cardsArray)));
  };

  return (
    <div className="App">
      <header>
        <h3>Flip card game</h3>
      </header>
      <div className="container">
        {cards.map((card, index) => {
          return (
            <Card
              key={index}
              card={card}
              index={index}
              isDisabled={shouldDisableAllCards}
              isInactive={Boolean(clearedCards[card.type])}
              isFlipped={openCards.includes(index)}
              onClick={handleCardClick}
            />
          );
        })}
      </div>
      <footer>
        <div className="restart">
          <Button onClick={handleRestart} color="primary" variant="contained">
            Restart
          </Button>
        </div>
      </footer>
      <Dialog
        open={showModal}
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle>
          You completed the challenge
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleRestart} color="primary">
            Restart
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
