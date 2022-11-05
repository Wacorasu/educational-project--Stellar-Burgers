import { createContext } from "react";

const BurgerConstructorContext = createContext({
  bun: null,
  ingredients: [],
});

const BurgerIngredientsContext = createContext([]);

export { BurgerConstructorContext, BurgerIngredientsContext };
