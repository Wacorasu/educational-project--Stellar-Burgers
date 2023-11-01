import ordersFeed from "./orders-feed.module.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/hooks";
import { wsConnect } from "../../services/actions/user-orders";
import {OrderCard} from "../order-card/order-card";
import { useHistory, useLocation } from "react-router-dom";
import Spinner from "../spinner/spinner";
import {  WS_DISCONNECT,
  WS_ALL_ORDERS_CONNECTING,
  WS_ALL_ORDERS_OPEN,
  WS_ALL_ORDERS_CLOSE,
  WS_ALL_ORDERS_ERROR} from '../../services/types/constants'
import { TUserOrdersState } from "../../services/types/user-orders";

export const  OrdersFeed  = () => {
  const data: TUserOrdersState = useSelector((store) => store.userOrders);
  const status: string = useSelector((store) => store.userOrders.statusAllOrders);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const wsActions = {
    wsConnecting: WS_ALL_ORDERS_CONNECTING,
    onOpen: WS_ALL_ORDERS_OPEN,
    onClose: WS_ALL_ORDERS_CLOSE,
    onError: WS_ALL_ORDERS_ERROR,
  };

  useEffect(() => {
    dispatch(wsConnect(`${process.env.REACT_APP_BURGER_API_URL_WS}/orders/all`, wsActions));

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

  const { allOrdersData, total, totalToday } = data;
  const orderInprogress = allOrdersData.filter(
    (item) => item.status === "pending"
  );
  const orderDone = allOrdersData.filter((item) => item.status === "done");

  function openOrderDetail(e:  React.MouseEvent<HTMLInputElement>): void {
    history.push({
      pathname: `/feed/${e.currentTarget.id}`,
      state: { background: location, modalOpened: true },
    });
  }

  return !(allOrdersData?.length > 0) ? (
    <Spinner />
  ) : (
    <section className={`${ordersFeed.feedContainer} `}>
      <h2 className="text text_type_main-large mb-5">Лента заказов</h2>
      <div className={`${ordersFeed.contentContainer} `}>
        <ul className={`${ordersFeed.ordersContainer} `}>
          {allOrdersData.reverse().map((item, index) => {
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
