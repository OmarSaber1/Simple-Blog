import React, { useEffect } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { likeOrDislikePost, deletePost } from "../../actions/posts";
import { Image } from "cloudinary-react";

const PostItems = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  likeOrDislikePost,
  deletePost,
}) => {
  return (
    <div
      style={{ boxShadow: "3px 4px 5px  grey" }}
      className="d-flex w-100 p-4 bg-light border border-darken-1 mt-4 "
    >
      <div className="w-25">
        <Link to={`/profile/${user}`}>
          {avatar ? (
            <Image
              cloudName="ddeecshur"
              className="rounded-circle"
              alt=""
              publicId={avatar}
            ></Image>
          ) : (
            <img
              style={{ width: "202px", height: "202px" }}
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
          <div style={{ marginTop: "180px" }}>
            <p className="text-info">
              Posted at <Moment format="DD/MM/YYYY">{date}</Moment>
            </p>
            <button
              onClick={() => likeOrDislikePost(_id)}
              type="button"
              className={"btn btn-light"}
            >
              <i className="fas fa-thumbs-up"></i>
              &nbsp;
              {likes && likes.length > 0 && likes.length}
            </button>
            {_id && (
              <Link to={`/post/${_id}`}>
                <span className="btn btn-primary">
                  discussion{" "}
                  {comments && comments.length > 0 && (
                    <span className="bg-success rounded px-1">
                      {comments.length}{" "}
                    </span>
                  )}
                </span>
              </Link>
            )}
            &nbsp;
            {auth.isAuthenticated && user == auth.user._id && (
              <button
                onClick={() => deletePost(_id)}
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
export default connect(mapStateToProps, { likeOrDislikePost, deletePost })(
  PostItems
);
