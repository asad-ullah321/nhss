import React, { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import NavBar from "../Navbar/Navbar";
import InputBlock from "./StudentInput/StudentInput";
import StudentTable from "./StudentTable/StudentTable";

import Footer from "../footer/Footer";
import "./student.css";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../states";
import { useSelector } from "react-redux";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Nav, Row, Col, FloatingLabel, Table, Modal } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Toaster from "../Toaster/Toaster";

const Student = () => {
  const students = useSelector((state) => state.students);
  const [resStatus, setresStatus] = useState();
  const [response, setResponse] = useState();
  const dispatch = useDispatch();
  const { addStudent, updateStudent, UpdateNotification } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const printref = useRef();

  const [filteredStudents, setfilteredStudents] = useState("");
  const [tempfilteredStudents, setTempfilteredStudents] = useState("");

  const [datatype, setdatatype] = useState(false);
  {
    /* set option for filters */
  }
  const [_class, setclass] = useState("Class");

  useEffect(() => {
    if (_class != "Class" && resStatus != 200) {
      console.log("filtering students");
      setfilteredStudents("");
      let temp = students;
      console.log(students);
      temp = temp.filter((f) => {
        return f.class === _class;
      });
      if (temp.length > 0) {
        console.log("cahed hit");
        setfilteredStudents(temp);
      } else {
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
            setresStatus(res.status);
            if (res.status === 200) return res.json();
            else throw new Error(res.status);
          })
          .then((resBody) => {
            console.log(resBody.students.length, "count");

            if (resBody.students.length > 0) {
              setResponse(resBody);
              console.log(resBody.students.length, "count");
              setfilteredStudents(resBody.students);
            } else {
              setresStatus("");
            }
            UpdateNotification({message:resBody.message, status:1, show:true});

            console.log(resBody);
          })
          .catch((err) => {
            UpdateNotification({message:"Internal server error occured", status:0, show:true});

            console.log(err);
          });
      }
    }
  }, [_class, students]);
  useEffect(() => console.log(filteredStudents), [filteredStudents]);
  /*<------------------------------------------------------------------fetech data------------------------------------------------------------------>*/

  useEffect(() => {
    console.log(resStatus, response);
    if (resStatus === 200) {
      console.log(response.students);
      response.students.map((obj) => {
        addStudent({
          _id: obj._id,
          student_id: obj.student_id,
          sname: obj.sname,
          class: obj.class,
        });
      });
      setresStatus("");
      setResponse("");
    }
  }, [response && resStatus]);

  let resCode;
  const promoteBatch = () => {
    fetch("http://localhost:5000/nhss/students", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",

        // "auth-token": token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((res) => {
        console.log(res);
        resCode = res.status;
       // setresStatus(res.status);
        if (res.status === 200) return res.json();
        else throw new Error(res.status);
      })
      .then((resBody) => {
        console.log(typeof(students), students,"type");
        UpdateNotification({message:resBody.message, status:1, show:true});

        if (resCode === 200 && students.length > 0) 
        {

        console.log(typeof(students), "type");
        setclass(_class+1);
          students.map((obj) => {
            updateStudent({
              _id: obj._id,
              student_id: obj.student_id,
              sname: obj.sname,
              class: (obj.class + 1)
            });
          });
        }


      })
      .catch((err) => {
        UpdateNotification({message:"Internal server error occured", status:0, show:true});

        console.log(err);
      });
  };
  /*useEffect(() => {
  console.log("fecth fine requested");
  fetch("http://localhost:5000/nhss/fine", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // "auth-token": token,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((res) => {
      setresStatus(res.status);
      if (res.status === 200) return res.json();
      else throw new Error(res.status);
    })
    .then((resBody) => {
      setResponse(resBody);
    })
    .catch((err) => {});

    return () => {
      console.log('The component has mounted!');
    };
}, []);*/

  return (
    <div>
      <NavBar />
      {/*stock mangment main block*/}

      {/*<----------------------------Filter Bar---------------------------->*/}
      <Navbar
        className="mx-5"
        expand="lg"
        variant="dark"
        style={{ backgroundColor: "#777777" }}
      >
        <Container>
          <Navbar.Brand className="fs-4">Filters</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* Filter selection for class */}
              <Form.Select
                id="Status"
                onChange={(e) => {
                  if (e.target.value !== "Class")
                    setclass(parseInt(e.target.value));
                  else setclass(e.target.value);

                  console.log(e.target.value);
                }}
                value={_class}
                aria-label="Default select example"
                className="me-3 mb-2 mt-3 px-5"
                size="md"
              >
                <option>Class</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </Form.Select>

              {/*<Button
                variant="dark"
                size="sm"
                style={{ whiteSpace: "nowrap" }}
                className="my-2 me-3 px-4 ms-1"
                onClick={() => {
                  setSelectedReason("Reasons");
                  setSelectedStudentID("Student ID");
                  setSelectedDate("");
                  setSelectedDueDate("");
                  setSelectedStatus("Status");
                  setSelectedCount(0);
                  setdatatype(false);
                }}
              >
                Clear
              </Button>*/}

              <Button
                variant="dark"
                size=""
                style={{ whiteSpace: "nowrap", height: "2%" }}
                className="mt-3  py-2 ms-2"
                onClick={promoteBatch}
              >
                Promote Batch
              </Button>

              {/* Input component it will ad new stock via modal */}
              <InputBlock />

              <ReactToPrint
                trigger={() => (
                  <Button
                    variant="dark"
                    size=""
                    style={{ whiteSpace: "nowrap", height: "2%" }}
                    className="mt-3  py-2 ms-2"
                  >
                    Print
                  </Button>
                )}
                content={() => printref.current}
              />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <StudentTable
        ref={printref}
        filtereData2={filteredStudents}
        datatype={datatype}
      />

      <Footer />
      <Toaster/>
    </div>
  );
};

export default Student;
