import React from "react";
import classnames from "classnames";
import blue_back from "../../images/PNG/blue_back.png"
import "./card.scss";
const Card = ({ onClick, card, index, isInactive, isFlipped, isDisabled }) => {

  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };

  return (
    <div
      className={classnames("card", {
        "is-flipped": isFlipped,
        "is-inactive": isInactive
      })}
      onClick={handleClick}
    >
      <div className="card-face">
        <img src={blue_back} alt="back-card-color"/>
      </div>
      <div className="card-face card-back-face">
        <img src={card.image} alt="card-img"/>
      </div>
    </div>
  );
};

export default Card;