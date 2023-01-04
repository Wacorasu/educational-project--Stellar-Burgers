import orderDescriptionPage from "./order-description-page.module.css";
import React, { useEffect } from "react";
import OrderDescription from "../order-description/order-description";
import { useDispatch, useSelector } from "react-redux";
import { getSingleOrder } from "../../services/actions/user-orders";
import { useParams } from "react-router-dom";
import Spinner from "../spinner/spinner";

export default function OrderDescriptionPage() {
  const allIngredients = useSelector((store) => store.allIngredients.data);
  const data = useSelector((store) => store.userOrders.singleOrder);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleOrder(id));
    // eslint-disable-next-line
  }, []);
  return (data.length > 0 && allIngredients?.length>0) ? (
    <div className={`${orderDescriptionPage.orderContainer}`}>
      <OrderDescription />
    </div>
  ) : (
    <Spinner />
  );
}
