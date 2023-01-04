import orderHistory from "./order-history.module.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  wsConnect,
  WS_USER_ORDERS_DISCONNECT,
} from "../../services/actions/user-orders";
import { BURGER_API_URL_WS } from "../../utils/api";
import { getCookie } from "../../utils/cookie-api";
import OrderCard from "../order-card/order-card";
import { useHistory, useLocation } from "react-router-dom";
import Spinner from "../spinner/spinner";

export default function OrderHistory() {
  const data = useSelector((store) => store.userOrders.ordersData);
  const status = useSelector((store) => store.userOrders.status);
  let location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      wsConnect(`${BURGER_API_URL_WS}/orders?token=${getCookie("accessToken")}`)
    );
    return () => {
      if (status === "connect") {
        dispatch({ type: WS_USER_ORDERS_DISCONNECT });
      }
    };
    // eslint-disable-next-line
  }, []);

  function openOrderDetail(e) {
    history.push({
      pathname: `/profile/orders/${e.currentTarget.id}`,
      state: { background: location, modalOpened: true },
    });
  }

  return !data.length>0 ? (
    <Spinner/>
  ) : (
    <ul className={`${orderHistory.ordersContainer} `}>
      {data.reverse().map((item, index) => {
        return (
          <li key={index}>
            <OrderCard data={item} onClick={openOrderDetail} hasStatus />
          </li>
        );
      })}
    </ul>
  );
}
