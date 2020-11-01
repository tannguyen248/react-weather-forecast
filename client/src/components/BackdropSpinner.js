import React from "react";
import Backdrop from "./Backdrop";
import Spinner from "react-bootstrap/Spinner";

const BackdropSpinner = ({ display }) => {
  return (
    <Backdrop display={display}>
      <Spinner animation="border" role="status" />
    </Backdrop>
  );
};

export default BackdropSpinner;
