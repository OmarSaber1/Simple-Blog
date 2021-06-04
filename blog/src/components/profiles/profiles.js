import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfiles } from "../../actions/profile";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  //////
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  ///////

  console.log(profiles);

  return (
    <>
      <h1>Developers</h1>
      <h3>Welcome to our developers teams!</h3>

      {!loading && profiles ? (
        profiles.map((profile) => {
          return (
            <div
              key={profile._id}
              className="d-flex justify-content-between w-100 bg-light p-5 mt-3 border border-black border-1"
            >
              <div>
                <img
                  alt=""
                  className="rounded-circle w-50"
                  src={profile.user.avatar}
                ></img>

                <h3>{profile.user.name}</h3>
                <p>
                  works at <b>{profile.company}</b>
                </p>
                <Link
                  to={`/profile/${profile._id}`}
                  className="btn btn-primary"
                >
                  View Profile
                </Link>
              </div>

              <div className=" w-50  ">
                <h2 className="text-info">skills</h2>
                {console.log(profile.skills)}
                {profile.skills.slice(0, 4).map((skill, index) => (
                  <p
                    key={index}
                    style={{ fontSize: "25px", fontWeight: "bold" }}
                  >
                    {" "}
                    <i className="fa fa-check text-success"></i> {skill}
                  </p>
                ))}
              </div>
            </div>
          );
        })
      ) : (
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
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profileReducer,
  };
};
export default connect(mapStateToProps, { getProfiles })(Profiles);
