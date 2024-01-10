import React, { useState, useEffect } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { useRouter } from "next/navigation";

interface CartItem {
  id: string; // Change the type of id to string
  title: string;
  price: number;
  quantity: number;
}

const ShoppingCartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Retrieve cart items from local storage
    const storedEmail = localStorage.getItem('userInfoEmail');
    const storedCartItems = localStorage.getItem(`cartItems${storedEmail}`);
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const calculateTotal = (): number => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleQuantityChange = (index: number, amount: number): void => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  
    // Update local storage after changing the quantity
    const storedEmail = localStorage.getItem('userInfoEmail');
    const updatedCartItems = JSON.parse(localStorage.getItem(`cartItems${storedEmail}`) || "[]");
    updatedCartItems[index].quantity = Math.max(1, updatedCartItems[index].quantity + amount);
    localStorage.setItem(`cartItems${storedEmail}`, JSON.stringify(updatedCartItems));
  };
  
  

  const handleCheckoutbtn = () => {
    router.push("./checkout");
  };

  return (
    <div className="d-flex">
      {/* Left Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td> {/* Assuming id is a string */}
              <td>{item.title}</td>
              <td>{item.price} VND</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleQuantityChange(index, -1)}
                >
                  -
                </Button>{" "}
                {item.quantity}{" "}
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleQuantityChange(index, 1)}
                >
                  +
                </Button>
              </td>
              <td>{item.price * item.quantity} VND</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Right Container */}
      <Container className="col-md-3">
        <h2>Total</h2>
        <div>
          <p>Total Price: {calculateTotal()} VND</p>
          <Button variant="success" onClick={handleCheckoutbtn}>
            Checkout
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default ShoppingCartPage;
