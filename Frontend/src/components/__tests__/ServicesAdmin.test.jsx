import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import Services from "../Admin/AdminServices.jsx";
import "@testing-library/jest-dom";

jest.mock("axios");

describe("Services Component", () => {
  test("renders services", async () => {
    const fakeServices = [
      {
        id: 1,
        title: "Service 1",
        body: "Description 1",
        thumbnailUrl: "image1.jpg",
      },
      {
        id: 2,
        title: "Service 2",
        body: "Description 2",
        thumbnailUrl: "image2.jpg",
      },
    ];

    axios.get.mockResolvedValueOnce({ data: fakeServices });

    render(<Services />);

    // Use waitFor to wait for asynchronous operations to complete
    await waitFor(() => {
      expect(screen.getByText("Service 1")).toBeInTheDocument();
      expect(screen.getByText("Service 2")).toBeInTheDocument();
    });
  });

  test("opens and closes the modal", async () => {
    const fakeService = {
      id: 1,
      title: "Service 1",
      body: "Description 1",
      thumbnailUrl: "image1.jpg",
    };

    axios.get.mockResolvedValueOnce({ data: [fakeService] });

    render(<Services />);

    // Wait for services to load
    await waitFor(() => {
      expect(screen.getByText("Service 1")).toBeInTheDocument();
    });

    // Click the Edit button to open the modal
    fireEvent.click(screen.getByText("Edit"));

    // Check if the modal is open
    expect(screen.getByText("Edit Service")).toBeInTheDocument();

    // Close the modal
    fireEvent.click(screen.getByText("Close"));

    // Check if the modal is closed
    await waitFor(() => {
      expect(screen.queryByText("Edit Service")).not.toBeInTheDocument();
    });
  });

  test("displays loading spinner while services are being fetched", async () => {
    axios.get.mockResolvedValueOnce({ data: [] }); // Empty services initially

    render(<Services />);

    // Check if the loading spinner is displayed initially
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();

    // Wait for services to load
    await waitFor(() => {
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    });

    // Check if the loading spinner is removed after services are loaded
    expect(screen.queryByTestId("loading-spinner")).toBeNull();
  });
});
