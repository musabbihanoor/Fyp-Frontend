import axios from "axios";

export const hatespeech = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `http://localhost:8000/hatespeech`,
      formData,
      config
    );
    return res;
  } catch (err) {
    return err;
  }
};

export const islamophobia = (body) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get(
      `http://localhost:8000/islamophobia/?text=${body}`,

      config
    );
    return res;
  } catch (err) {
    return err;
  }
};

export const nudity = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `http://localhost:8000/nudity`,
      formData,
      config
    );
    return res;
  } catch (err) {
    return err;
  }
};

export const tags = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `http://localhost:8000/tags`,
      formData,
      config
    );
    return res;
  } catch (err) {
    return err;
  }
};

export const translation = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `http://localhost:8000/translation`,
      formData,
      config
    );
    return res;
  } catch (err) {
    return err;
  }
};

export const similarity = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `http://localhost:8000/similarity`,
      formData,
      config
    );
    return res;
  } catch (err) {
    return err;
  }
};
