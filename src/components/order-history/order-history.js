import orderHistory from "./order-history.module.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  wsConnect,
  WS_DISCONNECT,
  WS_USER_ORDERS_CONNECTING,
  WS_USER_ORDERS_OPEN,
  WS_USER_ORDERS_CLOSE,
  WS_USER_ORDERS_ERROR,
} from "../../services/actions/user-orders";
import { BURGER_API_URL_WS } from "../../utils/api";
import { getCookie } from "../../utils/cookie-api";
import OrderCard from "../order-card/order-card";
import { useHistory, useLocation } from "react-router-dom";
import Spinner from "../spinner/spinner";

export default function OrderHistory() {
  const data = useSelector((store) => store.userOrders.userOrdersData);
  const status = useSelector((store) => store.userOrders.statusUserOrders);
  let location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const wsActions = {
    wsConnecting: WS_USER_ORDERS_CONNECTING,
    onOpen: WS_USER_ORDERS_OPEN,
    onClose: WS_USER_ORDERS_CLOSE,
    onError: WS_USER_ORDERS_ERROR,
  };

  useEffect(() => {
    dispatch(
      wsConnect(
        `${BURGER_API_URL_WS}/orders?token=${getCookie("accessToken")}`,
        wsActions
      )
    );
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => {
      if (status === "connect") {
        dispatch({ type: WS_DISCONNECT });
      }
    };
    // eslint-disable-next-line
  }, [status]);

  function openOrderDetail(e) {
    history.push({
      pathname: `/profile/orders/${e.currentTarget.id}`,
      state: { background: location, modalOpened: true },
    });
  }

  return !data?.length > 0 ? (
    <Spinner />
  ) : (
    <ul className={`${orderHistory.ordersContainer} `}>
      {Array.from(data).reverse().map((item, index) => {
        return (
          <li key={index}>
            <OrderCard data={item} onClick={openOrderDetail} hasStatus />
          </li>
        );
      })}
    </ul>
  );
}
