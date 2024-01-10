"use client";
import React from "react";
import Container from "react-bootstrap/Container";
import ShoppingCartPage from "@/components/ShoppingCart";
import { Col, Row } from "react-bootstrap";
import UserSidebar from "@/components/UserSidebar";

const shoppingcart: React.FC = () => {
  return (
    <Container fluid>
      <Container className="mt-5 mb-5 text-center">
        <h2>Shopping Cart</h2>
        <ShoppingCartPage />
      </Container>
    </Container>
  );
};

export default shoppingcart;
