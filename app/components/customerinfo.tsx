'use client'
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

const CustomerInfo: React.FC = () => {
  const [isCustomized, setIsCustomized] = useState(false);
  const [customerName, setCustomerName] = useState("Customer's Name");
  const [customerImage, setCustomerImage] = useState("avatar.jpeg");

  const handleCustomize = () => {
    if (!isCustomized) {
      setCustomerName('Customized Name');
      setCustomerImage('/path/to/customized-image.jpg');
    }
    setIsCustomized(!isCustomized);
  };

  return (
    <Container className="text-center mt-5 mb-5">
      <Image
        src={customerImage}
        alt="Customer Image"
        roundedCircle
        width={150}
        height={150}
      />
      <h3 className="mt-3">{customerName}</h3>
      
      <ListGroup className="text-left mb-5" style={{ maxWidth: '250px', margin: 'auto' }}>
        <ListGroup.Item>Address: Random Address</ListGroup.Item>
        <ListGroup.Item>Email: random@email.com</ListGroup.Item>
        <ListGroup.Item>Phone: +1234567890</ListGroup.Item>
      </ListGroup>

      <Button variant="success" onClick={handleCustomize}>
        {isCustomized ? 'Save' : 'Customize'}
      </Button>
    </Container>
  );
};

export default CustomerInfo;