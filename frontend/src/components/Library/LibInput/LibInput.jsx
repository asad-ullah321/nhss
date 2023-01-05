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
  const { issueBook } = bindActionCreators(actionCreators, dispatch);
  const [bookInput, setBookinput] = useState({
    student_id: "",
    bookName: "",
    _date: "",
    duedate: "",
  });

  /* For new Stock input */
  const handlesubmit = (e) => {
    e.preventDefault();
    const temp = {
      _id: 7,
      student_id: bookInput.student_id,
    
      bookName: bookInput.bookName,
      _date: bookInput._date,
      duedate: bookInput.duedate,
      status: "Issued",
    };
    issueBook(temp);
    console.log(temp);
    setBookinput({
      student_id: "",
      
      bookName: "",
      _date: "",
      duedate: "",
    });
    handleClose();
  };

  /*handle form input of main adding new stock form */
  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBookinput((prev) => {
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
        className="mt-2  py-2"
        onClick={() => handleShow()}
      >
        Issue Book
      </Button>

      {/*Modal to update stock info*/}
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Issue Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Input Block */}
          <Container className="pt-2">
            <Form onSubmit={handlesubmit}>
              <Row className="g-2">
                <Col md={4}>
                  <FloatingLabel
                    controlId="floatingInputGrid"
                    label="Addmission#"
                  >
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={bookInput.student_id}
                      required
                      onChange={handlechange}
                      name="student_id"
                    />
                  </FloatingLabel>
                </Col>
                <Col md={4}>
                  <FloatingLabel controlId="floatingInputGrid" label="Date">
                    <Form.Control
                      type="date"
                      placeholder=""
                      value={bookInput._date}
                      required
                      onChange={handlechange}
                      name="_date"
                    />
                  </FloatingLabel>
                </Col>
                <Col md={4}>
                  <FloatingLabel controlId="floatingInputGrid" label="Due Date">
                    <Form.Control
                      type="date"
                      placeholder=""
                      value={bookInput.duedate}
                      required
                      onChange={handlechange}
                      name="duedate"
                    />
                  </FloatingLabel>
                </Col>
                <Col md={8}>
                  <FloatingLabel controlId="floatingInputGrid" label="Book">
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={bookInput.bookName}
                      onChange={handlechange}
                      required
                      name="bookName"
                    />
                  </FloatingLabel>
                </Col>
                
                <Col md={4} className="text-center">
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
