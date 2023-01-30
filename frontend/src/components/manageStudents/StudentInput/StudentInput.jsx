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
  const { addStudent } = bindActionCreators(actionCreators, dispatch);
  const [studentInput, setstudentsinput,UpdateNotification] = useState({
    student_id: "",
    sname: "",
    class: ""
  });

  /* For new Stock input */
  const handlesubmit = (e) => {
    e.preventDefault();


    const temp = {
      student_id: studentInput.student_id,
      sname: studentInput.sname,
      class: studentInput.class
      
    };

    const data = JSON.stringify(temp);
    console.log(data);

    fetch("http://localhost:5000/nhss/students", {
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
        addStudent({
          _id: resBody.students._id,
          student_id: resBody.students.student_id,
          sname:resBody.students.sname,
          class: resBody.students.class
     
        });
        handleClose();
        UpdateNotification({message:resBody.message, status:1, show:true});

      })
      .catch((err) => {
        UpdateNotification({message:"Internal server error occured", status:0, show:true});

      });

    console.log(temp);
    setstudentsinput({
      student_id: "",
      class:"",
      sname: "",
      
    });
  };

  /*handle form input of main adding new stock form */
  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setstudentsinput((prev) => {
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
        className="mt-3  py-2 ms-2"
        onClick={() => handleShow()}
      >
        Add student
      </Button>

      {/*Modal to update stock info*/}
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Input Block */}
          <Container className="pt-2">
            <Form onSubmit={handlesubmit}>
              <Row className="g-2">
                <Col md={3}>
                  <FloatingLabel
                    controlId="floatingInputGrid"
                    label="Addmission#"
                  >
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={studentInput.student_id}
                      required
                      onChange={handlechange}
                      name="student_id"
                    />
                  </FloatingLabel>
                </Col>
                <Col md={4}>
                  <FloatingLabel controlId="floatingInputGrid" label="Name">
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={studentInput.sname}
                      required
                      onChange={handlechange}
                      name="sname"
                    />
                  </FloatingLabel>
                </Col>
                <Col md={3}>
                  <FloatingLabel controlId="floatingInputGrid" label="Class">
                    <Form.Control
                      type="number"
                      placeholder=""
                      value={studentInput.class}
                      required
                      onChange={handlechange}
                      name="class"
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
