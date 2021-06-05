import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { getPosts } from "../../actions/posts";
import CreatePost from "./addpost";
import PostItems from "./postItems";

const Posts = ({ getPosts, posts: { loading, posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  console.log(loading);

  return loading ? (
    <>
      <div
        style={{
          textAlign: "center",
          margin: "200px auto  ",
          width: "100%",
          height: "100vh",
        }}
      >
        <div className="spinner-border text-primary " role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  ) : (
    <>
      <h1 className="text-info mt-3">Posts</h1>
      <p className="mb-5">
        <i className="fa fa-user"></i> Welcome to the community
      </p>
      <CreatePost />
      {posts.map((post, index) => {
        console.log(post);
        return <PostItems key={index} post={post} />;
      })}
    </>
  );
};

const mapStateToProps = (state) => {
  return { posts: state.postReducer };
};

export default connect(mapStateToProps, { getPosts })(Posts);
