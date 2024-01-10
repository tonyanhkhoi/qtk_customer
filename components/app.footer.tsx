"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import style from "@/app/app.module.css";
import { useState } from "react";

const AppFooter = () => {
  const [hoveredLinks, setHoveredLinks] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleMouseEnter = (index: number) => {
    setHoveredLinks((prevHoveredLinks) => {
      const updatedHoveredLinks = [...prevHoveredLinks];
      updatedHoveredLinks[index] = true;
      return updatedHoveredLinks;
    });
  };

  const handleMouseLeave = (index: number) => {
    setHoveredLinks((prevHoveredLinks) => {
      const updatedHoveredLinks = [...prevHoveredLinks];
      updatedHoveredLinks[index] = false;
      return updatedHoveredLinks;
    });
  };

  return (
    <Navbar className="bg-dark">
      <Container>
        <Row>
          <Col>
            <h1
              style={{ fontSize: "30px", textAlign: "center", color: "white" }}
            >
              QTK Store
            </h1>
            <p style={{ textAlign: "justify", color: "#808080" }}>
              Our motto: Customers are king, prioritizing service quality over revenue
            </p>
          </Col>
          <Col>
            <Nav defaultActiveKey="/" className="flex-column">
              <Nav.Link
                href="/user"
                style={{ color: hoveredLinks[0] ? "#FFFFFF" : "#999999" }}
                onMouseEnter={() => handleMouseEnter(0)}
                onMouseLeave={() => handleMouseLeave(0)}
              >
                Account
              </Nav.Link>
              <Nav.Link
                href="/history"
                style={{ color: hoveredLinks[1] ? "#FFFFFF" : "#999999" }}
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={() => handleMouseLeave(1)}
              >
                History
              </Nav.Link>
              <Nav.Link
                href="shoppingcart"
                style={{ color: hoveredLinks[2] ? "#FFFFFF" : "#999999" }}
                onMouseEnter={() => handleMouseEnter(2)}
                onMouseLeave={() => handleMouseLeave(2)}
              >
                Cart
              </Nav.Link>
            </Nav>
          </Col>
          <Col>
            <Nav defaultActiveKey="/home" className="flex-column">
              <Nav.Link
                href="/contact"
                style={{ color: hoveredLinks[4] ? "#FFFFFF" : "#999999" }}
                onMouseEnter={() => handleMouseEnter(4)}
                onMouseLeave={() => handleMouseLeave(4)}
              >
                Contact
              </Nav.Link>
              <Nav.Link
                href="/rules"
                style={{ color: hoveredLinks[5] ? "#FFFFFF" : "#999999" }}
                onMouseEnter={() => handleMouseEnter(5)}
                onMouseLeave={() => handleMouseLeave(5)}
              >
                Rules
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default AppFooter;
