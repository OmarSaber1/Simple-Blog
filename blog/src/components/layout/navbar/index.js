import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  console.log(isAuthenticated, loading);

  const authLinks = (
    <div className="nav-links">
      <Link to="/developers">
        <i className="fas fa-laptop-code"></i> &nbsp;Profiles
      </Link>
      <Link to="/posts">
        <i className="fas fa-blog"></i> &nbsp;Posts
      </Link>
      <Link to="/dashboard">
        <i className="fas fa-user"></i>
        &nbsp;Dashboard
      </Link>
      <Link onClick={logout} to="/login">
        <i className="fas fa-sign-out-alt"></i>
        &nbsp;Logout
      </Link>
    </div>
  );
  const guestLinks = (
    <div className="nav-links">
      <Link to="/developers">Developers</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </div>
  );

  return (
    <div className="nav d-flex justify-content-between align-items-center px-5">
      <input type="checkbox" id="nav-check" />
      <div className="nav-header">
        <div className="nav-title">
          <i className="fab fa-drupal fa-2x mx-3"></i> &nbsp;
          <Link
            style={{
              textDecoration: "none",
              fontSize: "30px",
              color: "white  ",
            }}
            to="/"
          >
            Bloggers
          </Link>
        </div>
      </div>
      <div className="nav-btn">
        <label htmlFor="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
      {isAuthenticated ? <>{authLinks}</> : <>{guestLinks}</>}
    </div>
  );
};

const mapStataToProps = (state) => {
  return {
    auth: state.authReducer,
  };
};
export default connect(mapStataToProps, { logout })(Navbar);
