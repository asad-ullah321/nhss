import React, { useEffect, useState } from "react";
import NavBar from "../Navbar/Navbar";
import InputBlock from "./LibInput/LibInput";
import LibTable from "./LibTable/LibTable";

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
import Footer from "../footer/Footer";

const Lib = () => {
  const books = useSelector((state) => state.books);
  const [resStatus, setresStatus] = useState();
  const [response, setResponse] = useState();
  const dispatch = useDispatch();
  const { issueBook } = bindActionCreators(actionCreators, dispatch);



  const [filtereData, setfiltereData] = useState(books);
  const [filtereData2, setfiltereData2] = useState(books);
  {
    /* set option for filters */
  }
  const [BookFilter, setBookFilter] = useState([null]);
  const [student_idfilter, setStudent_idFilter] = useState([]);
  {
    /* to select one from given options */
  }
  const [selectedBook, setSelectedBook] = useState("Book Name");
  const [selectedStudentID, setSelectedStudentID] = useState("Student ID");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDueDate, setSelectedDueDate] = useState("");
  const [selectedstatus, setSelectedStatus] = useState("Status");

  const [searchFlag, setFlagsearch] = useState(false);
  const [bookNameflag, setbookNameflag] = useState(false);
  const [StudentIDflag, setStudentIDflag] = useState(false);
  const [Dateflag, setDateflag] = useState(false);
  const [Statusflag, setStatusflag] = useState(false);
  const [DuedateFlag, setDueDateflag] = useState(false);
  const [filterdate, setFilterDate] = useState({
    date1: "",
    date2: "",
  });
/*<------------------------------------------------------------------fetech data------------------------------------------------------------------>*/

useEffect(() => {
  console.log("fecth fine requested");
  fetch("http://localhost:5000/nhss/lib", {
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
}, []);

useEffect(() => {
  if (resStatus === 200) {

    console.log(response.lib);
    response.lib.map((obj) => {
      const date = obj.date.slice(0, 10);
      const duedate = obj.dueDate.slice(0, 10);

      console.log(date);
      issueBook({
        _id: obj._id,
        student_id: obj.student_id,
        bookName: obj.bookName,
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
    const uniqueBookName = [...new Set(books.map((s) => s.bookName))];
    setBookFilter([...uniqueBookName]);
    const uniquestudent_id = [...new Set(books.map((s) => s.student_id))];
    setStudent_idFilter([...uniquestudent_id]);
    setfiltereData(books);
    console.log(books);
    setbookNameflag(true);
  }, [books]);

  /* These useEffect is used to apply in hirarchary */
  /*This will intialze filteredata with orginal stock and set stockflag true which will call filter for based on stock */
  useEffect(() => {
    setfiltereData(books);
    setbookNameflag(true);
  }, [
    selectedstatus,
    selectedBook,
    selectedStudentID,
    selectedDate,
    selectedDueDate,
  ]);

  /*this will apply filter based on STOCK NAME and then set locationFlag true */
  useEffect(() => {
    if (bookNameflag) {
      //console.log(selectedStock, selectedLocation, selectedAddedby);
      if (selectedBook !== "Book Name") {
        setfiltereData(
          filtereData.filter((f) => {
            //console.log(f.stock);
            return f.bookName.includes(selectedBook);
          })
        );
      }

      console.log(filtereData, "After bookName");
    }
    setbookNameflag(false);

    setStudentIDflag(true);
  }, [bookNameflag]);

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
      //console.log((filtereData[0].date).getDate())
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
    setFlagsearch(true);
  }, [Statusflag]);

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

      <Container>
        {/*<----------------------------Filter Bar---------------------------->*/}
        <Navbar
          className=" mx-3"
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
                  id="Book Name"
                  onChange={(e) => {
                    setSelectedBook(e.target.value);
                    console.log(e.target.value);
                  }}
                  aria-label="Default select example"
                  className="me-2 mt-3"
                  size="sm"
                  value={selectedBook}

                >
                  <option>Book Name</option>
                  {BookFilter.map((s) => (
                    <option value={s}>{s}</option>
                  ))}
                </Form.Select>

                {/* Filter selection for status */}
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
                  <option>Issued</option>
                  <option>Returned</option>
                </Form.Select>

                {/* Filter based on Date */}
                <div
                  className="text-center mt-1 px-2 py-1"
                  style={{ color: "white" }}
                >
                  Issued Date:
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
                  className="my-2 me-4 px-4 ms-1"
                  onClick={() => {
                    setSelectedBook("Book Name");
                    setSelectedStudentID("Student ID");
                    setSelectedDate("");
                    setSelectedDueDate("");
                    setSelectedStatus("Status");
                  }}
                >
                  Clear
                </Button>

                {/* Input component it will ad new stock via modal */}
                <InputBlock />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <LibTable filtereData2={filtereData2} />

      </Container>
      <Footer/>

    </div>
  );
};

export default Lib;
