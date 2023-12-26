'use client'
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

interface CardData {
  title: string;
  imageSrc: string;
  price: number;
  buttonImageSrc: string;
}

interface CardListProps {
  cardData: CardData[];
  itemsPerPage: number;
  deckTitle: string;
}

const CardList: React.FC<CardListProps> = ({ cardData, itemsPerPage, deckTitle }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(cardData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleCards = cardData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <Container className='hideScrollBar' style={{ marginTop: '20px', marginBottom: '20px', maxHeight: '70vh', overflowY: 'auto'}}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(18rem, 1fr))', gap: '1rem' }}>
        {visibleCards.map((card, index) => (
          <Card key={index} style={{ height: '20rem' }}>
            <div className="d-flex justify-content-center align-items-center" style={{ height: '75%' }}>
              <Card.Img variant="top" src={card.imageSrc} style={{ width: '100%', objectFit: 'cover' }} />
            </div>
            <Card.Body>
              <Card.Title>{card.title}</Card.Title>
            </Card.Body>
            <Card.Footer className="text-muted" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>${card.price}</span>
              <Button variant="success" size="sm" className="rounded-circle">
                G
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? 'primary' : 'light'}
            onClick={() => handlePageChange(page)}
            style={{ margin: '0 5px' }}
          >
            {page}
          </Button>
        ))}
      </div>
    </Container>
  );
};

export default CardList;
