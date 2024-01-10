"use client";
import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

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

const HorizontalCardList: React.FC<HorizontalCardListProps> = ({
  cardData,
  deckTitle,
}) => {
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const handleCardClick = (card: CardData) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };
  return (
    <Container
      style={{
        marginTop: "20px",
        marginBottom: "20px",
        maxHeight: "70vh",
        overflowY: "auto",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <h2>{deckTitle}</h2>
          <Link href="/seemore">
            <span
              style={{
                color: "green",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              See more
            </span>
          </Link>
        </div>
        <div
          style={{ display: "flex", flexDirection: "row", overflowX: "auto" }}
        >
          {cardData.map((card, index) => (
            <Card
              key={index}
              style={{
                width: "18rem",
                height: "20rem",
                marginRight: "1rem",
                cursor: "pointer",
              }}
            >
              <Card.Body
                onClick={() => handleCardClick(card)}
                style={{ padding: "0", overflow: "hidden" }}
                className="d-flex justify-content-between flex-column"
              >
                <div className="d-flex justify-content-center align-items-center">
                  <Card.Img
                    variant="top"
                    src={card.imageSrc}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <Card.Title>{card.title}</Card.Title>
              </Card.Body>
              <Card.Footer
                className="text-muted"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
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
      <Modal show={!!selectedCard} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedCard?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex" }}>
          <div style={{ flex: "1", paddingRight: "10px" }}>
            {/* Left part - Big Image */}
            <img
              src={selectedCard?.imageSrc}
              alt={selectedCard?.title}
              style={{ width: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ flex: "1", paddingLeft: "10px" }}>
            {/* Right part - Content */}
            <p>Price: ${selectedCard?.price}</p>
            {/* Add more details as needed */}
            <Button variant="success">Add to Cart</Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HorizontalCardList;
