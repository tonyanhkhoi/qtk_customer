'use client'
import Image from 'next/image';
import Link from 'next/link';
import style from '@/app/app.module.css';
import HorizontalCardList from '../components/HoriCardList';
import FeaturedCardList from '@/components/FeatureCardList';

export default function Home() {
  const generateCardData = (numCards: number) => {
    const cards = [];
    for (let i = 1; i <= numCards; i++) {
      cards.push({
        title: `Waifu ${i}`,
        imageSrc: `/avatar${i}.jpeg`,
        //imageSrc: `/img/card${i}.jpg`, // Adjust the path based on your project structure
        price: 10 + i * 5, // Adjust the pricing logic based on your needs
        buttonImageSrc: `/img/card${i}.jpg`
      });
    }
    return cards;
  };

  const cardData = generateCardData(5); // Change the number to generate more or fewer cards

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px' }}>
      {/* Big Center Title */}
      <h1 style={{ fontSize: '2em', marginBottom: '20px' }}>Welcome to QTK Store</h1>

      {/* Display FeaturedCardList */}
      <FeaturedCardList itemsToShow={4} deckTitle={'Popular'}/>
      <FeaturedCardList itemsToShow={4} deckTitle={'Best Seller'}/>
    </div>
  );
}
