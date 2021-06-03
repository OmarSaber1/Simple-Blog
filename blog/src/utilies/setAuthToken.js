import axios from "axios";

export const setAuthToken = (token) => {
  console.log(axios.defaults.headers);
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
