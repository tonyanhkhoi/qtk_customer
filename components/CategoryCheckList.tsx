// CategoryCheckList.tsx
import React from "react";
import { Form } from "react-bootstrap";

interface CategoryCheckListProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
}

const CategoryCheckList: React.FC<CategoryCheckListProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
}) => {
  return (
    <div>
      <h3>Categories</h3>
      {categories.map((category) => (
        <Form.Check
          key={category}
          type="checkbox"
          label={category}
          checked={selectedCategories.includes(category)}
          onChange={() => onCategoryChange(category)}
        />
      ))}
    </div>
  );
};

export default CategoryCheckList;
