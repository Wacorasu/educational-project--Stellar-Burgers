import orderHistory from "./order-history.module.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/hooks";
import { wsConnect, wsDisconnect } from "../../services/actions/user-orders";
import { getCookie } from "../../utils/cookie-api";
import { OrderCard } from "../order-card/order-card";
import { useHistory, useLocation } from "react-router-dom";
import Spinner from "../spinner/spinner";
import { TOnlyOrderInfo } from "../../services/types/order-detail";
import {
  WS_USER_ORDERS_CLOSE,
  WS_USER_ORDERS_CONNECTING,
  WS_USER_ORDERS_ERROR,
  WS_USER_ORDERS_OPEN,
} from "../../services/types/constants";

export const OrderHistory = () => {
  const data: Array<TOnlyOrderInfo> = useSelector(
    (store) => store.userOrders.userOrdersData
  );
  const status: string = useSelector(
    (store) => store.userOrders.statusUserOrders
  );
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
        `${process.env.REACT_APP_BURGER_API_URL_WS}/orders?token=${getCookie("accessToken")}`,
        wsActions
      )
    );
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => {
      if (status === "connect") {
        dispatch(wsDisconnect());
      }
    };
    // eslint-disable-next-line
  }, [status]);

  function openOrderDetail(e: React.MouseEvent<HTMLInputElement>): void {
    history.push({
      pathname: `/profile/orders/${e.currentTarget.id}`,
      state: { background: location, modalOpened: true },
    });
  }

  return !(data?.length > 0) ? (
    <Spinner />
  ) : (
    <ul className={`${orderHistory.ordersContainer} `}>
      {Array.from(data)
        .reverse()
        .map((item, index) => {
          return (
            <li key={index}>
              <OrderCard data={item} onClick={openOrderDetail} hasStatus />
            </li>
          );
        })}
    </ul>
  );
};
