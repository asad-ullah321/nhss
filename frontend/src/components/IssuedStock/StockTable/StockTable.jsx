import React from "react";
import "./stocktable.css";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../states";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Nav, Row, Col, FloatingLabel, Table, Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { deleteStock } from "../../../states/action-creators";

const StockTable = ({ filtereData2 }) => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const { updatestatus, updateissuedStock, deleteissuedStock, UpdateNotification } =
    bindActionCreators(actionCreators, dispatch);

  useEffect(
    () => console.log(filtereData2, "in table component"),
    [filtereData2]
  );
  const [ustockInput, usetStocksinput] = useState({
    _id: "",
    date: "",
    stock: "",
    To: "",  
    comment: "",
    issuedby: "",
    quantity: "",
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
    const data = JSON.stringify(ustockInput);
    console.log(data);

    fetch("http://localhost:5000/nhss/stock/issue", {
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
          updateissuedStock(ustockInput);
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
   // updatestatus({ value: e.target.value, _id: id });
   const temp = { value: e.target.value, _id: id };
    const data = JSON.stringify({ status: e.target.value, _id: id });

    fetch("http://localhost:5000/nhss/stock/issue", {
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
        updatestatus(temp);
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
   

    fetch("http://localhost:5000/nhss/stock/issue", {
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
          deleteissuedStock(id);
          UpdateNotification({message:resBody.message, status:1, show:true});

        
        }

      })
      .catch((err) => {
        UpdateNotification({message:"Internal server error occured", status:0, show:true});

      });

    
  }
  return (
    <div>
      {/* Stock Cards */}
      <Container className="table-container">
        <Table responsive="md" bordered hover variant="light">
          <thead>
            <tr>
              <th>Stock</th>
              <th>Quantity</th>
              <th>Issued to</th>
              <th>Date</th>
              <th>Description</th>
              <th>Issued By</th>
              <th>Status</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {filtereData2.length > 0 ? (
              filtereData2.map((s) => (
                <tr key={s._id}>
                  <td>{s.stock}</td>
                  <td>{s.quantity}</td>
                  <td>{s.To}</td>
                  <td>{s.date}</td>
                  <td>{s.comment}</td>
                  <td>{s.issuedby}</td>

                  <td>
                    <Form.Select
                      id="status"
                      onChange={(e) => {
                        console.log(e.target.value);
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
                        {s.status === "Issued" ? "Returned" : "Issued"}
                      </option>
                    </Form.Select>
                  </td>

                  <td className="text-center">
                    <Button
                      key={s._id}
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
                <Modal.Title>Update Stock Info</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* Input Block */}
                <Container className="pt-2">
                  <Form>
                    <Row className="g-2">
                      <Col md={4}>
                        <FloatingLabel
                          controlId="floatingInputGrid"
                          label="Stock Name"
                        >
                          <Form.Control
                            type="text"
                            placeholder=""
                            value={ustockInput.stock}
                            required
                            onChange={uhandlechange}
                            name="stock"
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
                          label="Location"
                        >
                          <Form.Control
                            type="text"
                            placeholder=""
                            value={ustockInput.To}
                            required
                            onChange={uhandlechange}
                            name="To"
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md={2}>
                        <FloatingLabel
                          controlId="floatingInputGrid"
                          label="Quantity"
                        >
                          <Form.Control
                            type="number"
                            placeholder=""
                            value={ustockInput.quantity}
                            required
                            onChange={uhandlechange}
                            name="quantity"
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md={6}>
                        <FloatingLabel
                          controlId="floatingInputGrid"
                          label="Comment"
                        >
                          <Form.Control
                            type="text"
                            placeholder=""
                            value={ustockInput.comment}
                            onChange={uhandlechange}
                            required
                            name="comment"
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md={4}>
                        <FloatingLabel
                          controlId="floatingInputGrid"
                          label="Added By"
                        >
                          <Form.Control
                            type="text"
                            placeholder=""
                            value={ustockInput.issuedby}
                            required
                            onChange={uhandlechange}
                            name="issuedby"
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
};

export default StockTable;
