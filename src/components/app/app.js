import app from "./app.module.css";
import React, { useEffect } from "react";
import { BURGER_API_URL, checkResponse } from "../../utils/api.js";
import AppHeader from "../app-header/app-header.js";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.js";
import BurgerConstructor from "../burger-constructor/burger-constructor.js";
import {BurgerIngredientsContext} from '../../context/burger-ingredients-context';

export default function App() {
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: null,
  });

  useEffect(() => {
    const getData = () => {
      setState({ ...state, isLoading: true });
      fetch(`${BURGER_API_URL}/ingredients`)
        .then(checkResponse)
        .then((resData) => {
          setState((prevState)=>({ ...prevState, data: resData.data, isLoading: false }));
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
            <>
              <BurgerIngredients/>
              <BurgerConstructor/>
            </>
          )}
        </article>
        </BurgerIngredientsContext.Provider>
      </main>
    </div>
  );
}
