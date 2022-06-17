import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import { BASE_URL } from "./url";

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    return;
  }

  try {
    const res = await axios.get(`${BASE_URL}/account/currentuser/`);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });

    return res;
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response,
    });
  }
};

//Login user
export const login = (username, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ username, password });

  try {
    const res = await axios.post(`${BASE_URL}/account/login/`, body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
    return res;
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data,
    });
    return err.response;
  }
};

//Register user
export const register = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(
      `${BASE_URL}/account/registration/`,
      formData,
      config,
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());

    return res;
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data,
    });
    return err.response;
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

// verify email
export const verifyEmail = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    return;
  }

  try {
    const res = await axios.post(`${BASE_URL}/account/verifyemail/`);

    return res;
  } catch (err) {
    return err;
  }
};

// confirm email
export const confirmEmail = (data, history) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    return;
  }
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `${BASE_URL}/account/confirmemail/`,
      data,
      config,
    );

    dispatch(loadUser());
    return res;
  } catch (err) {
    return err;
  }
};

// verify id
export const verifyId = (data) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    return;
  }
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `${BASE_URL}/account/id_verify/`,
      data,
      config,
    );
    dispatch(loadUser());
    return res;
  } catch (err) {
    return err.response;
  }
};

// send reset password request
export const requestResetPassword = (username) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/account/forgot_password/${username}/`,
    );

    console.log(res);

    return res;
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.data,
    });
    console.log(err);
    return err.response;
  }
};

// send reset password code
export const requestResetCode = (data, username) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `${BASE_URL}/account/forgot_password/${username}/`,
      data,
      config,
    );

    return res;
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.data,
    });
    console.log(err);
    return err.response;
  }
};

// reset password
export const resetPassword = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(
      `${BASE_URL}/account/reset_password/`,
      data,
      config,
    );

    dispatch(loadUser());

    return res;
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.data,
    });
    console.log(err);
    return err.response;
  }
};
