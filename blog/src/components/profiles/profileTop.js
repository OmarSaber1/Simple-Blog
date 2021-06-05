import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";

import { Image } from "cloudinary-react";

const ProfileTop = ({
  match: {
    params: { id },
  },
  profile,
}) => {
  const [ImageIds, setImageIds] = useState("");
  let x = 1;
  useEffect(() => {
    loadImage();
    console.log(ImageIds);
    x++;
  }, []);
  const loadImage = async () => {
    try {
      const im = await axios.get("http://localhost:5000/api/profile/images");
      const im1 = im.data;
      console.log(im1[0]?.public_id);
      setImageIds(im1[0]?.public_id);
    } catch (err) {
      console.error(err);
    }
  };
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
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage);
    try {
      await fetch("http://localhost:5000/api/profile/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
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
      {profile && (
        <div>
          {ImageIds ? (
            <Image
              cloudName="ddeecshur"
              style={{ width: "120px", height: "120px", borderRadius: "50%" }}
              publicId={ImageIds}
            ></Image>
          ) : (
            <img
              style={{ width: "202px", height: "220px" }}
              src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
            ></img>
          )}

          {profile.user.name && <h2>{profile.user.name}</h2>}
          {profile._id == id && (
            <form onSubmit={handleSubmitFile} className="form">
              <input
                id="fileInput"
                type="file"
                name="image"
                onChange={handleFileInputChange}
                value={fileInputState}
                className="form-input"
              />
              <button className="btn bg-success" type="submit">
                Upload
              </button>
            </form>
          )}
          {previewSource && (
            <img
              src={previewSource}
              alt="chosen"
              style={{ height: "200px", width: "200px", borderRadius: "50%" }}
            />
          )}
        </div>
      )}
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

export default withRouter(ProfileTop);
