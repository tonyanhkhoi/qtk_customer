'use client'
import React from "react";
import CustomerInfo from "../../../components/customerinfo";
import { Container, Row, Col } from "react-bootstrap";
import UserSidebar from "@/components/UserSidebar";

const account: React.FC = () => {
  return (
    <Container fluid className="d-flex justify-content-center align-items-center">
        <CustomerInfo />
    </Container>
  );
};

export default account;
