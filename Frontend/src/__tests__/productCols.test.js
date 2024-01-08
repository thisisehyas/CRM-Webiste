import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import ProductsCols from "./ProductsCols"; // Adjust the import path based on your file structure

describe("ProductsCols Component", () => {
  afterEach(() => {
    cleanup(); // Clean up the DOM after each test
  });

  test("renders product cards correctly", () => {
    // Arrange
    render(<ProductsCols />);

    // Act - No specific action needed for this test

    // Assert
    // Check if the badge text is present in the DOM
    const badgeText = screen.getByText("پربازدیدترین محصولات");
    expect(badgeText).toBeInTheDocument();

    // Check if the product cards are present in the DOM
    for (let index = 1; index <= 6; index++) {
      const cardImage = screen.getByAltText(`Product ${index}`);
      expect(cardImage).toBeInTheDocument();
    }
  });
});
