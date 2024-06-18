import { useState, useEffect } from "react";
import { getAccessToken } from "../components/authUtils";

const OrderFetcher = ({ setOrders }) => {
  useEffect(() => {
    const fetchOrdersRecursive = async (url) => {
      try {
        let allOrders = [];

        // Fetch orders from the provided URL
        const response = await fetch(url, {
          headers: { Authorization: `JWT ${getAccessToken()}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();

        // Concatenate the new orders with the existing ones
        allOrders = [...allOrders, ...data.results];

        // Check if there is a next page
        if (data.next) {
          // If there is a next page, recursively fetch orders from the next page
          allOrders = [...allOrders, ...(await fetchOrdersRecursive(data.next))];
        }

        return allOrders;
      } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
      }
    };

    const url = "http://127.0.0.1:8080/core/order/";
    fetchOrdersRecursive(url).then((orders) => {
      setOrders(orders);
    });
  }, [setOrders]);

  return null;
};

export default OrderFetcher;
