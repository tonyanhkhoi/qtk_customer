import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

const CustomerInfo: React.FC = () => {
  const [isCustomized, setIsCustomized] = useState(false);
  const [customerName, setCustomerName] = useState("Customer's Name");
  const [customerImage, setCustomerImage] = useState("/avatar2.jpeg");
  const [customerInfo, setCustomerInfo] = useState({
    address: 'Random Address',
    email: 'random@email.com',
    phone: '+1234567890',
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    // Load saved customer information from local storage on component mount
    const storedEmail = localStorage.getItem('userInfoEmail');
    console.log('store email', storedEmail);
    if (storedEmail) {
      // Retrieve user details based on the email as the key
      const storedName = localStorage.getItem(`userInfoName_${storedEmail}`);
      const storedImage = localStorage.getItem(`userInfoImage_${storedEmail}`);
      const storedAddress = localStorage.getItem(`userInfoAddress_${storedEmail}`);
      const storedPhone = localStorage.getItem(`userInfoPhone_${storedEmail}`);
      console.log('store name', storedName);
      if (storedName) {
        setCustomerName(storedName);
      }

      if (storedImage) {
        setCustomerImage(storedImage);
      }

      if (storedAddress || storedEmail || storedPhone) {
        setCustomerInfo({
          address: storedAddress || 'Random Address',
          email: storedEmail || 'random@email.com',
          phone: storedPhone || '+1234567890',
        });
      }
    }
  }, []);


  const handleCustomize = () => {
    setIsCustomized(!isCustomized);
  };

  const handleSave = () => {
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      localStorage.setItem(`userInfoImage_${customerInfo.email}`, imageUrl);
      setCustomerImage(imageUrl);
    }

    setIsCustomized(false);
  };
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Check if any file is selected
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center text-center mt-5 mb-5">
      <Image
        src={customerImage}
        alt="Customer Image"
        roundedCircle
        width={150}
        height={150}
      />
      <h3 className="mt-3">{customerName}</h3>

      {isCustomized && (
        <>
          <input type="file" onChange={handleImageChange} />
          <br />
          <Button variant="success" onClick={handleSave} className='mb-3'>
            Save
          </Button>
        </>
      )}

      <ListGroup className="text-left mb-5" style={{ maxWidth: '250px', margin: 'auto' }}>
        <ListGroup.Item>Address: {customerInfo.address}</ListGroup.Item>
        <ListGroup.Item>Email: {customerInfo.email}</ListGroup.Item>
        <ListGroup.Item>Phone: {customerInfo.phone}</ListGroup.Item>
      </ListGroup>

      <Button variant="success" onClick={handleCustomize}>
        {isCustomized ? 'Cancel' : 'Customize'}
      </Button>
    </Container>
  );
};

export default CustomerInfo;
