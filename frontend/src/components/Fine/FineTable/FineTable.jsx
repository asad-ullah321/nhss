import React from "react";
import "./finetable.css";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../states";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Toaster from "../../Toaster/Toaster";

import { Nav, Row, Col, FloatingLabel, Table, Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const FineTable = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { updateFinestatus, updateissuedFine, deleteissuedFine, UpdateNotification } =
    bindActionCreators(actionCreators, dispatch);

  useEffect(
    () => console.log(props.filtereData2, "in table component"),
    [props.filtereData2]
  );
  const [ustockInput, usetStocksinput] = useState({
    _id: "",
    student_id: "",
    amount: "",
    reason: "",
    date: "",
    duedate: "",
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

    const data = JSON.stringify(ustockInput);
    console.log(data);

    fetch("http://localhost:5000/nhss/fine", {
      method: "put",

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
        if (resBody.update === 1) {
          updateissuedFine(ustockInput);
          handleClose();
          UpdateNotification({message:resBody.message, status:1, show:true});

        }
      })
      .catch((err) => {
        UpdateNotification({message:"Internal server error occured", status:0, show:true});

      });
  };



  const handleStatusChange = (e, id) => {
    console.log(e.target.value, id);
    //updateFinestatus({ value: e.target.value, id: _id });

    const temp = { value: e.target.value, _id: id };
    const data = JSON.stringify({ status: e.target.value, _id: id });
 
     fetch("http://localhost:5000/nhss/fine", {
       method: "PATCH",
       headers: {
         "Content-Type": "application/json",
         Accept: "application/json",
         // "auth-token": token,
         // 'Content-Type': 'application/x-www-form-urlencoded',
       },
       body: data,
     }).then((res) => {
       if (res.status === 200) return res.json();
       else throw new Error(res.status);
     })
     .then((resBody) => {
       console.log(resBody);
       if (resBody.update === 1) {
        updateFinestatus(temp);
       //  console.log(e.target.value, id);
       UpdateNotification({message:resBody.message, status:1, show:true});

       }
     })
     .catch((err) => {
      UpdateNotification({message:"Internal server error occured", status:0, show:true});

     });
  };


  const handledelete = (id)=>{
    const data = JSON.stringify({_id:id});
   

    fetch("http://localhost:5000/nhss/fine", {
      method: "delete",

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
        if (resBody.delete === 1) 
        {
          deleteissuedFine(id);
          UpdateNotification({message:resBody.message, status:1, show:true});

        }

      })
      .catch((err) => {
        UpdateNotification({message:"Internal server error occured", status:0, show:true});

      });

    
  }

  return (
    <div ref={ref}>
      {/* Stock Cards */}
      <div className="table-container mx-5">
        <Table responsive="md" bordered hover variant="light">
          <thead>
            {props.datatype ? (
              <tr>
                <th>Addmission#</th>
                <th>Reason</th>
                <th>count</th>
              </tr>
            ) : (
              <tr>
                <th>Addmission#</th>
                <th>Amount</th>
                <th>Reason</th>
                <th>Date</th>
                <th>DueDate</th>
                <th>Status</th>
                <th>Options</th>
              </tr>
            )}
          </thead>
          <tbody>
            {props.filtereData2.length > 0 && props.datatype ? (
              props.filtereData2.map((s) => (
                <tr key={s._id}>
                  <td>{s.student_id}</td>
                  <td>{s.reason}</td>
                  <td>{s.count}</td>
                </tr>
              ))
            ) : props.filtereData2.length > 0 ? (
              props.filtereData2.map((s) => (
                <tr key={s._id}>
                  <td>{s.student_id}</td>
                  <td>{s.amount}</td>
                  <td>{s.reason}</td>
                  <td>{s.date}</td>
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
                          s.status === "Unpaid" ? "#B8293D" : "#019875",
                        color: "white",
                      }}
                    >
                      <option>{s.status}</option>
                      <option>{s.status === "Paid" ? "Unpaid" : "Paid"}</option>
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
                        handledelete(s._id);
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
              <div>No Stock</div>
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
                            value={ustockInput.date}
                            required
                            onChange={uhandlechange}
                            name="date"
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
                      <Col md={2}>
                        <FloatingLabel
                          controlId="floatingInputGrid"
                          label="Amount"
                        >
                          <Form.Control
                            type="number"
                            placeholder=""
                            value={ustockInput.amount}
                            required
                            onChange={uhandlechange}
                            name="amount"
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md={6}>
                        <FloatingLabel
                          controlId="floatingInputGrid"
                          label="Reason"
                        >
                          <Form.Control
                            type="text"
                            placeholder=""
                            value={ustockInput.reason}
                            onChange={uhandlechange}
                            required
                            name="reason"
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
      </div>
    </div>
  );
});

export default FineTable;
