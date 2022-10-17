import burgerIngredient from "./burgerIngredient.module.css";
import React from "react";
import PropTypes from "prop-types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { ingredientPropType } from "../../utils/prop-types.js";

export default function BurgerIngredient({
  data,
  openDetailIngridients,
  count,
}) {
  return (
    <div
      className={`${burgerIngredient.burgerIngredient}`}
      id={data._id}
      onClick={openDetailIngridients}
    >
      {count>0  && <Counter count={count} size="default" />}
      <img
        className={`${burgerIngredient.image}`}
        src={data.image}
        alt={data.name}
      />
      <div className={`${burgerIngredient.priceBlock} `}>
        <p className="text text_type_main-medium mr-2">20</p>
        <CurrencyIcon type="primary" />
      </div>
      <h3
        className={`${burgerIngredient.titleItem} text text_type_main-default`}
      >
        {data.name}
      </h3>
    </div>
  );
}

BurgerIngredient.propTypes = {
  data: ingredientPropType.isRequired,
  openDetailIngridients: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};
