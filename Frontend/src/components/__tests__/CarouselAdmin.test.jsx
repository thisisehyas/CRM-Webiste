import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import CarouselAdmin from "../Admin/AdminCarousel";
import "@testing-library/jest-dom";

jest.mock("axios");

describe("CarouselAdmin", () => {
  const mockItems = [
    { id: 1, url: "https://example.com/image1.jpg", title: "Image 1" },
    { id: 2, url: "https://example.com/image2.jpg", title: "Image 2" },
    { id: 3, url: "https://example.com/image3.jpg", title: "Image 3" },
  ];

  axios.get.mockResolvedValue({ data: [] });

  beforeEach(() => {
    // Mock the GET request for initial items
    axios.get.mockResolvedValue({ data: mockItems });
  });

  test("renders CarouselAdmin component", async () => {
    render(<CarouselAdmin />);
    // Wait for initial items to be loaded
    await waitFor(() => {
      expect(screen.getByAltText("Image 1")).toBeDefined();
      expect(screen.getByAltText("Image 2")).toBeDefined();
      expect(screen.getByAltText("Image 3")).toBeDefined();
    });
  });

  it('adds a new image when "Add New Image" button is clicked', async () => {
    render(<CarouselAdmin />);

    // Mock the response for fetching carousel items
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, url: "https://example.com/image1.jpg", title: "Image 1" },
        { id: 2, url: "https://example.com/image2.jpg", title: "Image 2" },
        { id: 3, url: "https://example.com/image3.jpg", title: "Image 3" },
      ],
    });

    // Wait for the component to render with fetched items
    await waitFor(() => {
      // Check if the "Add New Image" button is present
      const addNewImageButton = screen.getByText("Add New Image");

      // Mock the axios.post call
      axios.post.mockResolvedValueOnce({
        data: { id: 4, url: "image4.jpg", title: "Image 4" },
      });

      // Trigger the button click
      fireEvent.click(addNewImageButton);
    });

    // Access the modal inputs and change their values
    const imageURLInput = screen.getByLabelText("Image URL");
    const altTextInput = screen.getByLabelText("Image Alt Text");

    fireEvent.change(imageURLInput, { target: { value: "newImage.jpg" } });
    fireEvent.change(altTextInput, { target: { value: "New Image" } });

    // Trigger the "Add Image" button click
    fireEvent.click(screen.getByText("Add Image"));

    // Verify that axios.post is called with the correct parameters
    expect(axios.post).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/photos",
      {
        url: "newImage.jpg",
        title: "New Image",
      }
    );

    // Verify that the new image is added to the carousel
    await waitFor(() => {
      const newImage = screen.getByAltText("Image 4");
      expect(newImage).toBeInTheDocument();
    });
  });

  it('removes image when "Remove Image" button is clicked', async () => {
    render(<CarouselAdmin />);

    // Wait for the component to render with fetched items
    await waitFor(() => {
      // Check if the "Remove Image" buttons are present for the carousel items
      const removeImageButtons = screen.getAllByText("Remove Image");
      expect(removeImageButtons).toHaveLength(3);

      // Mock the axios.delete call
      axios.delete.mockResolvedValueOnce();

      // Trigger the button click for the first carousel item
      fireEvent.click(removeImageButtons[0]);
    });

    // Verify that axios.delete is called with the correct URL for the first item
    expect(axios.delete).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/photos/1"
    );
  });
});
