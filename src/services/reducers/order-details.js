import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  ORDER_RESET,
} from "../actions/order-details";

const initialState = {
  isLoading: false,
  hasError: false,
  data: null,
};

export const orderDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: action.orderDataLoad,
      };
    }
    case CREATE_ORDER_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    }
    case ORDER_RESET: {
      return {
        ...state,
        data: null,
      };
    }
    default: {
      return state;
    }
  }
};
