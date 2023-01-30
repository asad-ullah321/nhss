import React, { useEffect, useState } from "react";
import NavBar from "../Navbar/Navbar";
import StockNavbar from "../StockNavbar/StockNavbar";
import "./issuedstock.css";
import InputBlock from "./Input/Input";
import StockTable from "./StockTable/StockTable";
import Toaster from "../Toaster/Toaster";


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

const IssuedStock = () => {
  const dispatch = useDispatch();
  const stocks = useSelector((state) => state.issuedstocks);
  const { issueStock, UpdateNotification } = bindActionCreators(actionCreators, dispatch);
  const [resStatus, setresStatus] = useState();
  const [response, setResponse] = useState();


  const [filtereData, setfiltereData] = useState(stocks);
  const [filtereData2, setfiltereData2] = useState(stocks);
  const [StockFilter, setStockFilter] = useState([]);
  const [LocationFilter, setLoactionFilter] = useState([null]);
  const [AddedByFilter, setAddedByFilter] = useState([null]);
  const [selectedStock, setSelectedStock] = useState("Stocks");
  const [selectedLocation, setSelectedLocation] = useState("To");
  const [selectedAddedby, setAddedBy] = useState("Issued By");
  const [selectedstatus, setStatus] = useState("Status");
  const [searchFlag, setFlagsearch] = useState(false);
  const [stockflag, setstockflag] = useState(false);
  const [locationflag, setlocationflag] = useState(false);
  const [addedbyflag, setaddedflag] = useState(false);
  const [statusFlag, setstatusFlag] = useState(false);
  const [dateFlag, setDateFlag] = useState(false);
  const [filterdate, setFilterDate] = useState({
    date1: "",
    date2: "",
  });


  useEffect(() => {
    console.log("fecth stock requested");
    fetch("http://localhost:5000/nhss/stock/issue", {
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
  }, [])

  useEffect(() => {
    if (resStatus === 200) {

      console.log(response.stock);
      response.stock.map((obj) => {
        const date = obj.date.slice(0, 10);
        console.log(date);
        issueStock({
          date: date,
          stock: obj.stock,
          To: obj.To,
          comment: obj.description,
          issuedby: obj.issuedby,
          quantity: obj.quantity,
          _id: obj._id,
          status: obj.status
        });
      });

    }
    
  }, [response && resStatus]);
  /*<------------------------------------------------------------------Use Effects for filters Start here------------------------------------------------------------------>*/

  /*to intilaize filter drop when first render occurs */
  useEffect(() => {
    const uniquestock = [...new Set(stocks.map((s) => s.stock))];
    setStockFilter([...uniquestock]);
    const uniqueloaction = [...new Set(stocks.map((s) => s.To))];
    setLoactionFilter([...uniqueloaction]);
    const uniqueaddedby = [...new Set(stocks.map((s) => s.issuedby))];
    setAddedByFilter([...uniqueaddedby]);
    console.log(StockFilter);
    setfiltereData(stocks);
    setstockflag(true);
  }, [stocks]);

  /* These useEffect is used to apply in hirarchary */
  /*This will intialze filteredata with orginal stock and set stockflag true which will call filter for based on stock */
  useEffect(() => {
    setfiltereData(stocks);
    setstockflag(true);
  }, [
    selectedStock,
    selectedLocation,
    selectedAddedby,
    filterdate,
    selectedstatus,
  ]);

  /*this will apply filter based on STOCK NAME and then set locationFlag true */
  useEffect(() => {
    if (stockflag) {
      console.log(selectedStock, selectedLocation, selectedAddedby);
      if (selectedStock !== "Stocks") {
        setfiltereData(
          filtereData.filter((f) => {
            //console.log(f.stock);
            return f.stock.includes(selectedStock);
          })
        );
      }

      console.log(filtereData, "After stock");
    }
    setstockflag(false);

    setlocationflag(true);
  }, [stockflag]);

  /*this will apply filter based on LOCATION and then set addedbyFlag true */
  useEffect(() => {
    if (locationflag) {
      if (selectedLocation !== "To") {
        setfiltereData(
          filtereData.filter((f) => {
            //  console.log(f.stock);
            return f.To.includes(selectedLocation);
          })
        );
      }

      console.log(filtereData, "After to");
    }
    setlocationflag(false);

    setaddedflag(true);
  }, [locationflag]);

  /*this will apply filter based on ADDED BY and end the call  */
  useEffect(() => {
    if (addedbyflag) {
      if (selectedAddedby !== "Issued By") {
        console.log(selectedAddedby);
        setfiltereData(
          filtereData.filter((f) => {
            //  console.log(f.stock);
            return f.issuedby.includes(selectedAddedby);
          })
        );
      }
      console.log(filtereData, "After IssuedBy");
    }
    setaddedflag(false);

    setDateFlag(true);
    console.log(dateFlag);
  }, [addedbyflag]);

  useEffect(() => {
    if (dateFlag && filterdate.date1 !== "" && filterdate.date2 !== "") {
      setfiltereData(
        filtereData.filter((f) => {
          return (
            new Date(f.date) >= filterdate.date1 &&
            new Date(f.date) <= filterdate.date2
          );
        })
      );
      //console.log(filterdate.date1);
      //console.log(filterdate.date2);
    }
    setDateFlag(false);
    setstatusFlag(true);
  }, [dateFlag]);

  useEffect(() => {
    if (statusFlag) {
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

    setstatusFlag(false);
    setFlagsearch(true);
  }, [statusFlag]);

  useEffect(() => {
    if (searchFlag) {
      setfiltereData2(filtereData);
      setFlagsearch(false);
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

      <StockNavbar />

      <Container>
        {/*<----------------------------Filter Bar---------------------------->*/}
        <Navbar
          className="mt-2 mx-3"
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
                  id="stocks"
                  onChange={(e) => {
                    setSelectedStock(e.target.value);
                    console.log(e.target.value);
                  }}
                  aria-label="Default select example"
                  className="me-2 mt-2"
                  size="sm"
                >
                  <option>Stocks</option>
                  {StockFilter.map((s) => (
                    <option value={s}>{s}</option>
                  ))}
                </Form.Select>

                {/* Filter selection for Location */}
                <Form.Select
                  id="Location"
                  onChange={(e) => {
                    setSelectedLocation(e.target.value);
                    console.log(e.target.value);
                  }}
                  aria-label="Default select example"
                  className="me-2  mt-2"
                  size="sm"
                >
                  <option>To</option>
                  {LocationFilter.map((s) => (
                    <option value={s}>{s}</option>
                  ))}
                </Form.Select>

                {/* Filter selection for Added By */}
                <Form.Select
                  id="Issued By"
                  onChange={(e) => {
                    setAddedBy(e.target.value);
                    console.log(e.target.value);
                  }}
                  aria-label="Default select example"
                  className="me-2 mt-2"
                  size="sm"
                >
                  <option>Issued By</option>
                  {AddedByFilter.map((s) => (
                    <option value={s}>{s}</option>
                  ))}
                </Form.Select>

                {/* Filter selection for status */}
                <Form.Select
                  id="AddedBy"
                  onChange={(e) => {
                    setStatus(e.target.value);
                    console.log(e.target.value);
                  }}
                  aria-label="Default select example"
                  className="me-5 mt-2"
                  size="sm"
                >
                  <option>Status</option>
                  <option>Issued</option>
                  <option>Returned</option>
                </Form.Select>

                {/* Filter based on Date */}
                <Form.Control
                  type="date"
                  placeholder=""
                  required
                  onChange={(e) => datesearch(e)}
                  name="date1"
                  size="sm"
                  className="mt-2"
                />

                <div
                  className="text-center mt-2 px-2 py-1"
                  style={{ color: "white" }}
                >
                  To
                </div>
                <Form.Control
                  type="date"
                  placeholder=""
                  required
                  onChange={(e) => datesearch(e)}
                  name="date2"
                  size="sm"
                  className="mt-2 me-5"
                />

                {/* Input component it will ad new stock via modal */}
                <InputBlock />

                {/* <Button
                  className="ms-5"
                  variant="dark"
                  size="sm"
                  onClick={() => {}}
                >
                  Search
                </Button>*/}

                {/*<Form className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder="Search by name/location"
                    className="mx-3"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => onSearch(e)}
                  />
                 
                </Form>*/}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <StockTable filtereData2={filtereData2} />
      </Container>
      <Footer />
      <Toaster/>

    </div>
  );
};

export default IssuedStock;
