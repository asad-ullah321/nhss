import React, { useEffect, useState, useRef } from "react";
import ReactToPrint from "react-to-print";
import NavBar from "../Navbar/Navbar";
import InputBlock from "./FineInput/FineInput";
import FineTable from "./FineTable/FineTable";
import Toaster from "../Toaster/Toaster";

import Footer from "../footer/Footer";
import "./fine.css";

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

const Fine = () => {
 // const [notification, setNotification]= useState({message:"", status:0});


  const fines = useSelector((state) => state.fines);
  const notification = useSelector((state) => state.notification);

  const [resStatus, setresStatus] = useState();
  const [response, setResponse] = useState();
  const dispatch = useDispatch();
  const { issueFine, UpdateNotification } = bindActionCreators(actionCreators, dispatch);
  const printref = useRef();

  const [filtereData, setfiltereData] = useState(fines);
  const [filtereData2, setfiltereData2] = useState(fines);
  const [datatype, setdatatype] = useState(false);
  {
    /* set option for filters */
  }
  const [ReasonFilter, setReasonFilter] = useState([null]);
  const [student_idfilter, setStudent_idFilter] = useState([]);
  {
    /* to select one from given options */
  }
  const [selectedReason, setSelectedReason] = useState("Reasons");
  const [selectedStudentID, setSelectedStudentID] = useState("Student ID");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDueDate, setSelectedDueDate] = useState("");
  const [selectedstatus, setSelectedStatus] = useState("Status");
  const [selecteCount, setSelectedCount] = useState(0);

  const [searchFlag, setFlagsearch] = useState(false);
  const [Reasonflag, setReasonflag] = useState(false);
  const [StudentIDflag, setStudentIDflag] = useState(false);
  const [Dateflag, setDateflag] = useState(false);
  const [Statusflag, setStatusflag] = useState(false);
  const [DuedateFlag, setDueDateflag] = useState(false);
  const [CountFilterFlag, setCountFilterFlag] = useState(false);
  const [filterdate, setFilterDate] = useState({
    date1: "",
    date2: "",
  });

/*<------------------------------------------------------------------fetech data------------------------------------------------------------------>*/

useEffect(() => {
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
      UpdateNotification({message:resBody.message, status:1, show:true});

    })
    .catch((err) => {
      UpdateNotification({message:"Internal server error occured", status:0, show:true});

    });

    return () => {
      console.log('The component has mounted!');
    };
}, []);

useEffect(() => {
  if (resStatus === 200) {

    console.log(response.fine);
    response.fine.map((obj) => {
      const date = obj.date.slice(0, 10);
      const duedate = obj.dueDate.slice(0, 10);

      console.log(date);
      issueFine({
        _id: obj._id,
        student_id: obj.student_id,
        amount: obj.amount,
        reason: obj.reason,
        date: date,
        duedate: duedate,
        status: obj.status,
      });
    });

  }


}, [response && resStatus]);



  /*<------------------------------------------------------------------Use Effects for filters Start here------------------------------------------------------------------>*/

  /*to intilaize filter drop when first render occurs */
  useEffect(() => {
    const uniquereasons = [...new Set(fines.map((s) => s.reason))];
    setReasonFilter([...uniquereasons]);
    const uniquestudent_id = [...new Set(fines.map((s) => s.student_id))];
    setStudent_idFilter([...uniquestudent_id]);
    setfiltereData(fines);
    console.log(fines);
    setReasonflag(true);

    let temp = student_idfilter.filter((id) =>
      filtereData.filter((f) => f._id === id).lenght > 2 ? id : 0
    );
    console.log("nothing", temp);
  }, [fines]);

  /* These useEffect is used to apply in hirarchary */
  /*This will intialze filteredata with orginal stock and set stockflag true which will call filter for based on stock */
  useEffect(() => {
    setfiltereData(fines);
    setReasonflag(true);
  }, [
    selectedstatus,
    selectedReason,
    selectedStudentID,
    selectedDate,
    selectedDueDate,
    selecteCount,
  ]);

  /*this will apply filter based on STOCK NAME and then set locationFlag true */
  useEffect(() => {
    if (Reasonflag) {
      //console.log(selectedStock, selectedLocation, selectedAddedby);
      if (selectedReason !== "Reasons") {
        setfiltereData(
          filtereData.filter((f) => {
            //console.log(f.stock);
            return f.reason.includes(selectedReason);
          })
        );
      }

      console.log(filtereData, "After Reason");
    }
    setReasonflag(false);

    setStudentIDflag(true);
  }, [Reasonflag]);

  /*this will apply filter based on LOCATION and then set addedbyFlag true */
  useEffect(() => {
    if (StudentIDflag) {
      if (selectedStudentID !== "Student ID") {
        setfiltereData(
          filtereData.filter((f) => {
            //  console.log(f.stock);
            return f.student_id.includes(selectedStudentID);
          })
        );
      }

      console.log(filtereData, "After studentID");
    }
    setStudentIDflag(false);

    setDateflag(true);
  }, [StudentIDflag]);

  /*this will apply filter based on ADDED BY and end the call  */
  useEffect(() => {
    if (Dateflag) {
      //console.log((filtereData[0]._date).getDate())
      if (selectedDate !== "") {
        //console.log(selectedDate);
        setfiltereData(
          filtereData.filter((f) => {
            //  console.log(f.stock);
            return new Date(f.date).getDate() === selectedDate.getDate();
          })
        );
      }
      console.log(filtereData, "After date");
    }

    setDateflag(false);

    setDueDateflag(true);
  }, [Dateflag]);

  useEffect(() => {
    if (DuedateFlag) {
      if (selectedDueDate !== "") {
        setfiltereData(
          filtereData.filter((f) => {
            return new Date(f.duedate).getDate() === selectedDueDate.getDate();
          })
        );
        //console.log(filterdate.date1);
        //console.log(filterdate.date2);
      }
    }
    console.log(filtereData, "After duedate");

    setDueDateflag(false);

    setStatusflag(true);
  }, [DuedateFlag]);

  useEffect(() => {
    if (Statusflag) {
      if (selectedstatus !== "Status") {
        console.log(selectedstatus);
        setfiltereData(
          filtereData.filter((f) => {
            //  console.log(f.stock);
            return f.status.includes(selectedstatus);
          })
        );
      }
      console.log(filtereData, "After IssuedBy");
    }

    setStatusflag(false);
    setCountFilterFlag(true);
  }, [Statusflag]);

  // filter to filter cnout on the basis of records
  useEffect(() => {
    if (CountFilterFlag) {
      if (selecteCount > 0 && selectedReason !== "Reasons") {
        console.log(selecteCount);
        setdatatype(true);

        let tempstudents = [];
        let id = 11;
        for (let i = 0; i < student_idfilter.length; i++) {
          const count = filtereData.reduce(
            (acc, cur) =>
              cur.student_id === student_idfilter[i] ? ++acc : acc,
            0
          );

          if (count >= selecteCount) {
            tempstudents.push({
              id,
              student_id: student_idfilter[i],
              reason: selectedReason,
              count,
            });
            id++;
          }

          //console.log("somthinng", count, student_idfilter[i]);
        }
        console.log(datatype);

        console.log(tempstudents, "count temp stduents");
        setfiltereData(tempstudents);
      } else {
        console.log(datatype);
        setdatatype(false);
      }
    }

    let temp = [];

    setCountFilterFlag(false);
    setFlagsearch(true);
  }, [CountFilterFlag]);

  useEffect(() => {
    if (searchFlag) {
      setfiltereData2(filtereData);
      setFlagsearch(false);
      console.log(filtereData, "end filter");
    }
  }, [searchFlag]);

  /*<------------------------------------------------------------------Use Effects for filters end here------------------------------------------------------------------>*/

  const datesearch = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name);
    setFilterDate((prev) => {
      return { ...prev, [name]: new Date(value) };
    });
  };

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
              {/* Filter selection for stock name */}
              <Form.Select
                id="StudentID"
                onChange={(e) => {
                  setSelectedStudentID(e.target.value);
                  console.log(e.target.value);
                }}
                aria-label="Default select example"
                className="me-2 mt-3"
                size="sm"
                value={selectedStudentID}
              >
                <option>Student ID</option>
                {student_idfilter.map((s) => (
                  <option value={s}>{s}</option>
                ))}
              </Form.Select>

              <Form.Select
                id="Reasons"
                onChange={(e) => {
                  setSelectedReason(e.target.value);
                  console.log(e.target.value);
                }}
                aria-label="Default select example"
                className="me-2 mt-3"
                size="sm"
                value={selectedReason}
              >
                <option>Reasons</option>
                {ReasonFilter.map((s) => (
                  <option value={s}>{s}</option>
                ))}
              </Form.Select>

              {/* Filter selection for Location */}
              <Form.Select
                id="Status"
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  console.log(e.target.value);
                }}
                value={selectedstatus}
                aria-label="Default select example"
                className="me-3  mt-3"
                size="sm"
              >
                <option>Status</option>
                <option>Paid</option>
                <option>Unpaid</option>
              </Form.Select>

              {/* Filter selection based on count */}
              <div
                className="text-center ms-2 mt-3 px-2 py-1"
                style={{ color: "white" }}
              >
                Count:
              </div>
              <Form.Control
                type="number"
                placeholder=""
                className="me-3  mt-3"
                name="count"
                size="sm"
                value={selecteCount}
                onChange={(e) => {
                  if (e.target.value >= 0) setSelectedCount(e.target.value);
                }}
              />

              {/* Filter based on Date */}
              <div
                className="text-center mt-1 px-2 py-1"
                style={{ color: "white" }}
              >
                Fine Date:
              </div>
              <Form.Control
                type="date"
                placeholder=""
                required
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                name="date1"
                size="sm"
                value={selectedDate}
                className="mt-3 me-3"
              />

              <div
                className="text-center mt-1 px-2 py-1"
                style={{ color: "white" }}
              >
                Due Date:
              </div>
              <Form.Control
                type="date"
                placeholder=""
                required
                onChange={(e) => setSelectedDueDate(new Date(e.target.value))}
                name="date2"
                size="sm"
                value={selectedDueDate}
                className="mt-3 me-3"
              />

              <Button
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
              </Button>
              <ReactToPrint
                trigger={() => (
                  <Button
                    variant="dark"
                    size="sm"
                    style={{ whiteSpace: "nowrap" }}
                    className="my-2 me-4 px-4"
                  >
                    Print
                  </Button>
                )}
                content={() => printref.current}/>

              {/* Input component it will ad new stock via modal */}
              <InputBlock />

              
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <FineTable
        ref={printref}
        filtereData2={filtereData2}
        datatype={datatype}
      />

      <Footer />

      <Toaster />

    </div>
  );
};

export default Fine;
