import React from "react";
import { useState } from "react";

import { Row, Col, FloatingLabel, Container, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../states";


const InputBlock = () => {
  const dispatch = useDispatch();
  const { issueStock } = bindActionCreators(actionCreators, dispatch);
  const [stockInput, setStocksinput] = useState({
    date: "",
    stock: "",
    To: "",
    comment: "",
    issuedby: "",
    quantity: "",
    
  });

  /* For new Stock input */
  const handlesubmit = (e) => {
    e.preventDefault();
    const temp = {
      stock: stockInput.stock,
      To: stockInput.To,
      comment: stockInput.comment,
      issuedby: stockInput.issuedby,
      date: stockInput.date,
      quantity: stockInput.quantity,
      status: "Issued",
    };
   /* issueStock(temp);
    console.log(temp);
    setStocksinput({
      date: "",
      stock: "",
      To: "",
      comment: "",
      issuedby: "",
      quantity: "",
      
    });
    handleClose();*/



    const data = JSON.stringify(temp);
    console.log(data);

    fetch("http://localhost:5000/nhss/stock/issue", {
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
       
        if (res.status === 200) return res.json();
        else throw new Error(res.status);
      })
      .then((resBody) => {
        console.log(resBody);
      
          const date = resBody.stock.date.slice(0, 10);
          console.log(date);
          issueStock({
            date: date,
            stock: resBody.stock.stock,
            To: resBody.stock.To,
            comment: resBody.stock.description,
            issuedby: resBody.stock.issuedby,
            quantity: resBody.stock.quantity,
            _id:resBody.stock._id,
            status: resBody.stock.status
          });
          setStocksinput({
            date: "",
            stock: "",
            To: "",
            comment: "",
            issuedby: "",
            quantity: "",
            
          })
          handleClose();
          
        
      })
      .catch((err) => {});





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
        Issue Stock
      </Button>

      {/*Modal to update stock info*/}
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Issue Stock</Modal.Title>
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
                  <FloatingLabel controlId="floatingInputGrid" label="To">
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={stockInput.To}
                      required
                      onChange={handlechange}
                      name="To"
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
                  <FloatingLabel controlId="floatingInputGrid" label="Issued By">
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={stockInput.issuedby}
                      required
                      onChange={handlechange}
                      name="issuedby"
                    />
                  </FloatingLabel>
                </Col>
                <Col md={2} className="text-center">
                  <Button variant="dark" type="submit" className="py-3 px-5">
                    Issue
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
