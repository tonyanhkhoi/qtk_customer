"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";

const accInfo = () => {

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [password3, setPassword3] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const router = useRouter();

  // State to manage user information
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Load saved user information from local storage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem('userInfoEmail');
    console.log('store email', storedEmail);
    if (storedEmail) {
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
    }

  }, []);

  const handleSaveInformation = () => {
    // Save user information to local storage with email as the key
    localStorage.setItem(`userInfoName_${email}`, name);
    localStorage.setItem(`userInfoPhone_${email}`, phone);
    localStorage.setItem(`userInfoAddress_${email}`, address);
  };
  // Load saved email and password from local storage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    const storedPassword = localStorage.getItem("rememberedPassword");
    const storedRememberPassword = localStorage.getItem("rememberPassword");

    if (storedEmail && storedRememberPassword === "true") {
      setEmail(storedEmail);
      setPassword(storedPassword || "");
    }
  }, []);

  return (
    <>
      <Container
        className="d-flex flex-column align-items-center mt-5 mb-5"
        style={{
          width: "600px",
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h1>User's Information</h1>
        <Form className="mt-3">
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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

          <Button
            variant="success"
            type="button"
            className="w-100 mt-3"
            onClick={handleSaveInformation}
          >
            Save Information
          </Button>
        </Form>
      </Container>
      
    </>
  );
};
export default accInfo;
