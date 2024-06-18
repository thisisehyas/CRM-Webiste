import React, { useState, useEffect, useTransition } from "react";
import { Container, Row, Col, Button, FormGroup, Alert } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "../../styles/fontSize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAccessToken } from "../authUtils";
import CustomerFetcher from "../../APIs/CostumerFetcher";
import OrderFetcher from "../../APIs/OrderFetcher";

const OrderSubmitBox = () => {
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState("");
  const [filteredMachines, setFilteredMachines] = useState([]);
  const [searchTextMachine, setSearchTextMachine] = useState("");

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTextUser, setSearchTextUser] = useState("");

  // states needed for creating a costumer when the form is submitted
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customerId, setCustomerId] = useState(null);

  // state needed for creating an order when the form is submitted
  const [description, setDescription] = useState("");

  // state for storing the list of costumers
  // fetched by CostumerFetcher component
  const [customers, setCustomers] = useState([]);

  // state for storing the fetched orders list
  const [orders, setOrders] = useState([]);

  // states for the success and error message related to the order submitting
  const [orderSuccessMessage, setOrderSuccessMessage] = useState(null);
  const [orderErrorMessage, setOrderErrorMessage] = useState(null);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/core/machine/");
        if (!response.ok) {
          throw new Error("Failed to fetch machines");
        }
        const data = await response.json();
        setMachines(data.results);
        setFilteredMachines(data.results);
      } catch (error) {
        console.error("Error fetching machines:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/core/auth/users/", {
          headers: { Authorization: `Bearer ${getAccessToken()}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }
        const data = await response.json();

        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    const fetchAdminInfo = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/core/auth/users/me/", {
          headers: { Authorization: `Bearer ${getAccessToken()}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch admin info");
        }
        const data = await response.json();
      } catch (error) {
        console.log("Error fetching admin info: ", error);
      }
    };

    fetchMachines();
    fetchUsers();
    fetchAdminInfo();
  }, []);

  const handleMachineChange = (e) => {
    const machineId = e.target.value;
    setSelectedMachine(machineId);
    setSearchTextMachine(
      machines.find((machine) => machine.id === parseInt(machineId)).title
    );
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
    setSearchTextUser(
      users.find((customer) => customer.id === parseInt(e.target.value))
        .username
    );
  };

  const handleFilterChangeMachine = (e) => {
    const keyword = e.target.value;
    setSearchTextMachine(keyword);
    const filtered = machines.filter((machine) =>
      machine.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredMachines(filtered);

    if (filtered.length === 1) {
      setSelectedMachine(filtered[0].id.toString());
    } else {
      setSelectedMachine("");
    }
  };

  const handleFilterChangeUser = (e) => {
    const keyword = e.target.value;
    setSearchTextUser(keyword);
    const filtered = users.filter((customer) =>
      customer.username.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredUsers(filtered);

    if (filtered.length === 1) {
      setSelectedUser(filtered[0].id.toString());
    } else {
      setSelectedUser("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser || isNaN(parseInt(selectedUser))) {
      console.error("Invalid user ID");
      return; // Won't proceed with the request if user ID is invalid
    }

    try {
      //creating the costumer out of the user when the form is submitted.
      const requestBody = JSON.stringify({
        user_id: parseInt(selectedUser),
        phone_number: phoneNumber,
      });
      console.log("Request Payload:", requestBody);

      const response = await fetch("http://127.0.0.1:8080/core/customer/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: requestBody,
      });

      // for debugging (related to creating a costumer)

      // const responseData = await response.json();
      // console.log("Response Status:", response.status);
      // console.log("Response Body:", responseData);

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage =
          errorData?.phone_number?.[0] || "خطا در ثبت اطلاعات مشتری";
        console.error("Error creating customer:", errorMessage);

        return;
      }

      const data = await response.json();
      setCustomerId(data.id);
      setCustomers([...customers, data]);

      // Submitting the order

      // const selectedMachineData = machines.find(
      //   (machine) => machine.id === parseInt(selectedMachine)
      // );

      // const requestBodyOrder = JSON.stringify({
      //   customer: customerId,
      //   machine: parseInt(selectedMachine),
      //   unit_price: selectedMachineData.unit_price,
      //   description: description,
      // });

      // const responseOrder = await fetch("http://127.0.0.1:8000/order/", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${getAccessToken()}`,
      //   },
      //   body: requestBodyOrder,
      // });

      // console.log("for debugging");
      // const responseData = await responseOrder.json();
      // console.log("Response Status:", response.status);
      // console.log("Response Body:", responseData);

      // if (!responseOrder.ok) {
      //   const errorData = await responseOrder.json();
      //   const errorMessage = errorData || "خطا در ثبت سفارش";
      //   console.error("Error creating order:", errorMessage);
      //   setErrorMessage(errorMessage);
      //   return;
      // }

      // // success in creating the Order
      // setSuccessMessage("سفارش با موفقيت ثبت شد.");

      // const orderData = await responseOrder.json();
      // console.log("Order data: " + orderData);

      // console.log("Customers: ", customers);
      // console.log("Orders: ", orders);
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  const submitOrder = async () => {
    console.log("Submitting order for customer with ID:", customerId);
    try {
      // Submitting the order
      const selectedMachineData = machines.find(
        (machine) => machine.id === parseInt(selectedMachine)
      );

      const requestBodyOrder = JSON.stringify({
        customer: customerId,
        machine: parseInt(selectedMachine),
        unit_price: selectedMachineData.unit_price,
        description: description,
      });

      const responseOrder = await fetch("http://127.0.0.1:8080/core/order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: requestBodyOrder,
      });

      console.log("for debugging");
      const responseData = await responseOrder.json();
      console.log("Response Status:", response.status);
      console.log("Response Body:", responseData);

      if (!responseOrder.ok) {
        const errorData = await responseOrder.json();
        const errorMessage = errorData || "خطا در ثبت سفارش";
        console.error("Error creating order:", errorMessage);
        setOrderErrorMessage(errorMessage);
        return;
      }

      // success in creating the Order
      console.log("order success messgae that was set: ", orderSuccessMessage);

      setOrderSuccessMessage("سفارش با موفقیت ثبت شد.");

      const orderData = await responseOrder.json();
      console.log("Order data: " + orderData);

      console.log("Customers: ", customers);
      console.log("Orders: ", orders);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  useEffect(() => {
    if (customerId !== null) {
      submitOrder();
      console.log("customer id is: ", customerId);
      // setOrderSuccessMessage("HI! Are you the problem?");
    } else {
      console.log("customerID state is null.");
    }
  }, [customerId]);
  console.log("List of orders: ", orders);
  console.log("List of customers: ", customers);

  return (
    <>
      {/* components that fetch some lists */}
      <CustomerFetcher setCustomers={setCustomers} />
      <OrderFetcher setOrders={setOrders} />
      {}
      {/* components that render */}
      <Container
        style={{
          backgroundColor: "#92C7CF",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
        className="p-4 mt-3 mb-3 change-font"
      >
        <Form style={{ textAlign: "right", direction: "rtl" }}>
          <h5 className="text-center mb-5"> ثبت سفارش جدید</h5>
          <Row>
            <Form.Group as={Col} md="6">
              <Form.Label className="mt-2">انتخاب خریدار</Form.Label>
              <Form.Control
                as="select"
                value={selectedUser}
                onChange={handleUserChange}
                required
                style={{ marginTop: "5px" }}
              >
                <option value="">انتخاب کنید...</option>
                {filteredUsers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.username}
                  </option>
                ))}
              </Form.Control>
              <Form.Control
                className="mt-2"
                type="text"
                value={searchTextUser}
                onChange={handleFilterChangeUser}
                placeholder="جستجو..."
              />
              <Form.Text className="text-muted">
                می‌توانید برای انتخاب راحت‌تر، نام کاربری را جست‌وجو کنید.
              </Form.Text>
            </Form.Group>

            <Form.Group as={Col} md="6">
              <Form.Label className="mt-2">انتخاب ماشین</Form.Label>

              <Form.Control
                as="select"
                value={selectedMachine}
                onChange={handleMachineChange}
                required
                style={{ marginTop: "5px" }}
              >
                <option value="">انتخاب کنید...</option>
                {filteredMachines.map((machine) => (
                  <option key={machine.id} value={machine.id}>
                    {machine.title}
                  </option>
                ))}
              </Form.Control>

              <Form.Control
                className="mt-2"
                type="text"
                value={searchTextMachine}
                onChange={handleFilterChangeMachine}
                placeholder="جستجو..."
              />
              <Form.Text className="text-muted">
                می‌توانید برای انتخاب راحت‌تر، نام ماشین را جست‌وجو کنید.
              </Form.Text>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="6">
              <Form.Label className="mt-2">شماره تماس خریدار</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  style={{ direction: "rtl", textAlign: "right" }}
                  type="tel"
                  pattern="^(\+98|0)?9\d{9}$"
                  required
                  placeholder="مثال: 09123456789"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  لطفاً یک شماره تماس معتبر وارد کنید. (به عنوان مثال:
                  09123456789)
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label className="mt-2">تعداد ماشین</Form.Label>
              <InputGroup hasValidation>
                <Form.Control type="number" required />
              </InputGroup>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md="12">
              <Form.Label className="mt-2">توضیحات</Form.Label>
              <Form.Control
                as="textarea"
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Row>
          <div className="d-flex justify-content-center mt-4">
            <Button
              onClick={handleSubmit}
              type="submit"
              style={{ width: "15%", fontSize: "115%" }}
            >
              ثبت
            </Button>
          </div>
        </Form>
        {orderErrorMessage && (
          <Alert variant="danger" className="mt-3">
            {orderErrorMessage}
          </Alert>
        )}

        {orderSuccessMessage && (
          <Alert variant="success" className="mt-3">
            {orderSuccessMessage}
          </Alert>
        )}
      </Container>
    </>
  );
};

export default OrderSubmitBox;

// The phone number of the customer should be placed in the phone number field if the costumer already exists.
// The pattern is not checked for the phone number field.
// First should be checked if the user is already a costumer. If yes, the phone number field should
//    be filled with the phone number of costumer. If not a customer should be made which is already
//    happening by default. 
