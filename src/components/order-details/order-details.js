import orderDetails from "./order-details.module.css";
import React from "react";
import checkIcon from "../../images/graphics.png";
import PropTypes from "prop-types";

export default function OrderDetails({ orderInfo }) {
  return (
    <div className={orderDetails.modalContainer}>
      <h3 className="text text_type_digits-large mb-4">
        {orderInfo.order.number}
      </h3>
      <h4 className="text text_type_main-medium mt-4">идентификатор заказа</h4>
      <img className={orderDetails.image} alt="подтверждено" src={checkIcon} />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

OrderDetails.propTypes = {
  orderInfo: PropTypes.shape({
    order: PropTypes.shape({
      number: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
