import React from "react";
import { useState } from "react";
import Toaster from "../../Toaster/Toaster";

import { Row, Col, FloatingLabel, Container, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../states";

const InputBlock = () => {
  const dispatch = useDispatch();
  const { issueFine, UpdateNotification } = bindActionCreators(actionCreators, dispatch);
  const [fineInput, setFinesinput] = useState({
    student_id: "",
    amount: "",
    reason: "",
    date: "",
    duedate: "",
  });

  /* For new Stock input */
  const handlesubmit = (e) => {
    e.preventDefault();

    const temp = {
      student_id: fineInput.student_id,
      amount: fineInput.amount,
      reason: fineInput.reason,
      date: fineInput.date,
      duedate: fineInput.duedate,
      status: "Unpaid",
    };

    const data = JSON.stringify(temp);
    console.log(data);

    fetch("http://localhost:5000/nhss/fine", {
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

        const date = resBody.fine.date.slice(0, 10);
        const duedate = resBody.fine.dueDate.slice(0, 10);
        console.log(date);

        issueFine({
          _id: resBody.fine._id,
          student_id: resBody.fine.student_id,
          amount: resBody.fine.amount,
          reason: resBody.fine.reason,
          date: date,
          duedate: duedate,
          status: resBody.fine.status,
        });
        handleClose();
        UpdateNotification({message:resBody.message, status:1, show:true});

      })
      .catch((err) => {
        UpdateNotification({message:"Internal server error occured", status:0, show:true});

      });

    console.log(temp);
    setFinesinput({
      student_id: "",
      amount: "",
      reason: "",
      date: "",
      duedate: "",
    });
  };

  /*handle form input of main adding new stock form */
  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFinesinput((prev) => {
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
        className="mt-2  py-2 ms-2"
        onClick={() => handleShow()}
      >
        Add Fine
      </Button>

      {/*Modal to update stock info*/}
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Fine</Modal.Title>
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
                      value={fineInput.student_id}
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
                      value={fineInput.date}
                      required
                      onChange={handlechange}
                      name="date"
                    />
                  </FloatingLabel>
                </Col>
                <Col md={4}>
                  <FloatingLabel controlId="floatingInputGrid" label="Due Date">
                    <Form.Control
                      type="date"
                      placeholder=""
                      value={fineInput.duedate}
                      required
                      onChange={handlechange}
                      name="duedate"
                    />
                  </FloatingLabel>
                </Col>
                <Col md={3}>
                  <FloatingLabel controlId="floatingInputGrid" label="Amount">
                    <Form.Control
                      type="number"
                      placeholder=""
                      value={fineInput.amount}
                      required
                      onChange={handlechange}
                      name="amount"
                    />
                  </FloatingLabel>
                </Col>
                <Col md={5}>
                  <FloatingLabel controlId="floatingInputGrid" label="Reason">
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={fineInput.reason}
                      onChange={handlechange}
                      required
                      name="reason"
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
