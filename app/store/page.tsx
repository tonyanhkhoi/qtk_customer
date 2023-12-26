import React from "react";
import CardList from "../components/CardList";

const store: React.FC = () => {
    const generateCardData = (numCards: number) => {
        const cards = [];
        for (let i = 1; i <= numCards; i++) {
          cards.push({
            title: `Card ${i}`,
            imageSrc: `/img/card${i}.jpg`, 
            price: 10 + i * 5, 
            buttonImageSrc: `/img/card${i}.jpg`
          });
        }
        return cards;
      };
  
    const cardData = generateCardData(50); // so luong san pham
  
    return (
      <div>
        <CardList cardData={cardData} itemsPerPage={20} deckTitle="Your Deck Title" />
      </div>
    );
  };
export default store;

{/* <div>
<div>
    <Button variant="success">New</Button>
    <button onClick={() =>handleBtn()}>Back Home</button>
</div>
Facebook Page
</div> */}