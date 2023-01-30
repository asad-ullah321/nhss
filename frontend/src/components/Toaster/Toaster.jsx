import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';


import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../states";
function Toaster() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const { UpdateNotification } = bindActionCreators(actionCreators, dispatch);

  
  useEffect(()=>{
    
        console.log("Toaster",notification)
  },[notification])
  return (
    <Row>
  { notification.show ? <Col xs={6}>
      <ToastContainer className="p-3" position={"top-end"}>
        <Toast onClose={() =>UpdateNotification({message:"", status:0,show:false})} show={notification.show} delay={3000} autohide>
          <Toast.Header>
            <span style={{"width":"16px", "height":"16px", "borderRadius":"5px", "backgroundColor":notification.status === 1?"#23C552":"#F84F31"}} className="me-1"></span>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{notification.message}</Toast.Body>
        </Toast>
        </ToastContainer>
      </Col>:""}
    </Row>
  );
}

export default Toaster;