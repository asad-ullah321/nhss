import React from "react";
import { useState } from "react";

import {
  Nav,
  Row,
  Col,
  FloatingLabel,
  Container,
  Table,
  Modal,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../states";
import { useSelector } from "react-redux";

const InputBlock = () => {
  const dispatch = useDispatch();
  const [resStatus, setresStatus] = useState();
  const { addStock } = bindActionCreators(actionCreators, dispatch);
  const [stockInput, setStocksinput] = useState({
    date: "",
    stock: "",
    location: "",
    comment: "",
    username: "",
    quantity: "",
  });

  /* For new Stock input */
  const handlesubmit = (e) => {
    e.preventDefault();
    const data = JSON.stringify(stockInput);
    console.log(data);

    fetch("http://localhost:5000/nhss/stock", {
      method: "post",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // "auth-token": token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data,
    })
      .then((res) => {
        setresStatus(res.status);
        if (res.status === 200) return res.json();
        else throw new Error(res.status);
      })
      .then((resBody) => {
        console.log(resBody);
      
          const date = resBody.stock.date.slice(0, 10);
          console.log(date);
          addStock({
            date: date,
            stock: resBody.stock.stock,
            location: resBody.stock.location,
            comment: resBody.stock.description,
            username: resBody.stock.addedBy,
            quantity: resBody.stock.quantity,
            _id:resBody.stock._id,
          });
          handleClose();
          
        
      })
      .catch((err) => {});

    
    setStocksinput({
      date: "",
      stock: "",
      location: "",
      comment: "",
      username: "",
      quantity: "",
    });
  };

  /*handle form input of main adding new stock form */
  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setStocksinput((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button
        variant="dark"
        size=""
        style={{ whiteSpace: "nowrap" }}
        className="mt-1  py-2"
        onClick={() => handleShow()}
      >
        Add New Stock
      </Button>

      {/*Modal to update stock info*/}
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Input Block */}
          <Container className="pt-2">
            <Form onSubmit={handlesubmit}>
              <Row className="g-2">
                <Col md={4}>
                  <FloatingLabel
                    controlId="floatingInputGrid"
                    label="Stock Name"
                  >
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={stockInput.stock}
                      required
                      onChange={handlechange}
                      name="stock"
                    />
                  </FloatingLabel>
                </Col>
                <Col md={4}>
                  <FloatingLabel controlId="floatingInputGrid" label="Date">
                    <Form.Control
                      type="date"
                      placeholder=""
                      value={stockInput.date}
                      required
                      onChange={handlechange}
                      name="date"
                    />
                  </FloatingLabel>
                </Col>
                <Col md={4}>
                  <FloatingLabel controlId="floatingInputGrid" label="Location">
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={stockInput.location}
                      required
                      onChange={handlechange}
                      name="location"
                    />
                  </FloatingLabel>
                </Col>
                <Col md={2}>
                  <FloatingLabel controlId="floatingInputGrid" label="Quantity">
                    <Form.Control
                      type="number"
                      placeholder=""
                      value={stockInput.quantity}
                      required
                      onChange={handlechange}
                      name="quantity"
                    />
                  </FloatingLabel>
                </Col>
                <Col md={4}>
                  <FloatingLabel controlId="floatingInputGrid" label="Comment">
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={stockInput.comment}
                      onChange={handlechange}
                      required
                      name="comment"
                    />
                  </FloatingLabel>
                </Col>
                <Col md={4}>
                  <FloatingLabel controlId="floatingInputGrid" label="Added By">
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={stockInput.username}
                      required
                      onChange={handlechange}
                      name="username"
                    />
                  </FloatingLabel>
                </Col>
                <Col md={2} className="text-center">
                  <Button variant="dark" type="submit" className="py-3 px-5">
                    Add
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Input Block */}
      <Container className="pt-2"></Container>
    </div>
  );
};

export default InputBlock;
