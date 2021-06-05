import { Image } from "cloudinary-react";
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
      <h1 className="mt-5 text-center">Profiles</h1>
      <h3 className="mt-1 mb-5 text-center">Welcome to our community!</h3>

      {!loading && profiles ? (
        profiles.map((profile) => {
          return (
            <div
              key={profile._id}
              className="mx-auto w-50 text-center shadow-lg  bg-light p-5 mt-3 border border-black border-1"
            >
              <div>
                {profile.user.avatar ? (
                  <Image
                    cloudName="ddeecshur"
                    alt=""
                    className="rounded-circle w-25"
                    publicId={profile.user.avatar}
                  ></Image>
                ) : (
                  <img
                    style={{ width: "202px", height: "220px" }}
                    src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                  ></img>
                )}

                <h3>{profile.user.name}</h3>
                {profile.company && (
                  <p>
                    works at <b>{profile.company}</b>
                  </p>
                )}
                <Link
                  to={`/profile/${profile._id}`}
                  className="btn btn-primary"
                >
                  {console.log(profile._id)}
                  View Profile
                </Link>
              </div>
            </div>
          );
        })
      ) : (
        <div
          style={{
            textAlign: "center",
            margin: "200px auto",
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
