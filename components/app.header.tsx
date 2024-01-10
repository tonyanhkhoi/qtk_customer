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
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "react-bootstrap";

const AppHeader = () => {
  const [hoveredLinks, setHoveredLinks] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token != null) {
        setIsLoggedIn(true);
    }
    else 
        setIsLoggedIn(false);
  }, );
  const handleSignOut = () => {
    // Show the sign-out confirmation modal
    setShowSignOutModal(true);
  };

  const handleConfirmSignOut = () => {
    // Logic for handling sign-out, update isLoggedIn state
    localStorage.removeItem("token");
    localStorage.setItem("userInfoEmail", "0");
    setIsLoggedIn(false);
    setShowSignOutModal(false);
    router.push("/");
  };

  const handleCancelSignOut = () => {
    // Close the sign-out confirmation modal
    setShowSignOutModal(false);
  };

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
    <Container>
      <Row>
        <Col>
          <span style={{ color: "#666666" }}>
            QTK Store, UIT Road, HCM City
          </span>
        </Col>
        <Col xs={6}></Col>
        <Col className="justify-content-end">
          {isLoggedIn ? (
            <span style={{ color: "#666666", textAlign: "end" }}>
              <Button variant="link" onClick={handleSignOut}>
                Sign out
              </Button>
            </span>
          ) : (
            <span style={{ color: "#666666", textAlign: "end" }}>
              <Link href="/login">Log In</Link> /{" "}
              <Link href="/signup">Sign Up</Link>
            </span>
          )}
        </Col>
      </Row>

      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar className="bg-body-tertiary">
            <Container>
              <Navbar.Brand href="/">
                <img
                  alt=""
                  src="/store_icon.png"
                  width="40"
                  height="40"
                  className="d-inline-block align-top"
                />{" "}
                <span style={{ fontSize: "30px" }}>QTK STORE</span>
              </Navbar.Brand>
            </Container>
          </Navbar>
        </Container>
      </Navbar>
      <Modal show={showSignOutModal} onHide={handleCancelSignOut}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Out Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to sign out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelSignOut}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmSignOut}>
            Sign Out
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <Navbar className='bg-dark'>
                    <Container>
                        <Row>
                        <Col>
                            <Nav defaultActiveKey="/home">
                            <Nav.Link href="/home" style={{ color: hoveredLinks[0] ? '#FFFFFF' : '#999999' }} onMouseEnter={() => handleMouseEnter(0)} onMouseLeave={() => handleMouseLeave(0)}>Tài khoản</Nav.Link>
                            <Nav.Link eventKey="link-1" style={{ color: hoveredLinks[1] ? '#FFFFFF' : '#999999' }} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={() => handleMouseLeave(1)}>Lịch sử đặt hàng</Nav.Link>
                            <Nav.Link eventKey="link-2" style={{ color: hoveredLinks[2] ? '#FFFFFF' : '#999999' }} onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={() => handleMouseLeave(2)}>Giỏ hàng</Nav.Link>
                            <Nav.Link eventKey="disabled" style={{ color: hoveredLinks[3] ? '#FFFFFF' : '#999999' }} onMouseEnter={() => handleMouseEnter(3)} onMouseLeave={() => handleMouseLeave(3)}>Yêu thích</Nav.Link>
                            <Nav.Link href="/home" style={{ color: hoveredLinks[4] ? '#FFFFFF' : '#999999' }} onMouseEnter={() => handleMouseEnter(4)} onMouseLeave={() => handleMouseLeave(4)}>Liên hệ</Nav.Link>
                            </Nav>
                        </Col>
                        </Row>
                    </Container>
                    </Navbar> */}
    </Container>
  );
};

export default AppHeader;
