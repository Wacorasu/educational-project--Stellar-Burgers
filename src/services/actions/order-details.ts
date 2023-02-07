import { getOrder } from "../../utils/burger-api";
import { AppDispatch, AppThunk } from "../types";
import { TIngredientConstructor } from "../types/constructor";
import { TOrderInfo } from "../types/order-detail";

import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  ORDER_RESET,
} from "../types/constants";

type TCreateOrderRequestAction = {
  readonly type: typeof CREATE_ORDER_REQUEST;
};

type TCreateOrderSuccessAction = {
  readonly type: typeof CREATE_ORDER_SUCCESS;
  payload: TOrderInfo;
};

type TCreateOrderFailedAction = {
  readonly type: typeof CREATE_ORDER_FAILED;
};

type TOrderResetAction = {
  readonly type: typeof ORDER_RESET;
};

export type TOrderActions =
  | TCreateOrderRequestAction
  | TCreateOrderSuccessAction
  | TCreateOrderFailedAction
  | TOrderResetAction;

export const createOrderRequest = (): TCreateOrderRequestAction => ({
  type: CREATE_ORDER_REQUEST,
});

export const createOrderSuccess = (
  data: TOrderInfo
): TCreateOrderSuccessAction => ({
  type: CREATE_ORDER_SUCCESS,
  payload: data,
});

export const createOrderFailed = (): TCreateOrderFailedAction => ({
  type: CREATE_ORDER_FAILED,
});

export const orderReset = (): TOrderResetAction => ({
  type: ORDER_RESET,
});

export const createOrder: AppThunk =
  (ingredients: Array<TIngredientConstructor>) => (dispatch: AppDispatch) => {
    dispatch(createOrderRequest());
    return getOrder(ingredients)
      .then((res) => {
        dispatch(createOrderSuccess(res));
      })
      .catch(() => {
        dispatch(createOrderFailed());
      });
  };
