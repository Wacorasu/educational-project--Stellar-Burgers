import ingredient from "./ingredient.module.css";
import React from "react";
import IngredientDetails from "../components/ingredient-details/ingredient-details";

export default function Ingredient() {

  return (
    <section className={ingredient.page}>
      <h2 className="text text_type_main-medium mt-20">Детали ингредиента</h2>
      <IngredientDetails/>
    </section>
  );
}
