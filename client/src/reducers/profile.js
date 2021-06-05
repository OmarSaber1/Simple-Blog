import {
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERR,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  err: {},
};

export const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    // get profile
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: payload,
      };

    // get all profiles

    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };

    // clear profile
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    case PROFILE_ERR:
      return {
        ...state,
        loading: false,
        err: payload,
      };
    default:
      return state;
  }
};
