import ingredient from "./ingredient.module.css";
import React, {FC} from "react";
import {IngredientDetails} from "../components/ingredient-details/ingredient-details";

export const Ingredient: FC = () => {
  return (
    <section className={ingredient.page}>
      <h2 className="text text_type_main-medium mt-20">Детали ингредиента</h2>
      <IngredientDetails />
    </section>
  );
};
