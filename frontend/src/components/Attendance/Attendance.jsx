import React, { useEffect } from "react";
import NavBar from "../Navbar/Navbar";
import Footer from "../footer/Footer";
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
  const dispatch = useDispatch();
  const { addAttendance } = bindActionCreators(actionCreators, dispatch);

  const [filteredStudents, setfilteredStudents] = useState("");
  const [date, setDate] = useState("");
  const [_class, setclass] = useState("Class");
  const [showSave, setshowSave] = useState(false);

  const addNewAttedance = () => {
    if (date != "" && _class != "Class") {
      let temp = students.map((obj) => ({
        ...obj,
        attendance: "-",
        _date: date,
      }));
      temp = temp.filter((f) => {
        return f.class === _class;
      });
      setfilteredStudents(temp);
      if(temp.length > 0)
        setshowSave(true);
      // console.log(temp);
    }
  };

  const handleAttendanceChange = (e, id) => {
    console.log(e.target.value, id);
    let index = filteredStudents.findIndex((s) => s._id === id);
    let temp = [...filteredStudents];
    temp[index].attendance = e.target.value;
    setfilteredStudents(temp);
  };

  const saveAttendance = () => {
    addAttendance(filteredStudents);
    setfilteredStudents("");
    setclass("Class");
    setDate("");
    setshowSave(false);
  };

  const viewAttendance = () => {
    console.log(attendance);
    if (attendance.length > 0 && date!="" && _class!="Class") {
      let temp = attendance.filter((f) => {
        return new Date(f._date).getDate() === new Date(date).getDate();
      });
      temp = temp.filter((f) => {
        return (f.class === _class);
      });
      setfilteredStudents(temp);
    }
  };

  useEffect(() => {
    console.log(filteredStudents);
  }, [filteredStudents]);
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
                  if(e.target.value!=="Class")
                  setclass(parseInt(e.target.value));
                  else
                  setclass(e.target.value);

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
                onClick={() => addNewAttedance()}
              >
                <img src={addpng} alt="" />
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
                  <td>{s._date}</td>
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
                    <td>{s.attendance}</td>
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
    </div>
  );
};
