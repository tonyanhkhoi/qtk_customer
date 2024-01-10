import React from "react";
import CardList from "../../components/CardList";
import CategoryCheck from "@/components/CategoryCheckList";
import { Container, Row, Col } from "react-bootstrap";

const Store: React.FC = () => {
  return (
    <Container>
      <CardList itemsPerPage={20} deckTitle="Your Deck Title" />
    </Container>
  );
};

export default Store;
