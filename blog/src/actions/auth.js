import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";

import { setAuthToken } from "../utilies/setAuthToken";

////////////////////////////////////// LOAD USER ACTION //////////////////////////////////

export const userLoaded = () => async (dispatch) => {
  // if token exists

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const response = await axios.get("http://localhost:5000/api/auth");
    console.log(response.data);
    dispatch({ type: USER_LOADED, payload: response.data });
  } catch (err) {
    console.log(err.response);
    dispatch({ type: AUTH_ERROR });
  }
};

//// USER REGISTER ////////////
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // body
    const body = { name, email, password };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/",
        body,
        config
      );
      console.log(response);
      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
      dispatch(userLoaded());
    } catch (err) {
      const errors = err.response.data.error;
      console.log(errors);
      dispatch({ type: REGISTER_FAIL });
    }
  };

////////////////////////////////// USER LOGIN //////////////////////////////////

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // body
    const body = { email, password };
    console.log(body, email, password);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth",
        body,
        config
      );
      console.log(response);
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      dispatch(userLoaded());
    } catch (err) {
      const errors = err.response.data.errors;
      console.log(errors);
      console.log(err);
      dispatch({ type: LOGIN_FAIL });
    }
  };

/// LOGOUT / CLEAR PROFILE

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
};
