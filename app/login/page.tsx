"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const login = () => {
  const apiUrl = process.env.QTK_API;
  const router = useRouter();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    email: email,
    password: password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  } as RequestInit;

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [rememberPassword, setRememberPassword] = useState(false);
  const handleBtn = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Password:", rememberPassword);
    const [error, setError] = useState("");

    // Redirect to home page after successful login
    router.push("/");
  };
  // State to manage the form field

  // Load saved email and password from local storage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    const storedPassword = localStorage.getItem("rememberedPassword");
    const storedRememberPassword = localStorage.getItem("rememberPassword");

    if (storedEmail && storedRememberPassword === "true") {
      setEmail(storedEmail);
      setPassword(storedPassword || "");
      setRememberPassword(true);
    }
  }, []);
  const handleModalClose = () => {
    // Close the login success modal
    setShowSuccessModal(false);
                
    router.push('/');
    router.refresh();
  };
  // Handle form submission
  const handleLogin = () => {
    // Save email and password to local storage if "Remember password" is checked
    if (rememberPassword) {
      localStorage.setItem("rememberedEmail", email);
      localStorage.setItem("rememberedPassword", password);
      localStorage.setItem("rememberPassword", "true");
    } else {
      // Clear saved data if "Remember password" is unchecked
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
      localStorage.removeItem("rememberPassword");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasUppercase = /[A-Z]/;
    const hasNumber = /\d/;
    const isValidEmail = emailRegex.test(email);
    const isPasswordValid =
      hasUppercase.test(password) && hasNumber.test(password);
    let result = "";

    if (!isValidEmail) {
      result += "Email is not valid.";
    }
    // if (!isPasswordValid) {
    //   result +=
    //     "\nPassword is not valid. It should contain at least 1 uppercase letter and at least 1 number.";
    // }
    if (password == "") {
      result += "\nPassword cannot be empty";
    }
    if (email == "") {
      result += "\nEmail cannot be empty";
    }
    if (result !== "") {
      setError(result);
    } else {
      fetch("http://103.57.221.113:3000/v1/auth/login", requestOptions)
        .then(async (response) => {
          const body = await response.json();
          if (response.status !== 200) {
            setError(body.message);
          } else {
            localStorage.setItem(`userInfoEmail`, email);
            // Assuming the API returns a token upon successful login
            console.log("Login successful");
            console.log("Token:", body.tokens.access.token);
            // Handle success, e.g., store the token in localStorage
            localStorage.setItem("token", body.tokens.access.token);
            // Show the login success modal

            setShowSuccessModal(true);
          }
        }
      );
    }
  };
  return (
    <Container
      className="d-flex flex-column align-items-center mt-5"
      style={{ width: "600px" }}
    >
      <h1>Log In</h1>
      <Form className="mt-3">
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password" className="mt-2">
          <Form.Label>Password</Form.Label>
          <div className="position-relative">
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
              className="position-absolute end-0 translate-middle-y border-0"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            >
              {showPassword ? "Hide" : "Show"}
            </Button>
          </div>
        </Form.Group>

        <Form.Group className="d-flex justify-content-between align-items-center mt-2">
          <Form.Check
            type="checkbox"
            label="Remember Password"
            style={{ marginRight: "50px" }}
            checked={rememberPassword}
            onChange={() => setRememberPassword(!rememberPassword)}
          />
          <a href="/forgot-password" style={{ marginLeft: "50px" }}>
            Forgot Password
          </a>
        </Form.Group>
        <div>
          <span style={{ color: "red" }}> {error} </span>
        </div>
        <Button
          variant="success"
          type="button"
          className="w-100 mt-3"
          onClick={handleLogin}
        >
          Log In
        </Button>
      </Form>

      <p className="mt-3">
        Don't have an account?{" "}
        <strong>
          <a href="./signup">Sign Up</a>
        </strong>
      </p>
      <Modal show={showSuccessModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your login was successful!</p>
          {/* Add any additional information or actions you want to show */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
export default login;

{
  /* <div>
<div>
    <Button variant="success">New</Button>
    <button onClick={() =>handleBtn()}>Back Home</button>
</div>
Facebook Page
</div> */
}
