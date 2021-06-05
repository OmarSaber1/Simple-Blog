import axios from "axios";
import {
  GET_POSTS,
  LIKE_POST,
  POST_ERR,
  POST_DELETE,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "./types";

/////// get all posts //////
export const getPosts = () => async (dispatch) => {
  try {
    const posts = await axios.get("http://localhost:5000/api/posts");

    dispatch({ type: GET_POSTS, payload: posts.data });
  } catch (err) {
    console.log(err.response);
    dispatch({ type: POST_ERR, payload: err.response });
  }
};

///////  like or dislike posts //////

export const likeOrDislikePost = (id) => async (dispatch) => {
  try {
    const postLiked = await axios.put(
      `http://localhost:5000/api/posts/like/${id}`
    );
    console.log(postLiked.data);
    dispatch({ type: LIKE_POST, payload: { id, postLiked: postLiked.data } });
  } catch (err) {
    console.log(err.response);
    dispatch({ type: POST_ERR, payload: err.response });
  }
};

///////  delete post //////

export const deletePost = (id) => async (dispatch) => {
  try {
    const postDeletedId = await axios.delete(
      `http://localhost:5000/api/posts/${id}`
    );
    console.log(postDeletedId.data);
    dispatch({
      type: POST_DELETE,
      payload: { id, postDeletedId: postDeletedId.data },
    });
  } catch (err) {
    console.log(err.response);
    dispatch({ type: POST_ERR, payload: err.response });
  }
};

///////  add post //////

export const addPost = (formData) => async (dispatch) => {
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const post = await axios.post(
      `http://localhost:5000/api/posts`,
      formData,
      header
    );
    console.log(post.data);
    dispatch({
      type: ADD_POST,
      payload: { post: post.data },
    });
  } catch (err) {
    console.log(err.response);
    dispatch({ type: POST_ERR, payload: err.response });
  }
};

/////// get a single posts //////
export const getSinglePost = (id) => async (dispatch) => {
  try {
    const post = await axios.get(`http://localhost:5000/api/posts/${id}`);
    console.log(post);
    dispatch({ type: GET_POST, payload: post.data });
  } catch (err) {
    console.log(err.response);
    dispatch({ type: POST_ERR, payload: err.response });
  }
};

///////  add Comment //////

export const addComment = (postId, formData) => async (dispatch) => {
  const header = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const Post = await axios.post(
      `http://localhost:5000/api/posts/comment/${postId}`,
      formData,
      header
    );
    console.log(Post.data);
    dispatch({
      type: ADD_COMMENT,
      payload: { Post: Post.data },
    });
  } catch (err) {
    console.log(err.response);
    dispatch({ type: POST_ERR, payload: err.response });
  }
};

///////  delete comment //////

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const Post = await axios.delete(
      `http://localhost:5000/api/posts/comment/${postId}/${commentId}`
    );
    console.log(Post.data);
    dispatch({
      type: DELETE_COMMENT,
      payload: { Post: Post.data },
    });
  } catch (err) {
    console.log(err.response);
    dispatch({ type: POST_ERR, payload: err.response });
  }
};
