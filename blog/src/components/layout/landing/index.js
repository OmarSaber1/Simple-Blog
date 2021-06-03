import React from "react";
import "./landing.css";
import header from "../../../assets/1.jpg";
import { connect } from "react-redux";

const Landing = ({ isAuthenticated }) => {
  // if (isAuthenticated) {
  //   return <Redirect to="/dashboard" />;
  // }
  return (
    <div className="header w-100">
      <img src={header} alt="" />
    </div>
  );
};

const mapStataToProps = (state) => {
  return {
    isAuthenticated: state.authReducer,
  };
};

export default connect(mapStataToProps)(Landing);
