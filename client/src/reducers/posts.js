import {
  POST_ERR,
  GET_POSTS,
  LIKE_POST,
  POST_DELETE,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  err: {},
};

export const postReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    // get post
    case GET_POST:
      console.log(state.post);
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id == payload.id ? payload.postLiked : post
        ),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: payload.Post,
        loading: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        post: payload.Post,
        loading: false,
      };
    case POST_DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload.postDeletedId),
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload.post, ...state.posts],
        loading: false,
      };
    case POST_ERR:
      return {
        ...state,
        err: payload,
        loading: false,
      };

    default:
      return state;
  }
};
