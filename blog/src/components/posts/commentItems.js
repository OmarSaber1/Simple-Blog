import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { deleteComment } from "../../actions/posts";

const CommentItems = ({
  comment: { _id, text, name, avatar, user, date },
  post,
  deleteComment,
  auth,
}) => {
  return (
    <div
      style={{ boxShadow: "3px 4px 5px  grey" }}
      className="d-flex w-100 p-4 bg-light border border-darken-1 mt-4 "
    >
      <div className="w-25 text-center">
        <Link style={{ textDecoration: "none" }} to={`/profile/${user}`}>
          {avatar && (
            <img className="rounded-circle w-50" alt="" src={avatar}></img>
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
