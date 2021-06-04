import axios from "axios";
import React, { useState } from "react";

const ProfileTop = ({ profile }) => {
  //   const [imageSelected, SetImageSelcted] = useState("");
  //   console.log(profile);

  //   const uploadImage = async (files) => {
  //     const formData = new FormData();
  //     formData.append("file", files[0]);
  //     formData.append("upload_preset", "jxevn5tp");

  //     const config = {
  //       headers: {
  //         "Content-Type": "multipart/formdata",
  //       },
  //     };

  //     await axios.post(
  //       "https://api.cloudinary.com/v1_1/ddeecshur/upload",
  //       formData,
  //       config
  //     );
  //   };
  return (
    <div className="text-center w-100 bg-light p-3">
      {profile.user.avatar && (
        <>
          <img
            alt=""
            className="rounded-circle"
            src={profile.user.avatar}
          ></img>
          {/* <input
            type="file"
            onChange={(e) => {
              uploadImage(e.target.files);
            }}
          />
          <button onClick={uploadImage}>uploadImage </button> */}
        </>
      )}
      {profile.user.name && <h2>{profile.user.name}</h2>}
      <p></p>
      {profile.bio && <p>{profile.bio}</p>}
      {profile.facebook && (
        <a target="_blank" rel="noreferrer noopener" href={profile.facebook}>
          <i className="px-1 fab fa-facebook fa-2x"></i>
        </a>
      )}{" "}
      {profile.twitter && (
        <a target="_blank" rel="noreferrer noopener" href={profile.twitter}>
          <i className="px-1 text-info fab fa-twitter fa-2x"></i>
        </a>
      )}{" "}
      {profile.youtube && (
        <a target="_blank" rel="noreferrer noopener" href={profile.youtube}>
          <i className="px-1 text-danger fab fa-youtube fa-2x"></i>
        </a>
      )}{" "}
      {profile.instagram && (
        <a target="_blank" rel="noreferrer noopener" href={profile.instagram}>
          <i className="px-1 text-danger fab fa-instagram fa-2x"></i>
        </a>
      )}{" "}
      {profile.linkedin && (
        <a target="_blank" rel="noreferrer noopener" href={profile.linkedin}>
          <i className="px-1 text- info fab fa-linkedin fa-2x"></i>
        </a>
      )}
    </div>
  );
};

export default ProfileTop;
