"use client";
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, Row, Col, FormCheck } from "react-bootstrap";

interface CardData {
  title: string;
  imageSrc?: string;
  price: number;
  description: string;
  category: string;
  buttonImageSrc?: string;
  id: string;
}
const getProduct = async (): Promise<CardData[]> => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  } as RequestInit;

  return await fetch("http://103.57.221.113:3000/v1//products", requestOptions)
    .then(async (response) => {
      const body = await response.json();
      if (response.status != 200) {
        return [];
      } else {
        return body.results.map(
          (value: {
            name: any;
            price: any;
            id: any;
            description: any;
            categories: { name: any }[];
            images: any [];
          }) => {
            return {
              title: value.name,
              price: value.price,
              id: value.id,
              description: value.description,
              category: value.categories[0].name,
              imageSrc: value.images[0],
            } as CardData;
          }
        );
      }
    })
    .catch((error) => {
      return [];
    });
};

interface CardListProps {
  itemsPerPage: number;
  deckTitle: string;
}

const CardList: React.FC<CardListProps> = ({ itemsPerPage, deckTitle }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [filteredCards, setFilteredCards] = useState<CardData[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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
    // Get the existing cart items from local storage
    const existingCartItemsString = localStorage.getItem(
      `cartItems${storedEmail}`
    );
    const existingCartItems = existingCartItemsString
      ? JSON.parse(existingCartItemsString)
      : [];

    // Check if the product is already in the cart
    const existingCartItem = existingCartItems.find(
      (item: CardData) => item.id === productId
    );

    if (existingCartItem) {
      // If the product is already in the cart, update its quantity
      existingCartItem.quantity += 1;
    } else {
      // If the product is not in the cart, add it to the cart with quantity 1
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
    console.log("existing:", existingCartItems);
    // Save the updated cart items back to local storage
    localStorage.setItem(
      `cartItems${storedEmail}`,
      JSON.stringify(existingCartItems)
    );
    setShowAddToCartModal(true);
  };
  const handleCloseAddToCartModal = () => {
    setShowAddToCartModal(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleCategoryChange = (category: string) => {
    const isSelected = selectedCategories.includes(category);
    const newCategories = isSelected
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newCategories);
    updateFilteredCards(searchInput, newCategories);
  };

  const updateFilteredCards = (searchValue: string, categories: string[]) => {
    const filtered = cardData.filter((card) => {
      const matchesSearch = card.title
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const matchesCategories =
        categories.length === 0 || categories.includes(card.category);
      return matchesSearch && matchesCategories;
    });

    setFilteredCards(filtered);
    setCurrentPage(1);
  };

  // const generateCardData = (numCards: number): CardData[] => {
  //   const cards = [];
  //   for (let i = 1; i <= numCards; i++) {
  //     cards.push({
  //       title: `Card ${i}`,
  //       imageSrc: `/avatar${i}.jpeg`,
  //       price: 10 + i * 5,
  //       category: `cat ${i % 3}`,
  //       buttonImageSrc: `/img/card${i}.jpg`,
  //     });
  //   }
  //   return cards;
  // };

  useEffect(() => {
    getProduct().then((response) => {
      console.log(response);
      setCardData(response);
    });
  }, []);

  useEffect(() => {
    console.log(filteredCards.length);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setVisibleCards(
      filteredCards.length
        ? filteredCards.slice(startIndex, endIndex)
        : cardData
    );
  }, [searchInput, filteredCards, cardData]);

  return (
    <Container fluid>
      <Row>
        {/* Sidebar with category filter */}
        <Col xs={3} style={{ padding: 15 }}>
          <div>
            <strong>Filter by Category:</strong>
            {Array.from(new Set(cardData.map((card) => card.category))).map(
              (category) => (
                <FormCheck
                  key={category}
                  type="checkbox"
                  label={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
              )
            )}
          </div>
        </Col>

        {/* Main content */}
        <Col xs={9}>
          <Container
            className="hideScrollBar"
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              maxHeight: "70vh",
              overflowY: "auto",
            }}
          >
            <Form className="mb-3">
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                    value={searchInput}
                    onChange={handleSearchChange}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    variant="success"
                    onClick={() =>
                      updateFilteredCards(searchInput, selectedCategories)
                    }
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(18rem, 1fr))",
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

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              {Array.from(
                {
                  length: Math.ceil(
                    (searchInput ? filteredCards.length : cardData.length) /
                      itemsPerPage
                  ),
                },
                (_, index) => index + 1
              ).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "success" : "light"}
                  onClick={() => handlePageChange(page)}
                  style={{ margin: "0 5px" }}
                >
                  {page}
                </Button>
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
                        {/* Add more details as needed */}
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

export default CardList;
