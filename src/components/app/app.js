import app from "./app.module.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppHeader from "../app-header/app-header.js";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.js";
import BurgerConstructor from "../burger-constructor/burger-constructor.js";
import { getData } from "../../services/actions/index";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function App() {
  const data = useSelector((store) => store.allIngredients.data);
  const dispatch = useDispatch();

  /* eslint-disable */ //TODO необходим запрос данным при монтировании компонента
  useEffect(() => {
    dispatch(getData());
  }, []);
  /* eslint-enable */
  return (
    <div className={app.main}>
      <AppHeader />
      <main className={`${app.content} pl-5 pr-5 mt-5`}>
        <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>

        <article className={app.constructorContainer}>
          <DndProvider backend={HTML5Backend}>
            {data && (
              <>
                <BurgerIngredients />
                <BurgerConstructor />
              </>
            )}{" "}
          </DndProvider>
        </article>
      </main>
    </div>
  );
}
