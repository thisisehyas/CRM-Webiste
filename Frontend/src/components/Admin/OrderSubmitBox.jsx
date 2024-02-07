import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, FormGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "../../styles/fontSize.css";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderSubmitBox = () => {
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState("");
  const [filteredMachines, setFilteredMachines] = useState([]);
  const [searchText, setSearchText] = useState("");

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

    fetchMachines();
  }, []);

  const handleMachineChange = (e) => {
    const machineId = e.target.value;
    setSelectedMachine(machineId);
    setSearchText(
      machines.find((machine) => machine.id === parseInt(machineId)).title
    );
  };

  const handleFilterChange = (e) => {
    const keyword = e.target.value;
    setSearchText(keyword);
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
              <Form.Label className="mt-2">آیدی خریدار</Form.Label>
              <Form.Control required type="number" />
            </Form.Group>

            <Form.Group as={Col} md="6">
              <Form.Label className="mt-2">انتخاب ماشین</Form.Label>

              <Form.Control
                type="text"
                value={searchText}
                onChange={handleFilterChange}
                placeholder="جستجو..."
              />
              <Form.Text className="text-muted">
                می‌توانید برای انتخاب راحت‌تر نام ماشین را جست‌وجو کنید.
              </Form.Text>

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
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md="6">
              <Form.Label className="mt-2">ایمیل</Form.Label>
              <Form.Control
                type="email"
                required
                pattern="[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9"
              />
            </Form.Group>

            <Form.Group as={Col} md="6">
              <Form.Label className="mt-2">تاریخ</Form.Label>
              <InputGroup hasValidation>
                <Form.Control type="text" required />
              </InputGroup>
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
