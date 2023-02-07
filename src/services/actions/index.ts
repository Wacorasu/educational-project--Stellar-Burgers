import { getServerData } from "../../utils/burger-api";
import { TIngredient, TIngredientServer } from "../types/data";
import { AppDispatch, AppThunk } from "../types/index";

import { DATA_REQUEST, DATA_REQUEST_SUCCESS, DATA_REQUEST_FAILED, DECREASE_COUNT, INCREASE_COUNT, RESET_COUNT } from "../types/constants";
import { TIngredientConstructor } from "../types/constructor";

type TGetDataRequestAction = {
  readonly type: typeof DATA_REQUEST;
};

type TGetDataRequestSuccessAction = {
  readonly type: typeof DATA_REQUEST_SUCCESS;
  payload: Array<TIngredient>
};

type TGetDataRequestFailedAction = {
  readonly type: typeof DATA_REQUEST_FAILED;
};

type TDecreaseCountAction = {
  readonly type: typeof DECREASE_COUNT;
  payload: TIngredientConstructor | undefined 
};

type TIncreaseCountAction = {
  readonly type: typeof INCREASE_COUNT;
  payload: TIngredient
};

type TResetCountAction = {
  readonly type: typeof RESET_COUNT;
};

export type TIngredientsActions =
  | TGetDataRequestAction
  | TGetDataRequestSuccessAction
  | TGetDataRequestFailedAction
  | TDecreaseCountAction
  | TIncreaseCountAction
  | TResetCountAction;

  export const getDataRequest = () : TGetDataRequestAction =>({
    type: DATA_REQUEST
  })

  export const getDataRequestSuccess = (data:Array<TIngredient>) : TGetDataRequestSuccessAction =>({
    type: DATA_REQUEST_SUCCESS,
    payload: data
  })

  export const getDataRequestFailed = () : TGetDataRequestFailedAction =>({
    type: DATA_REQUEST_FAILED
  })

export const decreaseCount = (item:TIngredientConstructor | undefined) : TDecreaseCountAction =>({
  type: DECREASE_COUNT,
  payload: item
})

export const increaseCount = (item: TIngredient) : TIncreaseCountAction =>({
  type: INCREASE_COUNT,
  payload: item
})

export const resetCount = () : TResetCountAction =>({
  type: RESET_COUNT
})

export const getData: AppThunk = () => (dispatch:  AppDispatch) => {
  dispatch(getDataRequest());
  return getServerData()
    .then((res) => {
      dispatch(getDataRequestSuccess(res.data.map((item: TIngredientServer) => {
        return { ...item, count: 0 }})
       ))
      })
    .catch(() => {
      dispatch(getDataRequestFailed());
    });
};
