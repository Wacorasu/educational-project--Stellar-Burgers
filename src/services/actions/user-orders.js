import { getServerSingleOrder } from "../../utils/orders-api";

export const WS_CONNECT = "WS_CONNECT";
export const WS_DISCONNECT = "WS_DISCONNECT";
export const WS_USER_ORDERS_CONNECTING = "WS_USER_ORDERS_CONNECTING";
export const WS_USER_ORDERS_OPEN = "WS_USER_ORDERS_OPEN";
export const WS_USER_ORDERS_CLOSE = "WS_USER_ORDERS_CLOSE";
export const WS_ORDERS_MESSAGE = "WS_ORDERS_MESSAGE";
export const WS_USER_ORDERS_ERROR = "WS_USER_ORDERS_ERROR";
export const SINGLE_ORDER_REQUEST = "SINGLE_ORDER_REQUEST";
export const SINGLE_ORDER_REQUEST_SUCCESS = "SINGLE_ORDER_REQUEST_SUCCESS";
export const SINGLE_ORDER_REQUEST_FAILED = "SINGLE_ORDER_REQUEST_FAILED";
export const WS_ALL_ORDERS_CLOSE = "WS_ALL_ORDERS_CLOSE";
export const WS_ALL_ORDERS_CONNECTING = "WS_ALL_ORDERS_CONNECTING";
export const WS_ALL_ORDERS_ERROR = "WS_ALL_ORDERS_ERROR";
export const WS_ALL_ORDERS_OPEN = "WS_ALL_ORDERS_OPEN";

export const wsConnect = (url, wsActions) => {
  return {
    type: WS_CONNECT,
    payload: url,
    wsActions: wsActions,
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
      res.then((result) => {
        dispatch({
          type: SINGLE_ORDER_REQUEST_FAILED,
          payload: result,
        });
      });
    });
};
