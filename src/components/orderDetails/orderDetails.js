import orderDetails from "./orderDetails.module.css";
import React from "react";
import  checkIcon  from '../../images/graphics.png'

export default function OrderDetails() {
  return (
    <div className={orderDetails.modalContainer}>
      <h3 className="text text_type_digits-large mb-4">034536</h3>
      <h4 className="text text_type_main-medium mt-4">идентификатор заказа</h4>
      <img className={orderDetails.image} alt='подтверждено' src={checkIcon}/>
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};