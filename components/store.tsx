import React, { useState } from "react";
import CardList from "@/components/CardList"
import CategoryCheckList from "@/components/CategoryCheckList";
import { Container, Row, Col } from "react-bootstrap";

const Store: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    // Toggle category selection
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((c) => c !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  const filteredCardData = cardData.filter((card) =>
    selectedCategories.length === 0
      ? true // If no categories selected, show all cards
      : selectedCategories.includes(card.category)
  );

  return (
    <Container>
      <Row>
        {/* Sidebar Component */}
        <Col xs={3}>
          <CategoryCheckList
            categories={categories}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
          />
        </Col>

        {/* Main Content */}
        <Col>
          <Container>
            <CardList
              cardData={filteredCardData}
              itemsPerPage={20}
              deckTitle="Your Deck Title"
            />
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Store;