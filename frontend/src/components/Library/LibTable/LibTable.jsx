import React from "react";
import "./libtable.css";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../states";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Nav, Row, Col, FloatingLabel, Table, Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


const LibTable =React.forwardRef( (props, ref) => {

  const dispatch = useDispatch();
  const { updateBookstatus, updateissuedBook, deleteissuedBook } =
    bindActionCreators(actionCreators, dispatch);

  useEffect(
    () => console.log(props.filtereData2, "in table component"),
    [props.filtereData2]
  );
  const [ustockInput, usetStocksinput] = useState({
    _id: "",
    student_id:"",
    bookName:"",
    _date: "",
    duedate:"",
    status: "",
  });
  /*states for Update Modal input ehich will be use for updation of stock */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (obj) => {
    usetStocksinput(obj);
    console.log(obj);
    setShow(true);
  };

  /* hanle form inputs of update modal  "u" indicates updated*/
  const uhandlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    usetStocksinput((prev) => {
      return { ...prev, [name]: value };
    });
  };
  /*hanlde update */
  const handleupdate = () => {
    console.log(ustockInput);
    updateissuedBook(ustockInput);

    handleClose();
  };
  const handleStatusChange = (e, _id) => {
    console.log(e.target.value, _id);
    updateBookstatus({ value: e.target.value, id: _id });
  };

  return (
    <div ref={ref}>
      {/* lib record table */}
      <Container className="table-container">
        <Table responsive="md" bordered hover variant="light">
          <thead>
            <tr>
              <th>Addmission#</th>
              <th>Book Name</th>
              <th>Date</th>
              <th>DueDate</th>
              <th>Status</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {props.filtereData2.length > 0 ? (
              props.filtereData2.map((s) => (
                <tr key={s._id}>
                  <td>{s.student_id}</td>

                  <td>{s.bookName}</td>
                  <td>{s._date}</td>
                  <td>{s.duedate}</td>

                  <td>
                    <Form.Select
                      id="status"
                      onChange={(e) => {
                        //console.log(e.target.value);
                       handleStatusChange(e, s._id);
                      }}
                      aria-label="Default select example"
                      className="status"
                      size="sm"
                      name="status"
                      value=""
                      style={{
                        backgroundColor:
                          s.status === "Issued" ? "#B8293D" : "#019875",
                        color: "white",
                      }}
                    >
                      <option>{s.status}</option>
                      <option>
                        {s.status === "Returned" ? "Issued" : "Returned"}
                      </option>
                    </Form.Select>
                  </td>

                  <td className="text-center">
                    <Button
                      
                      variant="primary"
                      size="sm"
                      onClick={() => handleShow(s)}
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => {
                        deleteissuedBook(s._id);
                        //console.log(stocks);
                        //console.log(filtereData);
                      }}
                      variant="danger"
                      size="sm"
                      className="mx-2 mb-1"
                      

                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <div>No Books issued</div>
            )}




            {/*Modal to update stock info*/}
            <Modal size="lg" show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Update Fine Info</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* Input Block */}
                <Container className="pt-2">
                  <Form>
                    <Row className="g-2">
                      <Col md={4}>
                        <FloatingLabel
                          controlId="floatingInputGrid"
                          label="Addmission#"
                        >
                          <Form.Control
                            type="text"
                            placeholder=""
                            value={ustockInput.student_id}
                            required
                            onChange={uhandlechange}
                            name="student_id"
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md={4}>
                        <FloatingLabel
                          controlId="floatingInputGrid"
                          label="Date"
                        >
                          <Form.Control
                            type="date"
                            placeholder=""
                            value={ustockInput._date}
                            required
                            onChange={uhandlechange}
                            name="_date"
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md={4}>
                        <FloatingLabel
                          controlId="floatingInputGrid"
                          label="Due Date"
                        >
                          <Form.Control
                            type="date"
                            placeholder=""
                            value={ustockInput.duedate}
                            required
                            onChange={uhandlechange}
                            name="duedate"
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md={6}>
                        <FloatingLabel
                          controlId="floatingInputGrid"
                          label="bookName"
                        >
                          <Form.Control
                            type="text"
                            placeholder=""
                            value={ustockInput.bookName}
                            onChange={uhandlechange}
                            required
                            name="bookName"
                          />
                        </FloatingLabel>
                      </Col>
                    </Row>
                  </Form>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleupdate}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </tbody>
        </Table>
      </Container>
    </div>
  );
});

export default LibTable;
