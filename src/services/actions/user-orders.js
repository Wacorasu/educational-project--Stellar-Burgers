import { getServerSingleOrder } from "../../utils/orders-api";

export const WS_USER_ORDERS_CONNECT = "WS_USER_ORDERS_CONNECT";
export const WS_USER_ORDERS_DISCONNECT = "WS_USER_ORDERS_DISCONNECT";
export const WS_USER_ORDERS_CONNECTING = "WS_USER_ORDERS_CONNECTING";
export const WS_USER_ORDERS_OPEN = "WS_USER_ORDERS_OPEN";
export const WS_USER_ORDERS_CLOSE = "WS_USER_ORDERS_CLOSE";
export const WS_USER_ORDERS_MESSAGE = "WS_USER_ORDERS_MESSAGE";
export const WS_USER_ORDERS_ERROR = "WS_USER_ORDERS_ERROR";
export const SINGLE_ORDER_REQUEST= 'SINGLE_ORDER_REQUEST';
export const SINGLE_ORDER_REQUEST_SUCCESS= 'SINGLE_ORDER_REQUEST_SUCCESS';
export const SINGLE_ORDER_REQUEST_FAILED= 'SINGLE_ORDER_REQUEST_FAILED';

export const wsConnect = (url) => {
  return {
    type: WS_USER_ORDERS_CONNECT,
    payload: url,
  };
};

export const getSingleOrder = (order) => (dispatch) => {
  dispatch({
    type: SINGLE_ORDER_REQUEST,
  });
  return getServerSingleOrder(order)
    .then((res) => {
      dispatch({
        type: SINGLE_ORDER_REQUEST_SUCCESS,
        payload: res,
      });
    })
    .catch((res) => {
      res.then(result=>{
        dispatch({
          type: SINGLE_ORDER_REQUEST_FAILED,
          payload: result,
        });
      })
    });
};