import ingredientDetails from "./ingredientDetails.module.css";
import React from "react";
import {ingredientPropType} from '../../utils/prop-types.js'

export default function IngredientDetails({ data }) {
  return (
    <div className={ingredientDetails.modalContainer}>
      <img
        className={`${ingredientDetails.modalImage} mb-4`}
        src={data.image}
        alt={data.name}
      />
      <h3 className={`${ingredientDetails.title} text text_type_main-medium`}>{data.name}</h3>
      <div className={ingredientDetails.modalIngridientsInfoContainers}>
        <div className={ingredientDetails.modalIngridientsInfoContainer}>
          <p className="text text_type_main-small text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_main-small text_color_inactive">
            {data.calories}
          </p>
        </div>
        <div className={ingredientDetails.modalIngridientsInfoContainer}>
          <p className="text text_type_main-small text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_main-small text_color_inactive">
            {data.proteins}
          </p>
        </div>
        <div className={ingredientDetails.modalIngridientsInfoContainer}>
          <p className="text text_type_main-small text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_main-small text_color_inactive">
            {data.fat}
          </p>
        </div>
        <div className={ingredientDetails.modalIngridientsInfoContainer}>
          <p className="text text_type_main-small text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_main-small text_color_inactive">
            {data.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

IngredientDetails.propTypes={
    data: ingredientPropType.isRequired
  };
