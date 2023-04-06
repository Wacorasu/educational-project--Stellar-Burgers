import { getServerSingleOrder } from "../../utils/orders-api";
import { AppDispatch, AppThunk } from "../types";
import { TMessageError } from "../types/data";
import type { TOrderInfo } from "../types/order-detail";
import { TOrderInfoWS, TWsActions } from "../types/user-orders";

import {
  WS_CONNECT,
  WS_DISCONNECT,
  WS_USER_ORDERS_CLOSE,
  WS_USER_ORDERS_CONNECTING,
  WS_USER_ORDERS_ERROR,
  WS_USER_ORDERS_OPEN,
  WS_ALL_ORDERS_CLOSE,
  WS_ALL_ORDERS_CONNECTING,
  WS_ALL_ORDERS_ERROR,
  WS_ALL_ORDERS_OPEN,
  WS_ORDERS_MESSAGE,
  SINGLE_ORDER_REQUEST,
  SINGLE_ORDER_REQUEST_SUCCESS,
  SINGLE_ORDER_REQUEST_FAILED,
} from "../types/constants";

type TWsConnectAction = {
  readonly type: typeof WS_CONNECT;
  payload: string;
  wsActions: TWsActions;
};

type TWsDisconnectAction = {
  readonly type: typeof WS_DISCONNECT;
};

export type TWsUserOrdersConnectingAction = {
  readonly type: typeof WS_USER_ORDERS_CONNECTING;
};

export type TWsUserOrdersOpenAction = {
  readonly type: typeof WS_USER_ORDERS_OPEN;
};

export type TWsUserOrdersCloseAction = {
  readonly type: typeof WS_USER_ORDERS_CLOSE;
};

type TWsOrdersMessageAction = {
  readonly type: typeof WS_ORDERS_MESSAGE;
  payload: TOrderInfoWS;
};

export type TWsUserOrdersErrorAction = {
  readonly type: typeof WS_USER_ORDERS_ERROR;
  payload: string;
};

type TSingleOrderRequestAction = {
  readonly type: typeof SINGLE_ORDER_REQUEST;
};

type TSingleOrderSuccessAction = {
  readonly type: typeof SINGLE_ORDER_REQUEST_SUCCESS;
  payload: TOrderInfo;
};

type TSingleOrderFailedAction = {
  readonly type: typeof SINGLE_ORDER_REQUEST_FAILED;
  payload: TMessageError;
};

export type TWsAllOrdersConnectingAction = {
  readonly type: typeof WS_ALL_ORDERS_CONNECTING;
};

export type TWsAllOrdersOpenAction = {
  readonly type: typeof WS_ALL_ORDERS_OPEN;
};

export type TWsAllOrdersCloseAction = {
  readonly type: typeof WS_ALL_ORDERS_CLOSE;
};

export type TWsAllOrdersErrorAction = {
  readonly type: typeof WS_ALL_ORDERS_ERROR;
  payload: string;
};

export type THistoryOrdersActions =
  | TWsConnectAction
  | TWsAllOrdersOpenAction
  | TWsAllOrdersCloseAction
  | TWsAllOrdersConnectingAction
  | TWsAllOrdersErrorAction
  | TWsDisconnectAction
  | TWsOrdersMessageAction
  | TWsUserOrdersOpenAction
  | TWsUserOrdersCloseAction
  | TWsUserOrdersConnectingAction
  | TWsUserOrdersErrorAction
  | TSingleOrderFailedAction
  | TSingleOrderRequestAction
  | TSingleOrderSuccessAction;

export const wsConnect = (
  url: string,
  wsActions: TWsActions<
    typeof WS_USER_ORDERS_CONNECTING| typeof WS_ALL_ORDERS_CONNECTING,
    typeof WS_USER_ORDERS_OPEN| typeof WS_ALL_ORDERS_OPEN,
    typeof WS_USER_ORDERS_CLOSE| typeof WS_ALL_ORDERS_CLOSE,
    typeof WS_USER_ORDERS_ERROR| typeof WS_ALL_ORDERS_ERROR
  >
): TWsConnectAction => {
  return {
    type: WS_CONNECT,
    payload: url,
    wsActions: wsActions,
  };
};

export const wsOrdersMessage = (
  orders: TOrderInfoWS
): TWsOrdersMessageAction => {
  return {
    type: WS_ORDERS_MESSAGE,
    payload: orders,
  };
};

export const wsDisconnect = (): TWsDisconnectAction => {
  return {
    type: WS_DISCONNECT,
  };
};

export const wsUserOrdersConnecting = (): TWsUserOrdersConnectingAction => ({
  type: WS_USER_ORDERS_CONNECTING,
});

export const wsUserOrdersOpen = (): TWsUserOrdersOpenAction => ({
  type: WS_USER_ORDERS_OPEN,
});

export const wsUserOrdersError = (error: string): TWsUserOrdersErrorAction => ({
  type: WS_USER_ORDERS_ERROR,
  payload: error,
});

export const wsUserOrdersClose = (): TWsUserOrdersCloseAction => ({
  type: WS_USER_ORDERS_CLOSE,
});

export const wsAllOrdersConnecting = (): TWsAllOrdersConnectingAction => ({
  type: WS_ALL_ORDERS_CONNECTING,
});

export const wsAllOrdersOpen = (): TWsAllOrdersOpenAction => ({
  type: WS_ALL_ORDERS_OPEN,
});

export const wsAllOrdersError = (error: string): TWsAllOrdersErrorAction => ({
  type: WS_ALL_ORDERS_ERROR,
  payload: error,
});

export const wsAllOrdersClose = (): TWsAllOrdersCloseAction => ({
  type: WS_ALL_ORDERS_CLOSE,
});

export const singleOrderRequest = (): TSingleOrderRequestAction => ({
  type: SINGLE_ORDER_REQUEST,
});

export const singleOrderSuccess = (
  data: TOrderInfo
): TSingleOrderSuccessAction => ({
  type: SINGLE_ORDER_REQUEST_SUCCESS,
  payload: data,
});

export const singleOrderFailed = (
  error: TMessageError
): TSingleOrderFailedAction => ({
  type: SINGLE_ORDER_REQUEST_FAILED,
  payload: error,
});

export const getSingleOrder: AppThunk = (order) => (dispatch: AppDispatch) => {
  dispatch(singleOrderRequest());
  return getServerSingleOrder(order)
    .then((res) => {
      dispatch(singleOrderSuccess(res));
    })
    .catch((res) => {
      res.then((result: TMessageError) => {
        dispatch(singleOrderFailed(result));
      });
    });
};
