import React, { useEffect } from "react";
import NavBar from "../Navbar/Navbar";
import Footer from "../footer/Footer";
import Toaster from "../Toaster/Toaster";
import { useState } from "react";
import "./attendance.css";

import Container from "react-bootstrap/Container";
import { Nav, Row, Col, FloatingLabel, Table, Modal } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import addpng from "../../assets/plus.png";
import savepng from "../../assets/save.png";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../states";
export const Attendance = () => {
  const students = useSelector((state) => state.students);
  const attendance = useSelector((state) => state.Attendance);
  const notification = useSelector((state) => state.notification);

  const dispatch = useDispatch();
  const { addAttendance, UpdateNotification } = bindActionCreators(actionCreators, dispatch);

  const [filteredStudents, setfilteredStudents] = useState([]);
  const [date, setDate] = useState("");
  const [_class, setclass] = useState("Class");
  const [showSave, setshowSave] = useState(false);


//  const [notification, setNotification]= useState({message:"", status:0});

  const addNewAttedance = () => {
    if (date != "" && _class != "Class") {
      setfilteredStudents([]);
      setshowSave(false);

      fetch(`http://localhost:5000/nhss/students?class=${_class}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",

          // "auth-token": token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((res) => {
          console.log(res);
          //   setresStatus(res.status);
          if (res.status === 200) return res.json();
          else throw new Error(res.status);
        })
        .then((resBody) => {
          console.log(resBody.students.length, "count");
          //setResponse(resBody);
          if (resBody.students.length > 0) {
            let temp = resBody.students.map((obj) => ({
              student_id: obj.student_id,
              sname: obj.sname,
              class: obj.class,
              attendance: "-",
              date: date,
            }));
            setfilteredStudents(temp);
            if (temp.length > 0){ 
              UpdateNotification({message:resBody.message, status:1, show:true});
            
              setshowSave(true)};
          }
        })
        .catch((err) => {
          UpdateNotification({message:"Internal server error occured", status:0, show:true});
          
          console.log(err);
        });
    }
  };



  const saveAttendance = () => {
    const data = JSON.stringify(filteredStudents);
    console.log("attendance", data);
    if (date != "" && _class != "Class" && filteredStudents.length > 0) {
      fetch(
        `http://localhost:5000/nhss/attendance?class=${_class}&date=${date}`,
        {
          method: "post",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            // "auth-token": token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: data,
        }
      )
        .then((res) => {
          if (res.status === 200) return res.json();
          else throw new Error(res.status);
        })
        .then((resBody) => {
          console.log(resBody);
          if (resBody.att === 1) {
            addAttendance(filteredStudents);
            setfilteredStudents([]);
            setclass("Class");
            setDate("");
            setshowSave(false);
            UpdateNotification({message:resBody.message, status:1, show:true});

            
          }
          else
          {
            UpdateNotification({message:resBody.message, status:0, show:true});
          }
        })
        .catch((err) => {
          UpdateNotification({message:"Internal server error occured", status:0, show:true});
    
        });
    }
  };



  const viewAttendance = () => {
    console.log(attendance);
    if (date != "" && _class != "Class") {
      fetch(
        `http://localhost:5000/nhss/attendance?class=${_class}&date=${date}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",

            // "auth-token": token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
        .then((res) => {
          //console.log(res);
          // setresStatus(res.status);
          if (res.status === 200) return res.json();
          else throw new Error(res.status);
        })
        .then((resBody) => {
          console.log(resBody.att.length, "count");

          if (resBody.att.length > 0) {
            //setResponse(resBody);
            console.log(resBody.att.length, "count");
            setfilteredStudents(resBody.att);
            UpdateNotification({message:resBody.message, status:1, show:true});

          }
        })
        .catch((err) => {
          UpdateNotification({message:"Internal server error occured", status:0, show:true});

          console.log(err);
        });
    }
  };


  const deleteAttendance = () => {
    console.log(attendance);
    if (date != "" && _class != "Class") {
      fetch(
        `http://localhost:5000/nhss/attendance?class=${_class}&date=${date}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",

            // "auth-token": token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
        .then((res) => {
          //console.log(res);
          // setresStatus(res.status);
          if (res.status === 200) return res.json();
          else throw new Error(res.status);
        })
        .then((resBody) => {
          console.log("delete", resBody);

          if (resBody.delete === 1) {
            //setResponse(resBody);
            UpdateNotification({message:resBody.message, status:1, show:true});

            setfilteredStudents([]);
            setshowSave(false);
          }
        })
        .catch((err) => {
          UpdateNotification({message:"Internal server error occured", status:0, show:true});

          console.log(err);
        });
    }
  };

  const updateAttendance = (e, id) => {
    const temp = { value: e.target.value, _id: id };
    const data = JSON.stringify({ attendance: e.target.value, _id: id });

    fetch("http://localhost:5000/nhss/attendance", {
      method: "PATCH",
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
          let index = filteredStudents.findIndex((s) => s._id === id);
          let temp = [...filteredStudents];
          temp[index].attendance = e.target.value;
          setfilteredStudents(temp);
          //  console.log(e.target.value, id);
          UpdateNotification({message:resBody.message, status:1, show:true});


        }
      })
      .catch((err) => {
        UpdateNotification({message:"Internal server error occured", status:0, show:true
      });


      });
  };

  const handleAttendanceChange = (e, id) => {
    console.log(e.target.value, id);
    let index = filteredStudents.findIndex((s) => s._id === id);
    let temp = [...filteredStudents];
    temp[index].attendance = e.target.value;
    setfilteredStudents(temp);
  };
  return (
    <div>
      <NavBar />
      <Container>
        {/*<----------------------------Filter Bar---------------------------->*/}
        <Navbar
          className="mx-3 px-3"
          expand="lg"
          variant="dark"
          style={{ backgroundColor: "#777777" }}
        >
          <Navbar.Brand className="fs-4">Attendance</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Form.Control
                type="date"
                placeholder=""
                required
                onChange={(e) => setDate(e.target.value)}
                name="date2"
                size="md"
                value={date}
                className="my-3 me-3 px-3"
              />

              {/* Filter selection for class */}
              <Form.Select
                id="Status"
                onChange={(e) => {
                  if (e.target.value !== "Class")
                    setclass(parseInt(e.target.value));
                  else setclass(e.target.value);
                }}
                value={_class}
                aria-label="Default select example"
                className="me-3  my-3"
                size="md"
              >
                <option>Class</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </Form.Select>

              <Button
                variant="dark"
                size="sm"
                style={{ whiteSpace: "nowrap" }}
                className="my-2 me-4 ms-1"
                onClick={addNewAttedance}
              >
                <img src={addpng} alt="" />
              </Button>
              <Button
                variant="dark"
                size="sm"
                style={{ whiteSpace: "nowrap" }}
                className="my-2 me-4 ms-1"
                onClick={deleteAttendance}
              >
                Delete Attandance
              </Button>
              <Button
                variant="dark"
                size="sm"
                style={{ whiteSpace: "nowrap" }}
                className="my-2 me-4 ms-1"
                onClick={() => viewAttendance()}
              >
                View Attendance
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="table-container mx-5">
          <Table responsive="md" bordered hover variant="light">
            <thead>
              <tr>
                <th>Addmission#</th>
                <th>Name</th>
                <th>Date</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((s) => (
                  <tr key={s._id}>
                    <td>{s.student_id}</td>
                    <td>{s.sname}</td>
                    <td>{date}</td>
                    {showSave ? (
                      <td>
                        <Form.Select
                          id="status"
                          onChange={(e) => {
                            handleAttendanceChange(e, s._id);
                          }}
                          aria-label="Default select example"
                          className="status"
                          size="sm"
                          name="status"
                        >
                          <option>-</option>
                          <option>A</option>
                          <option>L</option>
                        </Form.Select>
                      </td>
                    ) : (
                      <td>
                        <Form.Select
                          id="status"
                          onChange={(e) => {
                            updateAttendance(e, s._id);
                          }}
                          aria-label="Default select example"
                          className="status"
                          size="sm"
                          name="status"
                        >
                          <option>-</option>
                          <option>A</option>
                          <option>L</option>
                        </Form.Select>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <div>No Student</div>
              )}
            </tbody>
          </Table>
          {showSave ? (
            <Button
              variant="dark"
              size="sm"
              style={{ whiteSpace: "nowrap" }}
              className="my-2 me-4 ms-1"
              onClick={() => saveAttendance()}
            >
              <img src={savepng} alt="" />
            </Button>
          ) : (
            ""
          )}
        </div>
      </Container>

      <Footer />
      <Toaster/>

    </div>
  );
};
