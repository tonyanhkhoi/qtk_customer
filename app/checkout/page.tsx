"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

const Checkout = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliverToAnotherAddress, setDeliverToAnotherAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const calculateTotal = (): number => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  useEffect(() => {
    // Retrieve cart items from local storage
    const storedEmail = localStorage.getItem('userInfoEmail');
    console.log('store email', storedEmail);
    if (storedEmail) {
      setEmail(storedEmail);
      // Retrieve user details based on the email as the key
      const storedName = localStorage.getItem(`userInfoName_${storedEmail}`);
      const storedImage = localStorage.getItem(`userInfoImage_${storedEmail}`);
      const storedAddress = localStorage.getItem(`userInfoAddress_${storedEmail}`);
      const storedPhone = localStorage.getItem(`userInfoPhone_${storedEmail}`);
      
    if (storedName) {
      setName(storedName);
    }

    if (storedPhone) {
      setPhone(storedPhone);
    }

    if (storedAddress) {
      setAddress(storedAddress);
    }
    const storedCartItems = localStorage.getItem(`cartItems${storedEmail}`);
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
    }


    // Retrieve user information from local stora
  }, []);

  const handleOptionChange = (option: string) => {
    setPaymentMethod(option);
  };

  const handleCheckout = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NThlZjZhZGI4NTEzODA3ZWEzMjQzMDgiLCJpYXQiOjE3MDQ3Mzk0MDcsImV4cCI6MTcwNDc5OTQwNywidHlwZSI6ImFjY2VzcyJ9.2em-bksNc0ELi5NjdK5PdeMA5I3m1hYwX_IPRaT9cbo"
    );

    const products = cartItems.map((card) => {
      // Get the existing cart items from local storage
      const existingCartItemsString = localStorage.getItem("cartItems");
      const existingCartItems = existingCartItemsString
        ? JSON.parse(existingCartItemsString)
        : [];

      // Find the product in the cart items
      const existingCartItem = existingCartItems.find(
        (item: { id: string }) => item.id === card.id
      );

      // Return an object with productId and quantity
      return {
        productId: card.id,
        quantity: card.quantity,
      };
    });

    const raw = JSON.stringify({
      customerId: "659d4c60777883002ec33bac",
      items: products,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    } as RequestInit;

    fetch("http://103.57.221.113:3000/v1//invoices/", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    if (paymentMethod === "COD") {
      console.log("Processing COD payment");
    } else if (paymentMethod === "Bank") {
      console.log("Redirecting to Bank payment gateway...");
    } else if (paymentMethod === "Momo") {
      console.log("Redirecting to Momo payment gateway...");
    } else {
      // Handle other payment methods
      console.log("Invalid payment method selected");
    }
    createInvoice();
    setShowModal(true);

  };
  const createInvoice = () => {
    const storedEmail = localStorage.getItem('userInfoEmail');
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(2, '0')}${String(currentDate.getDate()).padStart(2, '0')}`;
  
    // Count the number of invoices created on the current date
    const invoicesString = localStorage.getItem(`Invoices${storedEmail}`);
    const invoices = invoicesString ? JSON.parse(invoicesString) : [];
    const invoicesOnCurrentDate = invoices.filter((invoice: { date: string; }) => invoice.date === formattedDate).length;
  
    // Create the invoice with a unique ID based on the date and count
    const invoice = {
      id: `${formattedDate}${invoicesOnCurrentDate + 1}`,
      date: new Date().toLocaleDateString(),
      total: calculateTotal(),
      items: cartItems,
    };
  
    // Save the invoice to local storage with the user's email as part of the key
    invoices.push(invoice);
    localStorage.setItem(`Invoices${storedEmail}`, JSON.stringify(invoices));
  
    // Clear the cart items from local storage
    localStorage.removeItem(`cartItems${storedEmail}`);
  };
  
  const handleCloseModal = () => {
    // Close the modal
    setShowModal(false);

    // Redirect to the home page
    router.push("/");
  };
  return (
    <Row className="d-flex">
      <Col
        className="d-flex flex-column align-items-center mt-5 mb-5"
        style={{
          width: "600px",
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h1>Check out information</h1>
        <Form className="mt-3">
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="Enter"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email" className="mt-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="Enter email"
              placeholder="Nhập Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="phone" className="mt-2">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="address" className="mt-2">
            <Form.Label>Address</Form.Label>
            <Form.Control
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="d-flex justify-content-between align-items-center mt-2">
            <Form.Check
              type="checkbox"
              label="Deliver To Another Address"
              style={{ marginRight: "50px" }}
              checked={deliverToAnotherAddress}
              onChange={() =>
                setDeliverToAnotherAddress(!deliverToAnotherAddress)
              }
            />
            <p style={{ marginLeft: "50px" }}></p>
          </Form.Group>
        </Form>
      </Col>
      <Col
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <h1 className="text-center">Your Cart</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Index</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.price} VND</td>
                <td>{item.quantity}</td>
                <td>{item.price * item.quantity} VND</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h3>Payment method</h3>
        <Form>
          <Form.Check
            type="radio"
            label={`COD`}
            checked={paymentMethod === "COD"}
            onChange={() => handleOptionChange("COD")}
          />
          <Form.Check
            type="radio"
            label={`Bank`}
            checked={paymentMethod === "Bank"}
            onChange={() => handleOptionChange("Bank")}
          />
          <Form.Check
            type="radio"
            label={`Momo`}
            checked={paymentMethod === "Momo"}
            onChange={() => handleOptionChange("Momo")}
          />
          <h5>Total: {calculateTotal()} VND</h5>
          <Button
            className="d-flex"
            variant="success"
            style={{
              width: "100%",
              justifyContent: "center",
              flexWrap: "wrap",
              alignContent: "center",
              borderRadius: "1.5vw",
              height: "4vw",
              fontSize: "1.6vw",
            }}
            onClick={handleCheckout}
          >
            Check out
          </Button>
        </Form>
      </Col>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Your order has been successfully processed. Thank you for shopping
            with us!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};

export default Checkout;
