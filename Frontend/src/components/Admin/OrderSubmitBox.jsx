import React, { useState, useEffect, useTransition } from "react";
import { Container, Row, Col, Button, FormGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "../../styles/fontSize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAccessToken } from "../authUtils";

const OrderSubmitBox = () => {
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState("");
  const [filteredMachines, setFilteredMachines] = useState([]);
  const [searchTextMachine, setSearchTextMachine] = useState("");

  const [costumer, setCostumers] = useState([]);
  const [selectedCostumer, setSelectedCostumer] = useState("");
  const [filteredCostumers, setFilteredCostumers] = useState([]);
  const [searchTextCostumer, setSearchTextCostumer] = useState("");

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/machine/");
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

    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/auth/users/", {
          headers: { Authorization: `JWT ${getAccessToken()}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }
        const data = await response.json();

        setCostumers(data);
        setFilteredCostumers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    const fetchAdminInfo = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/auth/users/me/", {
          headers: { Authorization: `JWT ${getAccessToken()}` },
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
    fetchCustomers();
    fetchAdminInfo();
  }, []);

  const handleMachineChange = (e) => {
    const machineId = e.target.value;
    setSelectedMachine(machineId);
    setSearchTextMachine(
      machines.find((machine) => machine.id === parseInt(machineId)).title
    );
  };

  const handleCustomerChange = (e) => {
    setSelectedCostumer(e.target.value);
    setSearchTextCostumer(
      costumer.find((customer) => customer.id === parseInt(e.target.value))
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

  const handleFilterChangeCustomer = (e) => {
    const keyword = e.target.value;
    setSearchTextCostumer(keyword);
    const filtered = costumer.filter((customer) =>
      customer.username.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredCostumers(filtered);

    if (filtered.length === 1) {
      setSelectedCostumer(filtered[0].id.toString());
    } else {
      setSelectedCostumer("");
    }
  };

  return (
    <>
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
                value={selectedCostumer}
                onChange={handleCustomerChange}
                required
                style={{ marginTop: "5px" }}
              >
                <option value="">انتخاب کنید...</option>
                {filteredCostumers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.username}
                  </option>
                ))}
              </Form.Control>
              <Form.Control
                className="mt-2"
                type="text"
                value={searchTextCostumer}
                onChange={handleFilterChangeCustomer}
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
              <Form.Control as="textarea" required rows={3} />
            </Form.Group>
          </Row>
          <div className="d-flex justify-content-center mt-4">
            <Button type="submit" style={{ width: "15%", fontSize: "115%" }}>
              ثبت
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default OrderSubmitBox;

// put a format for the data input field.
// see if you are getting all the info needed to submit an order.
