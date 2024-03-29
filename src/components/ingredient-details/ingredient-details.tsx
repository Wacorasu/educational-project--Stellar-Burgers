import ingredientDetails from "./ingredient-details.module.css";
import React, {FC} from "react";
import { useSelector } from '../../services/hooks';
import { useParams } from "react-router-dom";
import Spinner from "../spinner/spinner";


export const IngredientDetails : FC = () => {

  const data = useSelector((store) => store.allIngredients?.data) || [];
  const { id } : {id:string} = useParams();

  if (data.length===0) {
    return <Spinner/>
  }

  const {
    name = "",
    image = "",
    calories = "",
    proteins = "",
    fat = "",
    carbohydrates = "",
  } = data.find((item) => item._id === id) || {};

  return (
    <div className={ingredientDetails.modalContainer}>
      <img
        className={`${ingredientDetails.modalImage} mb-4`}
        src={image}
        alt={name}
      />
      <h3 className={`${ingredientDetails.title} text text_type_main-medium`}>
        {name}
      </h3>
      <div className={ingredientDetails.modalIngredientsInfoContainers}>
        <div className={ingredientDetails.modalIngredientsInfoContainer}>
          <p className="text text_type_main-small text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_main-small text_color_inactive">
            {calories}
          </p>
        </div>
        <div className={ingredientDetails.modalIngredientsInfoContainer}>
          <p className="text text_type_main-small text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_main-small text_color_inactive">
            {proteins}
          </p>
        </div>
        <div className={ingredientDetails.modalIngredientsInfoContainer}>
          <p className="text text_type_main-small text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_main-small text_color_inactive">{fat}</p>
        </div>
        <div className={ingredientDetails.modalIngredientsInfoContainer}>
          <p className="text text_type_main-small text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_main-small text_color_inactive">
            {carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
}
