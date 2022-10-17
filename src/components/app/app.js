import app from "./app.module.css";
import React, { useEffect } from "react";
import { BURGER_API_URL, checkResponse } from "../../utils/api.js";
import AppHeader from "../appHeader/appHeader.js";
import BurgerIngredients from "../burgerIngredients/burgerIngredients.js";
import BurgerConstructor from "../burgerConstructor/burgerConstructor.js";

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
        .then((res) => checkResponse(res))
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
        <article className={app.constructorContainer}>
          {state.data && (
            <>
              <BurgerIngredients data={state.data} />
              <BurgerConstructor data={state.data} />
            </>
          )}
        </article>
      </main>
    </div>
  );
}
