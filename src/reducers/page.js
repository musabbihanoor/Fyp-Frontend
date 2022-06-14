import { GET_PAGE, GET_PAGES, PAGE_ERROR } from "../actions/types";

const initialState = {
  pages: [],
  page: null,
  loading: true,
  error: {},
};

export default function page(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PAGES:
      return {
        ...state,
        pages: payload,
        loading: false,
      };
    case GET_PAGE:
      return {
        ...state,
        page: payload,
        loading: false,
      };

    case PAGE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
