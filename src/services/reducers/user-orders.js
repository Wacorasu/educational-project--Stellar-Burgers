import {
  WS_USER_ORDERS_CLOSE,
  WS_USER_ORDERS_CONNECTING,
  WS_USER_ORDERS_ERROR,
  WS_USER_ORDERS_MESSAGE,
  WS_USER_ORDERS_OPEN,
  SINGLE_ORDER_REQUEST,
  SINGLE_ORDER_REQUEST_SUCCESS,
  SINGLE_ORDER_REQUEST_FAILED,
} from "../actions/user-orders";

const initialState = {
  isLoadingSingleOrders: false,
  status: "disconnect",
  ordersData: [],
  singleOrder: [],
  total: null,
  totalToday: null,
  error: "",
  errorsSingleOrders: { hasError: false, text: "" },
};

export const wsUserOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_USER_ORDERS_CONNECTING:
      return {
        ...state,
        status: "connecting",
      };

    case WS_USER_ORDERS_OPEN:
      return {
        ...state,
        error: "",
        status: "connect",
      };

    case WS_USER_ORDERS_CLOSE:
      return {
        ...state,
        error: "",
        status: "disconnect",
      };

    case WS_USER_ORDERS_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case WS_USER_ORDERS_MESSAGE:
      return {
        ...state,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        ordersData: action.payload.orders,
      };
    case SINGLE_ORDER_REQUEST: {
      return {
        ...state,
        isLoadingSingleOrders: true,
      };
    }
    case SINGLE_ORDER_REQUEST_SUCCESS: {
      return {
        ...state,
        isLoadingSingleOrders: false,
        singleOrder: action.payload.orders,
      };
    }
    case SINGLE_ORDER_REQUEST_FAILED: {
      return {
        ...state,
        isLoadingSingleOrders: false,
        errorsSingleOrders: { hasError: true, text: action.payload.message },
      };
    }

    default:
      return state;
  }
};
