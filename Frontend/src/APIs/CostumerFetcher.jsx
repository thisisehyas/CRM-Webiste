import { useState, useEffect } from "react";
import { getAccessToken } from "../components/authUtils";

const CustomerFetcher = ({ setCustomers }) => {
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/core/customer/", {
          headers: { Authorization: `JWT ${getAccessToken()}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, [setCustomers]);

  return null;
};

export default CustomerFetcher;
