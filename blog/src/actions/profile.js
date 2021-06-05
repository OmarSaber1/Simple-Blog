import axios from "axios";
import { PROFILE_ERR, GET_PROFILE, GET_PROFILES } from "./types";

// get user profile

export const profileAction = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/profile/me");
    console.log(response);
    dispatch({ type: GET_PROFILE, payload: response.data });
  } catch (err) {
    const errors = err.response;
    console.log(err);

    dispatch({
      type: PROFILE_ERR,
      payload: { msg: errors.statusText, status: err.response.status },
    });
  }
};

//////////////////////////////// get all profiles ////////////////////

export const getProfiles = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/profile");
    console.log(response);
    dispatch({ type: GET_PROFILES, payload: response.data });
  } catch (err) {
    const errors = err.response;
    console.log(err);
    dispatch({
      type: PROFILE_ERR,
      payload: { msg: errors.statusText, status: err.response.status },
    });
  }
};

//////////////////////////////// get profiles by id ////////////////////

export const getProfileById = (userId) => async (dispatch) => {
  console.log(`entered action by id profile`);
  try {
    const response = await axios.get(`/api/profile/${userId}`);
    console.log(response);
    dispatch({ type: GET_PROFILE, payload: response.data });
  } catch (err) {
    const errors = err.response;
    dispatch({
      type: PROFILE_ERR,
      payload: { msg: errors.statusText, status: err.response.status },
    });
  }
};

////////////////////////// Create a profile /////////////////////////
export const createProfile =
  (formData, history, Edit = false) =>
  async (dispatch) => {
    const configData = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post("/api/profile", formData, configData);
      console.log(response);
      dispatch({ type: GET_PROFILE, payload: response.data });

      history.push("/dashboard");
    } catch (err) {
      // Error
      console.log(err.response.data.errors);
      const errors = err.response;
      dispatch({
        type: PROFILE_ERR,
        payload: { msg: errors.statusText, status: err.response.status },
      });
    }
  };
