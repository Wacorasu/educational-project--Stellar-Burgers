import { getServerData } from "../../utils/burger-api";

export const DATA_REQUEST = "DATA_REQUEST";
export const DATA_REQUEST_SUCCESS = "DATA_REQUEST_SUCCESS";
export const DATA_REQUEST_FAILED = "DATA_REQUEST_FAILED";
export const DECREASE_COUNT = "DECREASE_COUNT";
export const INCREASE_COUNT = "INCREASE_COUNT";
export const RESET_COUNT = "RESET_COUNT";

export const getData = () => (dispatch) => {
  dispatch({
    type: DATA_REQUEST,
  });
  return getServerData()
    .then((res) => {
      dispatch({
        type: DATA_REQUEST_SUCCESS,
        dataLoad: res.data.map((item) => {
          return { ...item, count: 0 };
        }),
      });
    })
    .catch((err) => {
      dispatch({
        type: DATA_REQUEST_FAILED,
        dataLoad: err,
      });
    });
};
