import orderIngredientCard from "./order-ingredient-card.module.css";
import React, { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderIngredientCard: FC<{
  data: { qty?: number; name?: string; price?: number; image?: string };
}> = ({ data }) => {
  const { qty, name, price, image } = data;

  return !data ? (
    <h2 className="text text_type_main-large">Loading...</h2>
  ) : (
    <div className={`${orderIngredientCard.cardContainer} `}>
      <img className={`${orderIngredientCard.image}`} src={image} alt={name} />
      <h2 className={`${orderIngredientCard.text} text text_type_main-default`}>
        {name}
      </h2>
      <div className={`${orderIngredientCard.priceContainer}`}>
        <p
          className={`${orderIngredientCard.price} text text_type_digits-default"`}
        >{`${qty} x ${price}`}</p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};
