import { combineReducers } from "redux";
import { burgerConstructorReducer } from "./burger-constructor";
import { orderDetailReducer } from "./order-details";
import {
  DATA_REQUEST,
  DATA_REQUEST_SUCCESS,
  DATA_REQUEST_FAILED,
  INCREASE_COUNT,
  DECREASE_COUNT,
} from "../actions/index";
import {authDataReducer} from './auth-data'

const initialState = {
  isLoading: false,
  hasError: false,
  data: null,
};

const allIngredientsReducer = (state = initialState, action) => {
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
        data: action.dataLoad,
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
        data: [
          ...state.data.map((item) => {
            if (item._id === action.item._id) {
              return { ...item, count: item.count + 1 };
            } else return item;
          }),
        ],
      };
    }
    case DECREASE_COUNT: {
      return {
        ...state,
        data: [
          ...state.data.map((item) => {
            if (item._id === action.item._id) {
              return { ...item, count: item.count - 1 };
            } else return item;
          }),
        ],
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
});
