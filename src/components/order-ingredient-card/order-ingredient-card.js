import orderIngredientCard from "./order-ingredient-card.module.css";
import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

export default function OrderIngredientCard({ data }) {
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
        <CurrencyIcon />
      </div>
    </div>
  );
}

OrderIngredientCard.propTypes = {
  data: PropTypes.shape({
    qty: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
