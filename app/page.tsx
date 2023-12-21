import Image from 'next/image';
import Link from 'next/link';
import style from '@/app/app.module.css';
import HorizontalCardList from './components/HoriCardList';

export default function Home() {
  const generateCardData = (numCards: number) => {
    const cards = [];
    for (let i = 1; i <= numCards; i++) {
      cards.push({
        title: `Card ${i}`,
        imageSrc: `/img/card${i}.jpg`, // Adjust the path based on your project structure
        price: 10 + i * 5, // Adjust the pricing logic based on your needs
        buttonImageSrc: `/img/card${i}.jpg`
      });
    }
    return cards;
  };

  const cardData = generateCardData(5); // Change the number to generate more or fewer cards

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Display HorizontalCardList */}
      <HorizontalCardList cardData={cardData} deckTitle="Popular" />
      <HorizontalCardList cardData={cardData} deckTitle="Hottest" />
      <HorizontalCardList cardData={cardData} deckTitle="Sale Off" /> 
    </div>
  );
}

