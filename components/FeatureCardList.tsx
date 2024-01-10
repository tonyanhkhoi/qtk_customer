// FeaturedCardList.tsx

import React, { useState, useEffect } from "react";
import { Card, Container, Button, Modal, Form, Row, Col } from "react-bootstrap";
import Link from "next/link";

interface CardData {
  title: string;
  imageSrc?: string;
  price: number;
  description: string;
  category: string;
  id: string;
}

interface FeaturedCardListProps {
  itemsToShow: number; // Number of items to show
  deckTitle: string;
}

const getProduct = async (): Promise<CardData[]> => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  } as RequestInit;

  try {
    const response = await fetch("http://103.57.221.113:3000/v1/products", requestOptions);

    if (!response.ok) {
      console.error("Failed to fetch products:", response.statusText);
      return [];
    }

    const body = await response.json();

    return body.results.map((value: any) => ({
      title: value.name,
      price: value.price,
      id: value.id,
      description: value.description,
      category: value.categories[0]?.name || "Uncategorized",
    })) as CardData[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const FeaturedCardList: React.FC<FeaturedCardListProps> = ({ itemsToShow, deckTitle }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [visibleCards, setVisibleCards] = useState<CardData[]>([]);
  const [cardData, setCardData] = useState<CardData[]>([]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleCardClick = (card: CardData) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  const handleAddToCart = (productId?: string) => {
    if (!productId) return;
    const storedEmail = localStorage.getItem("userInfoEmail");
    const existingCartItemsString = localStorage.getItem(
      `cartItems${storedEmail}`
    );
    const existingCartItems = existingCartItemsString
      ? JSON.parse(existingCartItemsString)
      : [];

    const existingCartItem = existingCartItems.find(
      (item: CardData) => item.id === productId
    );

    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      const selectedProduct = cardData.find(
        (product) => product.id === productId
      );
      if (selectedProduct) {
        existingCartItems.push({
          ...selectedProduct,
          quantity: 1,
        });
      }
    }

    localStorage.setItem(
      `cartItems${storedEmail}`,
      JSON.stringify(existingCartItems)
    );
    setShowAddToCartModal(true);
  };

  const handleCloseAddToCartModal = () => {
    setShowAddToCartModal(false);
  };

  const getFeaturedItems = (): CardData[] => {
    return cardData.slice(0, itemsToShow);
  };

  useEffect(() => {
    getProduct().then((response) => {
      console.log(response);
      setCardData(response);
    });
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsToShow;
    const endIndex = startIndex + itemsToShow;
    setVisibleCards(
      getFeaturedItems()
    );
  }, [cardData, currentPage, itemsToShow]);

  return (
    <Container fluid>
      <Row>
        {/* Main content */}
        <Col xs={12}>
          <Container
            className="hideScrollBar"
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              maxHeight: "70vh",
              overflowY: "auto",
            }}
          >
            {/* Featured Items Title */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <h2>{deckTitle}</h2>
              <Link href="/store">
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

            {/* Featured Items */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(auto-fill, minmax(18rem, 1fr))`,
                gap: "1rem",
              }}
            >
              {visibleCards.map((card, index) => (
                <Card key={index} style={{ cursor: "pointer" }}>
                  <Card.Body
                    className="d-flex justify-content-between flex-column"
                    onClick={() => handleCardClick(card)}
                  >
                    <div className="d-flex justify-content-center align-items-center">
                      <Card.Img
                        variant="top"
                        src={card.imageSrc}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          aspectRatio: "auto",
                        }}
                      />
                    </div>
                    <Card.Title>{card.title}</Card.Title>
                  </Card.Body>
                  <Card.Footer
                    className="text-muted"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>{card.price} VND</span>
                    <Button
                      variant="success"
                      size="sm"
                      className="rounded-circle"
                      onClick={() => handleAddToCart(card.id)}
                    >
                      G
                    </Button>
                  </Card.Footer>
                </Card>
              ))}
            </div>

            {/* Details Modal */}
            <Modal show={!!selectedCard} onHide={handleCloseModal} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>{selectedCard?.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <Row>
                    {/* Left part - Big Image */}
                    <Col xs={12} md={6}>
                      <img
                        src={selectedCard?.imageSrc}
                        alt={selectedCard?.title}
                        style={{
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Col>
                    {/* Right part - Content */}
                    <Col xs={12} md={6}>
                      <div className="d-flex flex-column">
                        <p>Description: {selectedCard?.description}</p>
                        <p>Price: ${selectedCard?.price}</p>
                        <Button
                          variant="success"
                          className="mt-auto" // Align the button to the bottom
                          onClick={() => handleAddToCart(selectedCard?.id)}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            {/* "Add to Cart" Modal */}
            <Modal show={showAddToCartModal} onHide={handleCloseAddToCartModal}>
              <Modal.Header closeButton>
                <Modal.Title>Add to Cart</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Item successfully added to your cart!</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseAddToCartModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default FeaturedCardList;
