'use client'
import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

interface CardData {
  title: string;
  imageSrc: string;
  price: number;
  buttonImageSrc: string;
}

interface HorizontalCardListProps {
  cardData: CardData[];
  deckTitle: string;
}

const HorizontalCardList: React.FC<HorizontalCardListProps> = ({ cardData, deckTitle }) => {
  return (
    <Container style={{ marginTop: '20px', marginBottom: '20px', maxHeight: '70vh', overflowY: 'auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <h2>{deckTitle}</h2>
          <Link href="/seemore">
              <span style={{ color: 'green', textDecoration: 'underline', cursor: 'pointer' }}>See more</span>
          </Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
          {cardData.map((card, index) => (
            <Card key={index} style={{ width: '18rem', height: '20rem', marginRight: '1rem' }}>
              <div className="d-flex justify-content-center align-items-center" style={{ height: '75%' }}>
                <Card.Img variant="top" src={card.imageSrc} style={{ width: '100%', objectFit: 'cover' }} />
              </div>
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
              </Card.Body>
              <Card.Footer className="text-muted" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>${card.price}</span>
                <Button variant="success" size="sm" className="rounded-circle">
                  {/* <img src={card.buttonImageSrc} alt="Button Image" style={{ width: '100%', height: '100%' }} /> */}
                  G
                </Button>
              </Card.Footer>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default HorizontalCardList;