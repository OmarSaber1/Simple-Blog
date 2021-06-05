import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { deleteComment } from "../../actions/posts";
import { Image } from "cloudinary-react";

const CommentItems = ({
  comment: { _id, text, name, avatar, user, date },
  comment,
  post,
  deleteComment,
  auth,
}) => {
  console.log(comment, post);
  return (
    <div
      style={{ boxShadow: "3px 4px 5px  grey" }}
      className="d-flex w-100 p-4 bg-light border border-darken-1 mt-4 "
    >
      <div className="w-25 text-center">
        <Link style={{ textDecoration: "none" }} to={`/profile/${user}`}>
          {avatar ? (
            <Image
              cloudName="ddeecshur"
              style={{ width: "120px", height: "120px", borderRadius: "50%" }}
              publicId={avatar}
            ></Image>
          ) : (
            <img
              style={{ width: "202px", height: "220px" }}
              src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
            ></img>
          )}
          <h1 className="p-2">{name}</h1>
        </Link>
      </div>
      <div className="mx-5">
        <p>{text}</p>
        <div
          style={{
            height: "100%",
          }}
        >
          <div style={{ marginTop: "80px" }}>
            <p className="text-info">
              Posted at <Moment format="DD/MM/YYYY">{date}</Moment>
            </p>

            {auth.isAuthenticated && user == auth.user._id && (
              <button
                onClick={() => deleteComment(post._id, _id)}
                className="btn btn-danger mx-2"
              >
                delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
  };
};

export default connect(mapStateToProps, { deleteComment })(CommentItems);
