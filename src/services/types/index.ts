import { store } from "../store";
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import type { TAuthActions } from "../actions/auth-data";
import type { TConstructorActions } from "../actions/burger-constructor";
import { TIngredientsActions} from "../actions";
import { TIngredient } from "./data";
import { TOrderActions } from "../actions/order-details";
import { THistoryOrdersActions } from "../actions/user-orders";

export type TApplicationActions = TAuthActions | TConstructorActions | TIngredientsActions | TOrderActions| THistoryOrdersActions

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;

export type TIngredientsState = {
  isLoading: boolean;
  hasError: boolean;
  data: Array<TIngredient> | null | undefined
}

export type TResponseBody<TDataKey extends string = "", TDataType = {}> = {
  [key in TDataKey]: TDataType;
} & {
  success: boolean;
  message?: string;
  headers?: Headers;
  accessToken?: string;
  refreshToken?: string;
  name?: string;
  status?:string;
};

export interface CustomBody<T extends any> extends Body {
  json(): Promise<T>;
}

export interface CustomResponse<T> extends CustomBody<T> {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly trailer?: Promise<Headers>;
  readonly type: ResponseType;
  readonly url: string;
  clone(): Response;
}