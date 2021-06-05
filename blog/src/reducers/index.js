import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { profileReducer } from "./profile";
import { postReducer } from "./posts";

export default combineReducers({ authReducer, profileReducer, postReducer });
