import axios from "axios";
import { GET_GROUPS, GROUP_ERROR } from "./types";
import setAuthToken from "../utils/setAuthToken";
import { BASE_URL } from "./url";

//Get groups
export const getGroups = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    return;
  }
  try {
    const res = await axios.get(`${BASE_URL}/groupspages/getallgroups/`);

    dispatch({
      type: GET_GROUPS,
      payload: res.data,
    });

    return res.data;
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: err.response,
    });

    return err.response;
  }
};
