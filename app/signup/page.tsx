"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";

const signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [acceptRules, setAcceptRules] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name: "Octopus",
    email: email,
    password: password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  } as RequestInit;

  const handleBtn = () => {
    const apiUrl = process.env.QTK_API;


    console.log("Email:", email);
    console.log("Password:", password);
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
    if (password != password2) {
      result += "\nPassword and Confirm Password do not match.";
    }
    if (password == "") {
      result += "\nPassword cannot be empty";
    }
    if (email == "") {
      result += "\nEmail cannot be empty";
    }
    if (!acceptRules) {
      result += "\nYou must accept our rules to create an account";
    }
    if (result != "") {
      setError(result);
    } else {
      fetch("http://103.57.221.113:3000/v1/auth/register", requestOptions).then(
        async (response) => {
          const body = await response.json();
          if (response.status != 201) {
            setError(body.message);
          } else {
            // Assuming the API returns a token upon successful login
            console.log("Register successful");
            console.log("Token:", body.tokens.access.token);
            // Handle success, e.g., store the token in localStorage
            localStorage.setItem("token", body.tokens.access.token);
            localStorage.setItem(`userInfoName_${email}`, name);
            localStorage.setItem(`userInfoEmail`, email);
            localStorage.setItem(`userInfoPhone_${email}`, phone);
            localStorage.setItem(`userInfoAddress_${email}`, address);
            router.push("/");
          }
        }
      );
    }
  };

  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center mt-5"
      style={{ width: "800px" }}
    >
      <h1>Sign Up</h1>
      <Row>
        <Col md={6}>
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
                  placeholder="Enter password"
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

            <Form.Group controlId="password2" className="mt-2">
              <Form.Label>Confirm Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showPassword2 ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword2(!showPassword2)}
                  className="position-absolute end-0 translate-middle-y border-0"
                  style={{ top: "50%", transform: "translateY(-50%)" }}
                >
                  {showPassword2 ? "Hide" : "Show"}
                </Button>
              </div>
            </Form.Group>

            <Form.Group className="d-flex justify-content-between align-items-center mt-2">
              <Form.Check
                type="checkbox"
                label={
                  <span>
                    Accept the <a href="/rules">Rules</a>
                  </span>
                }
                checked={acceptRules}
                onChange={() => setAcceptRules(!acceptRules)}
              />
            </Form.Group>
            <div>
              <span style={{ color: "red" }}> {error} </span>
            </div>
          </Form>
        </Col>
        <Col md={6}>
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
          </Form>
        </Col>
      </Row>
      <Button
              variant="success"
              type="button"
              className="w-100 mt-3"
              onClick={handleBtn}
            >
              Sign Up
            </Button>
      <p className="mt-3">
        Already have an account?{" "}
        <strong>
          <a href="/login">Log in</a>
        </strong>
      </p>
    </Container>
  );
};
export default signup;

{
  /* <div>
<div>
    <Button variant="success">New</Button>
    <button onClick={() =>handleBtn()}>Back Home</button>
</div>
Facebook Page
</div> */
}
