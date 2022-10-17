import app from "./app.module.css";
import React, { useEffect } from "react";
import { url } from "../../utils/data.js";
import AppHeader from "../appHeader/appHeader.js";
import BurgerIngredients from "../burgerIngredients/burgerIngredients.js";
import BurgerConstructor from "../burgerConstructor/burgerConstructor.js";

export default function App() {
  const [state, setState]= React.useState({
    isLoading: false,
    load:false,
    hasError: false,
    data: null
  });

  const checkResponse = res =>{
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

  useEffect(()=>{
    const getData = async() =>{
      setState({...state, hasError:false, isLoading: true, load:false});
      fetch(url)
      .then(res => checkResponse(res))
      .then(data => {
        setState({...state, data:data.data, isLoading: false, load:true})})
      .catch(e => setState({...state, hasError:true, isLoading: false, load:false}));
    };
    getData();
  }, [])


  return (
    <div className={app.main}>
      <AppHeader />
      <main className={`${app.content} pl-5 pr-5 mt-5`}>
        <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
        <article className={app.constructorContainer}>
          {state.load && <BurgerIngredients data={state.data} />}
          {state.load && <BurgerConstructor data={state.data} />}
        </article>
      </main>
    </div>
  );
}
