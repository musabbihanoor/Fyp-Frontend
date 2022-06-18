import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  FRIEND_REQUEST_ACCEPTED,
  FRIEND_REQUEST_DECLINED,
  UNFRIENDED,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  verified: false,
  error: {},
};

export default function auth(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        verified: payload.verified,
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.access);
      return {
        ...state,
        token: payload.access,
        isAuthenticated: true,
        loading: false,
        error: {},
      };

    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.access_token);
      return {
        ...state,
        token: payload.access_token,
        isAuthenticated: true,
        loading: false,
        error: {},
      };

    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        error: payload,
        loading: false,
        user: null,
      };

    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        error: {},
        loading: false,
        user: null,
        verified: false,
      };

    case UNFRIENDED:
      return {
        ...state,
        user: {
          ...state.user,
          friend_list: state.user.friend_list.filter((x) => x.id !== payload),
        },
      };

    case FRIEND_REQUEST_ACCEPTED:
      return {
        ...state,
        user: {
          ...state.user,
          friend_list: [...state.user.friend_list, payload],
        },
      };

    case FRIEND_REQUEST_DECLINED:
      return {
        ...state,
        user: {
          ...state.user,
          request_list: state.user.request_list.filter((x) => x.id !== payload),
        },
      };

    default:
      return state;
  }
}
