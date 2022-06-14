import axios from "axios";
import { GET_PAGE, GET_PAGES, PAGE_ERROR } from "./types";

// //Get pages
// export const getPages = () => async (dispatch) => {
//   if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   } else {
//     return;
//   }
//   try {
//     const res = await axios.get(`${BASE_URL}/groupspages/getallgroups/`);

//     dispatch({
//       type: GET_GROUPS,
//       payload: res.data,
//     });

//     return res.data;
//   } catch (err) {
//     dispatch({
//       type: GROUP_ERROR,
//       payload: err.response,
//     });

//     return err.response;
//   }
// };
