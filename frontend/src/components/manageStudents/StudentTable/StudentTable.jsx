import React from "react";
import "./studenttable.css";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../states";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Nav, Row, Col, FloatingLabel, Table, Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const StudentTable = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const { updateStudent, deleteStudent } =
    bindActionCreators(actionCreators, dispatch);

  useEffect(
    () => console.log(props.filtereData2, "in table component"),
    [props.filtereData2]
  );
  const [ustockInput, usetStocksinput] = useState({
    _id: "",
    student_id: "",
    sname: "",
   class: "",
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

    fetch("http://localhost:5000/nhss/students", {
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
          updateStudent(ustockInput);
          handleClose();
        }
      })
      .catch((err) => {});
  };



  /*const handleStatusChange = (e, id) => {
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
         
       }
     })
     .catch((err) => {});
  };*/


  const handledelete = (id)=>{
    const data = JSON.stringify({_id:id});
   

    fetch("http://localhost:5000/nhss/students", {
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
          deleteStudent(id);
        
        }

      })
      .catch((err) => {});

    
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
                <th>Student Name</th>
                <th>Class</th>
              </tr>
            ) : (
              <tr>
                <th>Addmission#</th>
                <th>Student Name</th>
                <th>Class</th>
                <th>Options</th>
              </tr>
            )}
          </thead>
          <tbody>
            {props.filtereData2.length > 0 && props.datatype ? (
              props.filtereData2.map((s) => (
                <tr key={s._id}>
                  <td>{s.student_id}</td>
                  <td>{s.sname}</td>
                  <td>{s.class}</td>
                </tr>
              ))
            ) : props.filtereData2.length > 0 ? (
              props.filtereData2.map((s) => (
                <tr key={s._id}>
                  <td>{s.student_id}</td>
                  <td>{s.sname}</td>
                  <td>{s.class}</td>

                  
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
              <div>No Student registered</div>
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
                          label="Student Name"
                        >
                          <Form.Control
                            type="text"
                            placeholder=""
                            value={ustockInput.sname}
                            required
                            onChange={uhandlechange}
                            name="sname"
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md={4}>
                        <FloatingLabel
                          controlId="floatingInputGrid"
                          label="Class"
                        >
                          <Form.Control
                            type="number"
                            placeholder=""
                            value={ustockInput.class}
                            required
                            onChange={uhandlechange}
                            name="class"
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

export default StudentTable;
