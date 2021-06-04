import axios from "axios";
import React, { useState } from "react";

const ProfileTop = ({ profile }) => {
  /////// setup clodinary

  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
      setErrMsg("something went wrong!");
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      await fetch("http://localhost:5000/api/porfile/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-Type": "application/json" },
      });
      setFileInputState("");
      setPreviewSource("");
      setSuccessMsg("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      setErrMsg("Something went wrong!");
    }
  };

  /////////////////////////////////////
  return (
    <div className="text-center w-100 bg-light p-3">
      {profile.user.avatar && (
        <div>
          <h1 className="title">Upload an Image</h1>
          <form onSubmit={handleSubmitFile} className="form">
            <input
              id="fileInput"
              type="file"
              name="image"
              onChange={handleFileInputChange}
              value={fileInputState}
              className="form-input"
            />
            <button className="btn" type="submit">
              Submit
            </button>
          </form>
          {previewSource && (
            <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
          )}
        </div>
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
