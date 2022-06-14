import { combineReducers } from "redux";
import post from "./post";
import auth from "./auth";
import profile from "./profile";
import group from "./group";
import page from "./page";

export default combineReducers({ post, auth, profile, group, page });
