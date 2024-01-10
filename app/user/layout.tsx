"use client";
//import type { Metadata } from 'next'
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";

import { useEffect } from "react";
import UserSidebar from "@/components/UserSidebar";
import { Row, Col } from "react-bootstrap";
import { useParams, usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  return (
    <Container fluid>
      <Row>
        <Col xs={2} id="sidebar-wrapper">
          <UserSidebar />
        </Col>
        <Col
          xs={10}
          id="page-content-wrapper"
          className="d-flex justify-content-center align-items-center"
        >
          <Container>{children}</Container>
        </Col>
      </Row>
    </Container>
  );
}
