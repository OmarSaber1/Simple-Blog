import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { getSinglePost } from "../../actions/posts";
import { Spinner } from "../layout/spinner";
import Moment from "react-moment";
import CommentForm from "./commentForm";
import CommentItems from "./commentItems";

const Post = ({ post, loading, getSinglePost, match: { params } }) => {
  useEffect(() => {
    getSinglePost(params.id);
  }, [getSinglePost]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <Link className="btn btn-light  mt-4" to="/posts">
        <i className="fa fa-arrow-alt-circle-left"></i> Back to posts
      </Link>
      <div
        style={{ boxShadow: "3px 4px 5px  grey" }}
        className="d-flex w-100 p-4 bg-light border border-darken-1 mt-4 "
      >
        <div className="w-25  text-center">
          <img
            className="rounded-circle w-50 "
            alt=""
            src={post && post.avatar}
          ></img>
          <h1 className="p-2">{post && post.name}</h1>
        </div>
        <div className="mx-5">
          <p>{post && post.text}</p>
          <div
            style={{
              height: "100%",
            }}
          >
            <div style={{ marginTop: "80px" }}>
              <small className="text-black">
                Posted at{" "}
                <Moment format="DD/MM/YYYY">{post && post.date}</Moment>
              </small>
            </div>
          </div>
        </div>
      </div>
      {<CommentForm id={params.id} text name avatar user likes comments date />}
      {post &&
        post.comments &&
        post.comments.length > 0 &&
        post.comments.map((comment, index) => (
          <CommentItems key={index} post={post} comment={comment} />
        ))}
    </>
  );
};
const mapStateToProps = (state) => {
  console.log(state.postReducer);
  if (state.postReducer.post)
    return {
      post: state.postReducer.post,
      auth: state.authReducer.isAuthenticated,
    };
  return {};
};

export default connect(mapStateToProps, { getSinglePost })(withRouter(Post));
