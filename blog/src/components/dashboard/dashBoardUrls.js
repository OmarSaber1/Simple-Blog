import React from "react";
import { Link } from "react-router-dom";

const DashBoardUrls = () => {
  return (
    <div className="w-50 d-flex justify-content-between mt-2">
      <Link className="btn btn-light  text-primary" to="/edit-profile">
        <i className="fas fa-user-circle"></i> Edit Profile
      </Link>
    </div>
  );
};

export default DashBoardUrls;
