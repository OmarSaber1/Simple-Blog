import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { profileAction } from "../../actions/profile";
import DashBoardUrls from "./dashBoardUrls";

const Dashboard = ({
  profileAction,
  auth: { user },
  profile: { loading, profile },
}) => {
  // when app mount

  useEffect(() => {
    profileAction();
  }, [profileAction]);

  return loading && profile === null ? (
    <div
      style={{
        textAlign: "center",
        margin: "200px auto  ",
        width: "100%",
        height: "100vh",
      }}
    >
      <div className="spinner-border text-primary " role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    <>
      <h1 className="text-info text-center mt-3 mb-3">DashBoard</h1>
      <p style={{ fontSize: "40px" }}>
        {" "}
        Welcome{" "}
        <span
          style={{ fontSize: "30px", color: "#121212", fontStyle: "italic" }}
        >
          {" "}
          {user && user.name}
        </span>
      </p>{" "}
      &nbsp;
      {profile ? (
        <>
          <DashBoardUrls />
        </>
      ) : (
        <>
          <Link to="/create-profile" className="btn btn-success">
            Create Profile
          </Link>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
    profile: state.profileReducer,
  };
};

export default connect(mapStateToProps, { profileAction })(Dashboard);
