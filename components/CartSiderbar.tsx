import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Container, Row, Col } from "react-bootstrap";

interface CartItem {
  id: string;
  title: string;
  imageSrc: string;
  quantity: number;
  price: number;
}
const generateCardData = (numCards: number) => {
  const cards = [];
  for (let i = 1; i <= numCards; i++) {
    cards.push({
      imageSrc: `/avatar${i}.jpeg`,
      price: 10 + i * 5,
      id: `${i}`,
      name: `product`,
      quantity: 10,
    });
  }
  return cards;
};

interface ShoppingCartProps {
  onClose: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ onClose }) => {
  const router = useRouter();
  const path = usePathname();
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedEmail = localStorage.getItem('userInfoEmail');
    const existingCartItemsString = localStorage.getItem(`cartItems${storedEmail}`);
    return existingCartItemsString ? JSON.parse(existingCartItemsString) : [];
  });
  const handleButtonCart = () => {
    if (!path.includes("shoppingcart")) router.push("/shoppingcart");
  };
  const handleCheckout = () => {
    if (!path.includes("checkout")) router.push("/checkout");
  };
  const handleDeleteItem = (itemId: string) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);

    // Update the cartItems state with the filtered array
    setCartItems(updatedCartItems);
    const storedEmail = localStorage.getItem('userInfoEmail');
    // Save the updated cart items back to local storage
    localStorage.setItem(`cartItems${storedEmail}`, JSON.stringify(updatedCartItems));
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Shopping Cart ({cartItems.length})</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          {cartItems.map((item) => (
            <Row key={item.id} className="cart-item">
              <Col xs={3}>
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="cart-item-image"
                />
              </Col>
              <Col xs={5}>
                <div className="cart-item-details">
                  <p className="cart-item-name">{item.title}</p>
                  <p className="cart-item-price">Price: {item.price} VND</p>
                </div>
              </Col>
              <Col xs={3}>
                <div className="cart-item-details">
                  <p className="cart-item-quantity">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </Col>
              <Col xs={1}>
                <div className="cart-item-details">
                  <p
                    className="cart-item-delete"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    x
                  </p>
                </div>
              </Col>
            </Row>
          ))}
        </Container>
      </Modal.Body>

      <Modal.Footer>
        <Container fluid>
          <Row>
            <Col xs={7}>
              <div className="cart-summary">
                <p>Total Items: {cartItems.length}</p>
                <p>Total Price: {calculateTotal()} VND</p>
              </div>
            </Col>
            <Col xs={5}>
              <div className="cart-buttons">
                <Button variant="secondary" onClick={onClose}>
                  Close
                </Button>
                <Button variant="success" onClick={handleCheckout}>Checkout</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  );
};

export default ShoppingCart;
