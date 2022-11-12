import app from "./app.module.css";
import React, { useEffect } from "react";
import {checkResponse } from "../../utils/api.js";
import AppHeader from "../app-header/app-header.js";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.js";
import BurgerConstructor from "../burger-constructor/burger-constructor.js";
import { BurgerConstructorContext, BurgerIngredientsContext } from "../../services/burger-context";
import { getServerData} from "../../utils/burger-api";

function reducer(state, action) {
  switch (action.type) {
    case "add":
      if (action.value.type === "bun") {
        return { ...state, bun: action.value };
      } else {
        if (
          state.ingredients &&
          !state.ingredients.some((item) => item._id === action.value._id)
        ) {
          return {
            ...state,
            ingredients: [...state.ingredients, action.value],
          };
        } else return state;
      }
    case "remove":
      return state.filter((ingredient) => ingredient._id !== action.value._id);
    case "reset":
      return {};
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

export default function App() {
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: null,
  });
  const initialState = React.useContext(BurgerConstructorContext);

  const [ingredientsState, ingredientsReducer] = React.useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const getData = () => {
      setState({ ...state, isLoading: true });
      getServerData()
        .then(checkResponse)
        .then((resData) => {
          setState((prevState) => ({
            ...prevState,
            data: resData.data,
            isLoading: false,
          }));
        })
        .catch((e) => setState({ ...state, hasError: true, isLoading: false }));
    };
    getData();
  }, []);

  return (
    <div className={app.main}>
      <AppHeader />
      <main className={`${app.content} pl-5 pr-5 mt-5`}>
        <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
        <BurgerIngredientsContext.Provider value={state.data}>
          <article className={app.constructorContainer}>
            {state.data && (
              <BurgerConstructorContext.Provider
                value={{ ingredientsState, ingredientsReducer }}
              >
                <BurgerIngredients />
                <BurgerConstructor />
              </BurgerConstructorContext.Provider>
            )}
          </article>
        </BurgerIngredientsContext.Provider>
      </main>
    </div>
  );
}
