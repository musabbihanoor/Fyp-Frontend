import axios from "axios";
import {
  GET_PROFILES,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_EDUCATIONS,
  CREATE_EDUCATION,
  DELETE_EDUCATION,
  UPDATE_EDUCATION,
  GET_EXPERIENCES,
  CREATE_EXPERIENCE,
  DELETE_EXPERIENCE,
  UPDATE_EXPERIENCE,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import { BASE_URL } from "./url";

//Get profiles
export const getProfiles = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    return;
  }
  try {
    const res = await axios.get(`${BASE_URL}/account/listprofiles/`);

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });

    return res.data;
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.config, status: err },
    });
  }
};

export const getProfile = (id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    return;
  }
  try {
    const res = await axios.get(`${BASE_URL}/account/getprofile/${id}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    return res.data;
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.config, status: err },
    });
  }
};

export const updateProfile = (data, id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.patch(
      `${BASE_URL}/account/updateuser/${id}/`,
      data,
      config,
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    return res;
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.data,
    });
    return err;
  }
};

// Create friend request
export const createFriendRequest = (id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    return;
  }

  try {
    const res = await axios.get(`${BASE_URL}/account/send_request/${id}/`);

    return res;
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Create friend request
export const acceptFriendRequest = (id, action) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    return;
  }

  try {
    const res = await axios.get(
      `${BASE_URL}/account/accept_request/${id}/${action}`,
    );

    return res;
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// get educations
export const getEducations = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    return;
  }

  try {
    const res = await axios.get(`${BASE_URL}/account/EducationListCreate/`);

    dispatch({
      type: GET_EDUCATIONS,
      payload: res.data,
    });

    return res;
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Create education
export const createEducation = (data) => async (dispatch) => {
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
      `${BASE_URL}/account/EducationListCreate/`,
      data,
      config,
    );

    dispatch({
      type: CREATE_EDUCATION,
      payload: res.data,
    });

    return res;
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.data,
    });
    return err.response;
  }
};

// Update education
export const updateEducation = (id, data) => async (dispatch) => {
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

    const res = await axios.patch(
      `${BASE_URL}/account/EducationGetUpdateDelete/${id}`,
      data,
      config,
    );

    dispatch({
      type: UPDATE_EDUCATION,
      payload: res.data,
    });

    return res;
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response,
    });

    return err.response;
  }
};

// Delete education
export const deleteEducation = (id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    return;
  }

  try {
    const res = await axios.delete(
      `${BASE_URL}/account/EducationGetUpdateDelete/${id}`,
    );

    dispatch({
      type: DELETE_EDUCATION,
      payload: id,
    });

    return res;
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// get experience
export const getExperience = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    return;
  }

  try {
    const res = await axios.get(`${BASE_URL}/account/WorkListCreate/`);

    dispatch({
      type: GET_EXPERIENCES,
      payload: res.data,
    });

    return res;
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Create experience
export const createExperience = (data) => async (dispatch) => {
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
      `${BASE_URL}/account/WorkListCreate/`,
      data,
      config,
    );

    dispatch({
      type: CREATE_EXPERIENCE,
      payload: res.data,
    });

    return res;
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response.data,
    });
    return err.response;
  }
};

// Update experience
export const updateExperience = (id, data) => async (dispatch) => {
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

    const res = await axios.patch(
      `${BASE_URL}/account/WorkGetUpdateDelete/${id}`,
      data,
      config,
    );

    dispatch({
      type: UPDATE_EXPERIENCE,
      payload: res.data,
    });

    return res;
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: err.response,
    });

    return err.response;
  }
};

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    return;
  }

  try {
    const res = await axios.delete(
      `${BASE_URL}/account/WorkGetUpdateDelete/${id}`,
    );

    dispatch({
      type: DELETE_EXPERIENCE,
      payload: id,
    });

    return res;
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};
