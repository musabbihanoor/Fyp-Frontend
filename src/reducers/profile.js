import {
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  USER_LOADED,
  GET_PROFILE,
  GET_EDUCATIONS,
  CREATE_EDUCATION,
  UPDATE_EDUCATION,
  DELETE_EDUCATION,
  GET_EXPERIENCES,
  CREATE_EXPERIENCE,
  UPDATE_EXPERIENCE,
  DELETE_EXPERIENCE,
  // FRIEND_REQUEST_SENT,
  // FRIEND_REQUEST_DELETED,
} from "../actions/types";

const initialState = {
  profiles: [],
  profile: null,
  educations: [],
  experiences: [],
  loading: true,
  error: {},
};

export default function profile(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case USER_LOADED:
    case UPDATE_PROFILE:
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
        error: {},
      };

    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_EDUCATIONS: {
      return {
        ...state,
        educations: payload,
        loading: false,
        error: {},
      };
    }
    case CREATE_EDUCATION: {
      return {
        ...state,
        educations: [...state.educations, payload],
        loading: false,
        error: {},
      };
    }
    case UPDATE_EDUCATION: {
      return {
        ...state,
        educations: state.educations.map((x) =>
          x.id === payload.id ? payload : x,
        ),
        loading: false,
        error: {},
      };
    }
    case DELETE_EDUCATION: {
      return {
        ...state,
        educations: state.educations.filter((x) => x.id !== payload),
        loading: false,
        error: {},
      };
    }
    case GET_EXPERIENCES: {
      return {
        ...state,
        experiences: payload,
        loading: false,
        error: {},
      };
    }
    case CREATE_EXPERIENCE: {
      return {
        ...state,
        experiences: [...state.experiences, payload],
        loading: false,
        error: {},
      };
    }
    case UPDATE_EXPERIENCE: {
      return {
        ...state,
        experiences: state.experiences.map((x) =>
          x.id === payload.id ? payload : x,
        ),
        loading: false,
        error: {},
      };
    }
    case DELETE_EXPERIENCE: {
      return {
        ...state,
        experiences: state.experiences.filter((x) => x.id !== payload),
        loading: false,
        error: {},
      };
    }

    default:
      return state;
  }
}
