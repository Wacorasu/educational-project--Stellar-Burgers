import orderDescriptionPage from "./order-description-page.module.css";
import React, { useEffect, FC } from "react";
import { OrderDescription } from "../order-description/order-description";
import { useDispatch, useSelector } from "../../services/hooks";
import { getSingleOrder } from "../../services/actions/user-orders";
import { useParams } from "react-router-dom";
import Spinner from "../spinner/spinner";

export const OrderDescriptionPage: FC = () => {
  const allIngredients = useSelector((store) => store.allIngredients.data);
  const data = useSelector((store) => store.userOrders.singleOrder);
  const { id }: { id: string } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleOrder(id));
    // eslint-disable-next-line
  }, []);

  return data && allIngredients ? (
    <div className={`${orderDescriptionPage.orderContainer}`}>
      <OrderDescription />
    </div>
  ) : (
    <Spinner />
  );
};
