import burgerIngredient from "./burger-ingredient.module.css";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag } from "react-dnd";


import { ingredientPropType } from "../../utils/prop-types.js";



export const BurgerIngredient= React.memo(function BurgerIngredient({ data, onClick, count }) {

  
      const [{ opacity }, ref] = useDrag({
        type: data.type,
        item: data,
        collect: monitor => ({
          opacity: monitor.isDragging() ? 0.1 : 1
        })
      });


      return (
        <div
          ref={ref}
          className={`${burgerIngredient.burgerIngredient}`}
          id={data._id}
          onClick={onClick}
          style={{opacity}}
        >
          {count > 0 && <Counter count={count} size="default" />}
          <img
            className={`${burgerIngredient.image}`}
            src={data.image}
            alt={data.name}
          />
          <div className={`${burgerIngredient.priceBlock} `}>
            <p className="text text_type_main-medium mr-2">{data.price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <h3
            className={`${burgerIngredient.titleItem} text text_type_main-default`}
          >
            {data.name}
          </h3>
        </div>
      );
});

BurgerIngredient.propTypes = {
  data: ingredientPropType.isRequired,
  onClick: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};
