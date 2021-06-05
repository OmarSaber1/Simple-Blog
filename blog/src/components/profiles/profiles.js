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
                <Image
                  cloudName="ddeecshur"
                  alt=""
                  className="rounded-circle w-25"
                  publicId={profile.user.avatar}
                ></Image>

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
