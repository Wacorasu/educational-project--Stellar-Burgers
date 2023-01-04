import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/app.js";
import reportWebVitals from "./reportWebVitals";
import { compose, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./services/reducers";
import thunk from "redux-thunk";
import { BrowserRouter as Router } from "react-router-dom";
import { socketMiddleware } from "./services/middleware/socket-middleware";
import {
  WS_USER_ORDERS_CLOSE,
  WS_USER_ORDERS_CONNECT,
  WS_USER_ORDERS_CONNECTING,
  WS_USER_ORDERS_DISCONNECT,
  WS_USER_ORDERS_ERROR,
  WS_USER_ORDERS_MESSAGE,
  WS_USER_ORDERS_OPEN,
} from './services/actions/user-orders';

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const wsActions = {
  wsConnect:WS_USER_ORDERS_CONNECT,
  wsDisconnect:WS_USER_ORDERS_DISCONNECT,
  wsConnecting:WS_USER_ORDERS_CONNECTING,
  onOpen: WS_USER_ORDERS_OPEN,
  onClose: WS_USER_ORDERS_CLOSE,
  onError: WS_USER_ORDERS_ERROR,
  onMessage: WS_USER_ORDERS_MESSAGE,
};

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  applyMiddleware(socketMiddleware(wsActions))
);

const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
