import React from "react";

const ProfileAbout = ({
  profile: {
    bio,
    user: { name },
  },
}) => {
  return (
    <>
      <div className="bg-primary w-100 text-center mt-3 border border-black text-white">
        {bio && (
          <>
            <h1>{name}'s Bio</h1>
            <p>{bio}</p>
          </>
        )}
      </div>
    </>
  );
};

export default ProfileAbout;
