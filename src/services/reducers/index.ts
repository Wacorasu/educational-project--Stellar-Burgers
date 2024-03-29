import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./burger-constructor";
import { orderDetailReducer } from "./order-details";
import {
  DATA_REQUEST,
  DATA_REQUEST_SUCCESS,
  DATA_REQUEST_FAILED,
  INCREASE_COUNT,
  DECREASE_COUNT,
  RESET_COUNT,
} from "../types/constants";
import { authDataReducer } from "./auth-data";
import { wsUserOrdersReducer } from "./user-orders";
import { TIngredientsState } from "../types";
import { TIngredientsActions } from "../actions";

const initialState: TIngredientsState = {
  isLoading: false,
  hasError: false,
  data: null,
};

const allIngredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
  switch (action.type) {
    case DATA_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case DATA_REQUEST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    }
    case DATA_REQUEST_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    }
    case INCREASE_COUNT: {
      return {
        ...state,
        data: state.data && [
          ...state.data.map((item) => {
            if (item._id === action.payload._id) {
              return { ...item, count: item.count + 1 };
            } else return item;
          }),
        ],
      };
    }
    case DECREASE_COUNT: {
      return {
        ...state,
        data: state.data && [
          ...state.data.map((item) => {
            if (item._id === action.payload?._id) {
              return { ...item, count: item.count - 1 };
            } else return item;
          }),
        ],
      };
    }
    case RESET_COUNT: {
      return { ...state,
        data: state.data && [...state.data.map(item=>{ return{...item, count:0}})]
       };
    }
    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({
  allIngredients: allIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  orderDetail: orderDetailReducer,
  authData: authDataReducer,
  userOrders: wsUserOrdersReducer,
});
