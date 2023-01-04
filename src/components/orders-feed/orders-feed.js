import ordersFeed from "./orders-feed.module.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  wsConnect,
  WS_USER_ORDERS_DISCONNECT,
} from "../../services/actions/user-orders";
import { BURGER_API_URL_WS } from "../../utils/api";
import OrderCard from "../order-card/order-card";
import { useHistory, useLocation } from "react-router-dom";
import Spinner from "../spinner/spinner";

export default function OrdersFeed() {
  const data = useSelector((store) => store.userOrders);
  const status = useSelector((store) => store.userOrders.status);
  let location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(wsConnect(`${BURGER_API_URL_WS}/orders/all`));
    return () => {
      if (status === "connect") {
        dispatch({ type: WS_USER_ORDERS_DISCONNECT });
      }
    };
    // eslint-disable-next-line
  }, []);

  const { ordersData, total, totalToday } = data;
  const orderInprogress = ordersData.filter(
    (item) => item.status === "pending"
  );
  const orderDone = ordersData.filter((item) => item.status === "done");

  function openOrderDetail(e) {
    history.push({
      pathname: `/feed/${e.currentTarget.id}`,
      state: { background: location, modalOpened: true },
    });
  }

  return !(ordersData.length > 0) ? (
    <Spinner />
  ) : (
    <section className={`${ordersFeed.feedContainer} `}>
      <h2 className="text text_type_main-large mb-5">Лента заказов</h2>
      <div className={`${ordersFeed.contentContainer} `}>
        <ul className={`${ordersFeed.ordersContainer} `}>
          {ordersData.reverse().map((item, index) => {
            return (
              <li key={index}>
                <OrderCard data={item} onClick={openOrderDetail} />
              </li>
            );
          })}
        </ul>
        <div className={`${ordersFeed.ordersInfo} `}>
          <div className={`${ordersFeed.ordersStatus} `}>
            <div className={`${ordersFeed.ordersStatusColumn} `}>
              <h3 className={` text text_type_main-medium mb-6`}>Готовы:</h3>
              <ul className={`${ordersFeed.ordersStatusList}`}>
                {orderDone.reverse().map((item, index) => {
                  return (
                    <li key={index}>
                      {" "}
                      <p
                        className={`${ordersFeed.orderReady} text text_type_digits-default`}
                      >
                        {item.number}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={`${ordersFeed.ordersStatusColumn} `}>
              <h3 className={` text text_type_main-medium mb-6`}>В работе:</h3>
              <ul className={`${ordersFeed.ordersStatusList}`}>
                {orderInprogress.reverse().map((item, index) => {
                  return (
                    <li key={index}>
                      {" "}
                      <p className={`text text_type_digits-default`}>
                        {item.number}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <h2 className="text text_type_main-medium mt-15">
            Выполнено за все время:
          </h2>
          <p className="text text_type_digits-large">{total}</p>
          <h2 className="text text_type_main-medium mt-15">
            Выполнено за сегодня:
          </h2>
          <p className="text text_type_digits-large">{totalToday}</p>
        </div>
      </div>
    </section>
  );
}
