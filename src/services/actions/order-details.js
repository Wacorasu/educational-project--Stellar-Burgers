import { getOrder } from "../../utils/burger-api";

export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILED = "CREATE_ORDER_FAILED";
export const ORDER_RESET = "ORDER_RESET";

export const createOrder = (ingredients) => (dispatch) => {
  dispatch({
    type: CREATE_ORDER_REQUEST,
  });
  return getOrder(ingredients)
    .then((res) => {
      dispatch({
        type: CREATE_ORDER_SUCCESS,
        orderDataLoad: res,
      });
    })
    .catch((err) => {
      dispatch({
        type: CREATE_ORDER_FAILED,
        orderDataLoad: err,
      });
    });
};
