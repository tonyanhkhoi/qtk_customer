'use client'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import style from '@/app/app.module.css';
import { useState } from 'react';

const App2ndHeader = () => {
    const [hoveredLinks, setHoveredLinks] = useState([false, false, false, false, false, false]);

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
        <Navbar className='bg-dark' sticky='top'>
            <Container>
                <Row>
                <Col>
                    <Nav defaultActiveKey="/home">
                    <Nav.Link href="/home" style={{ color: hoveredLinks[0] ? '#FFFFFF' : '#999999' }} onMouseEnter={() => handleMouseEnter(0)} onMouseLeave={() => handleMouseLeave(0)}>Trang chủ</Nav.Link>
                    <Nav.Link eventKey="link-1" style={{ color: hoveredLinks[1] ? '#FFFFFF' : '#999999' }} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={() => handleMouseLeave(1)}>Sản phẩm</Nav.Link>
                    <Nav.Link eventKey="link-2" style={{ color: hoveredLinks[2] ? '#FFFFFF' : '#999999' }} onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={() => handleMouseLeave(2)}>Lịch sử</Nav.Link>
                    <Nav.Link eventKey="disabled" style={{ color: hoveredLinks[3] ? '#FFFFFF' : '#999999' }} onMouseEnter={() => handleMouseEnter(3)} onMouseLeave={() => handleMouseLeave(3)}>Yêu thích</Nav.Link>
                    <Nav.Link href="/account" style={{ color: hoveredLinks[4] ? '#FFFFFF' : '#999999' }} onMouseEnter={() => handleMouseEnter(4)} onMouseLeave={() => handleMouseLeave(4)}>Điều khoản</Nav.Link>
                    </Nav>
                </Col>
                </Row>
            </Container>
            </Navbar>
  
  );
}

export default App2ndHeader;