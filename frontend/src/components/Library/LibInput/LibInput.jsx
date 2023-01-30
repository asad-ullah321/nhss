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
  const { issueBook,UpdateNotification } = bindActionCreators(actionCreators, dispatch);
  const [bookInput, setBookinput] = useState({
    student_id: "",
    bookName: "",
    date: "",
    duedate: "",
  });

  /* For new Stock input */
  const handlesubmit = (e) => {
    e.preventDefault();
    const temp = {
      student_id: bookInput.student_id,
      bookName: bookInput.bookName,
      date: bookInput.date,
      duedate: bookInput.duedate,
      status: "Issued",
    };



    const data = JSON.stringify(temp);
    console.log(data);

    fetch("http://localhost:5000/nhss/lib", {
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

        const date = resBody.lib.date.slice(0, 10);
        const duedate = resBody.lib.dueDate.slice(0, 10);
        console.log(date);
        issueBook({
          _id : resBody.lib._id,
          student_id: resBody.lib.student_id,
          bookName: resBody.lib.bookName,
          date: date,
          duedate: duedate,
          status: "Issued",
        });
        UpdateNotification({message:resBody.message, status:1, show:true});

        handleClose();
      })
      .catch((err) => {
        UpdateNotification({message:"Internal server error occured", status:0, show:true});


      });


  
    console.log(temp);
    setBookinput({
      student_id: "",
      bookName: "",
      date: "",
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
                      value={bookInput.date}
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
