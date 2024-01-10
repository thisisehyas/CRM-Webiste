import React from "react";
import { render, screen } from "@testing-library/react";
import ProductsCols from "../ProductsCols.jsx";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);

// Clear mock calls before each test
beforeEach(() => {
  window.IntersectionObserver = jest.fn();
});

describe("ProductsCols Component", () => {
  it("renders component and fetches data on mount", async () => {
    const mockProducts = [
      {
        id: 1,
        thumbnailUrl: "https://example.com/product1.jpg",
        title: "Product 1",
      },
    ];

    // Mock the fetch function to return mock data
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockProducts),
      })
    );

    render(<ProductsCols />);

    // Wait for the initial fetch to complete
    await screen.findByText("Loading...");

    // Ensure the loading spinner is rendered
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Ensure the badge is rendered
    expect(screen.getByText("پربازدیدترین محصولات")).toBeInTheDocument();
  });

  it("renders product cards with correct alt text", async () => {
    const mockProducts = [
      {
        id: 1,
        thumbnailUrl: "https://example.com/product1.jpg",
        title: "Product 1",
      },
    ];

    // Mock the fetch function to return mock data
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockProducts),
      })
    );

    render(<ProductsCols />);

    // Wait for the initial fetch to complete
    await screen.findByText("Loading...");

    // Ensure the product cards are rendered based on mock data
    mockProducts.forEach((product) => {
      const productImage = screen.getByAltText(product.title);
      expect(productImage).toBeInTheDocument();
      expect(productImage).toHaveAttribute("alt", product.title);
    });
  });
});
