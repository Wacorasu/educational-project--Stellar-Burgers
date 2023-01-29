import {
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
} from "../actions/user-orders";

const initialState = {
  isLoadingSingleOrders: false,
  statusUserOrders: "disconnect",
  statusAllOrders: "disconnect",
  userOrdersData: [],
  allOrdersData:[],
  singleOrder: [],
  total: null,
  totalToday: null,
  errorUserOrders: "",
  errorAllOrders: "",
  errorsSingleOrders: { hasError: false, text: "" },
};

export const wsUserOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_USER_ORDERS_CONNECTING:
      return {
        ...state,
        statusUserOrders: "connecting",
      };

    case WS_USER_ORDERS_OPEN:
      return {
        ...state,
        errorUserOrders: "",
        statusUserOrders: "connect",
      };

    case WS_USER_ORDERS_CLOSE:
      return {
        ...state,
        errorUserOrders: "",
        statusUserOrders: "disconnect"
      };

    case WS_USER_ORDERS_ERROR:
      return {
        ...state,
        errorUserOrders: action.payload,
      };
    case WS_ALL_ORDERS_CONNECTING:
      return {
        ...state,
        statusAllOrders: "connecting",
      };

    case WS_ALL_ORDERS_OPEN:
      return {
        ...state,
        errorAllOrders: "",
        statusAllOrders: "connect",
      };

    case WS_ALL_ORDERS_CLOSE:
      return {
        ...state,
        errorAllOrders: "",
        statusAllOrders: "disconnect"
      };

    case WS_ALL_ORDERS_ERROR:
      return {
        ...state,
        errorAllOrders: action.payload,
      };

    case WS_ORDERS_MESSAGE:
      return {
        ...state,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        userOrdersData: state.statusUserOrders==='connect' ? action.payload.orders : initialState.userOrdersData,
        allOrdersData: state.statusAllOrders==='connect' ? action.payload.orders : initialState.allOrdersData,
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
