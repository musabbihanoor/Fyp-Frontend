import {
  GET_POSTS,
  CREATE_POST,
  DELETE_POST,
  POST_ERROR,
  UPDATE_POST,
} from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== payload),
        loading: false,
      };

    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === payload.id ? payload : post
        ),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
