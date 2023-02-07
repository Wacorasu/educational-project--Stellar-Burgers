import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware/socket-middleware";
import {
  WS_CONNECT,
  WS_DISCONNECT,
  WS_ORDERS_MESSAGE,
} from "./types/constants";


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const wsStaticActions = {
  wsConnect: WS_CONNECT,
  wsDisconnect: WS_DISCONNECT,
  onMessage: WS_ORDERS_MESSAGE,
};

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  applyMiddleware(socketMiddleware(wsStaticActions))
);

export const store = createStore(rootReducer, enhancer);
