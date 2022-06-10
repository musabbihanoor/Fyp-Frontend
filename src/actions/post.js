import axios from "axios";
import {
  GET_POSTS,
  CREATE_POST,
  DELETE_POST,
  UPDATE_POST,
  POST_ERROR,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import { BASE_URL } from "./url";

//Get posts
export const getPosts = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    return;
  }
  try {
    const res = await axios.get(`${BASE_URL}/posts/`);

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.config, status: err },
    });
  }
};

//Get posts
export const getPostsById = (id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    return;
  }
  try {
    const res = await axios.get(`${BASE_URL}/posts/?profileid.id=${id}`);

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.config, status: err },
    });
  }
};

// Create Post
export const createPost = (formData) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    return;
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`${BASE_URL}/posts/create/`, formData, config);

    dispatch({
      type: CREATE_POST,
      payload: res.data,
    });

    return res.data;

    //dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Delete post
export const deletePost = (id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    return;
  }
  try {
    await axios.delete(`${BASE_URL}/posts/delete/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Update post
export const updatePost = (id, formData) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    return;
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.patch(
      `${BASE_URL}/posts/update/${id}/`,
      formData,
      config,
    );
    dispatch({
      type: UPDATE_POST,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Create post reaction
export const createPostReactions = (formData) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    return;
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `${BASE_URL}/posts/createReactions/`,
      formData,
      config,
    );
    dispatch({
      type: UPDATE_POST,
      payload: res.data,
    });
    return res.data;
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Delete post reaction
export const deletePostReactions = (id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    return;
  }
  try {
    const res = await axios.delete(`${BASE_URL}/posts/deleteReactions/${id}`);
    dispatch({
      type: UPDATE_POST,
      payload: res.data,
    });
    console.log(res.data);
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Update post reaction
export const updatePostReactions = (id, formData) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    return;
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(
      `${BASE_URL}/posts/updateReactions/${id}/`,
      formData,
      config,
    );
    dispatch({
      type: UPDATE_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

//Get post reaction
export const getPostReaction = (id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    return;
  }
  try {
    const res = await axios.get(`${BASE_URL}/posts/getReactions/${id}`);

    // dispatch({
    //   type: GET_POSTS,
    //   payload: res.data,
    // });
    return res.data;
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.config, status: err },
    });
  }
};

//Get post comments
export const getPostComments = (id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    return;
  }
  try {
    const res = await axios.get(`${BASE_URL}/posts/getComments/${id}`);

    // dispatch({
    //   type: GET_POSTS,
    //   payload: res.data,
    // });
    return res.data;
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.config, status: err },
    });
  }
};

// Create post comment
export const createPostComment = (formData) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    return;
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `${BASE_URL}/posts/createComments/`,
      formData,
      config,
    );
    dispatch({
      type: UPDATE_POST,
      payload: res.data,
    });
    console.log(res);
    return res.data;
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};

// Delete post comment
export const deletePostComment = (id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    return;
  }
  try {
    const res = await axios.delete(`${BASE_URL}/posts/deleteComments/${id}`);
    dispatch({
      type: UPDATE_POST,
      payload: res.data,
    });
    // console.log(res.data);
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.data, status: err.response.status },
    });
  }
};
