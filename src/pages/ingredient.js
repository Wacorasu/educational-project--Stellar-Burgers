import ingredient from "./ingredient.module.css";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NotFound from "./not-found";

export default function Ingredient() {
  const data = useSelector((store) => store.allIngredients?.data) || [];
  const { id } = useParams();

  if (!data.find((item) => item._id === id) && data.length>0) {
    return <NotFound />;
  }

  if (data.length===0) {
    return "";
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
    <section className={ingredient.page}>
      <div className={ingredient.pageContainer}>
        <h2
          className={`${ingredient.pageTitle} text text_type_main-large pt-25`}
        >
          Детали ингредиента
        </h2>
        <img
          className={`${ingredient.pageImage} mb-4`}
          src={image}
          alt={name}
        />
        <h3 className={`${ingredient.title} text text_type_main-medium`}>
          {name}
        </h3>
        <div className={ingredient.pageIngredientsInfoContainers}>
          <div className={ingredient.pageIngredientsInfoContainer}>
            <p className="text text_type_main-small text_color_inactive">
              Калории,ккал
            </p>
            <p className="text text_type_main-small text_color_inactive">
              {calories}
            </p>
          </div>
          <div className={ingredient.pageIngredientsInfoContainer}>
            <p className="text text_type_main-small text_color_inactive">
              Белки, г
            </p>
            <p className="text text_type_main-small text_color_inactive">
              {proteins}
            </p>
          </div>
          <div className={ingredient.pageIngredientsInfoContainer}>
            <p className="text text_type_main-small text_color_inactive">
              Жиры, г
            </p>
            <p className="text text_type_main-small text_color_inactive">
              {fat}
            </p>
          </div>
          <div className={ingredient.pageIngredientsInfoContainer}>
            <p className="text text_type_main-small text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text_type_main-small text_color_inactive">
              {carbohydrates}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
