import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProfileAbout from "./profileAbout";
import ProfileTop from "./profileTop";

const Profile = ({ match: { params }, profile: { profile, loading } }) => {
  return (
    <>
      <Link className="btn btn-info mt-5" to={`/developers`}>
        <i className="fa fa-arrow-alt-circle-left"> </i> Back to profiles
      </Link>
      {profile && <ProfileTop profile={profile} />}
      {profile && <ProfileAbout profile={profile} />}
      {profile && !loading && params.id == profile._id && (
        <Link className="btn btn-dark" to="/edit-profile">
          Edit profile
        </Link>
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

export default connect(mapStateToProps)(Profile);
