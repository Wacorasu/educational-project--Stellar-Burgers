import burgerIngredients from "./burger-ingredients.module.css";
import React, { useEffect } from "react";
import Modal from "../modal/modal.js";
import IngredientDetails from "../ingredient-details/ingredient-details.js";
import { BurgerIngredient } from "../burger-ingredient/burger-ingredient.js";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import {
  CLOSE_DETAIL_INGREDIENTS,
  OPEN_DETAIL_INGREDIENTS,
} from "../../services/actions/ingredient-details";

export default function BurgerIngredients() {
  const [current, setCurrent] = React.useState("bun");
  const [currentTab, setCurrentTab] = React.useState("bun");
  const isModalDetailsOpened = useSelector(
    (store) => store.ingredientDetail.isOpened
  );
  const ingredientDetail = useSelector(
    (store) => store.ingredientDetail.ingredientDetails
  );
  const dispatch = useDispatch();
  const data = useSelector((store) => store.allIngredients.data);

  const bunRef = React.useRef(null);
  const mainRef = React.useRef(null);
  const sauceRef = React.useRef(null);
  const navRef = React.useRef(null);

  useEffect(() => {
    switch (current) {
      case "bun":
        bunRef && bunRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "main":
        mainRef && mainRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "sauce":
        sauceRef && sauceRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      //no default
    }
  }, [current]);

  const handlerScroll = (e) => {
    if (
      mainRef.current?.getBoundingClientRect().top <
        navRef.current?.getBoundingClientRect().bottom + 30 &&
      mainRef.current?.getBoundingClientRect().top >
        navRef.current?.getBoundingClientRect().bottom
    ) {
      setCurrentTab("main");
    } else if (
      bunRef.current?.getBoundingClientRect().top <
        navRef.current?.getBoundingClientRect().bottom + 30 &&
      bunRef.current?.getBoundingClientRect().top >
        navRef.current?.getBoundingClientRect().bottom
    ) {
      setCurrentTab("bun");
    } else if (
      sauceRef.current?.getBoundingClientRect().top <
        navRef.current?.getBoundingClientRect().bottom + 30 &&
      sauceRef.current?.getBoundingClientRect().top >
        navRef.current?.getBoundingClientRect().bottom
    ) {
      setCurrentTab("sauce");
    }
  };

  const { buns, mains, sauces } = React.useMemo(() => {
    return data.reduce(
      (acc, ingredient) => {
        switch (ingredient.type) {
          case "bun":
            return { ...acc, buns: [...acc.buns, ingredient] };
          case "main":
            return { ...acc, mains: [...acc.mains, ingredient] };
          case "sauce":
            return { ...acc, sauces: [...acc.sauces, ingredient] };
          default:
            return { ...acc };
        }
      },
      { buns: [], mains: [], sauces: [] }
    );
  }, [data]);

  function openDetailIngredients(e) {
    dispatch({
      type: OPEN_DETAIL_INGREDIENTS,
      data: data.find((item) => item._id === e.currentTarget.id),
    });
  }
  function closeIngredientModal() {
    dispatch({ type: CLOSE_DETAIL_INGREDIENTS });
  }
  return (
    <section className={`${burgerIngredients.container}`}>
      <nav ref={navRef}>
        <ul className={burgerIngredients.menuList}>
          <li>
            <Tab value="bun" active={currentTab === "bun"} onClick={setCurrent}>
              <p className="text text_type_main-default">Булки</p>
            </Tab>
          </li>
          <li>
            <Tab
              value="sauce"
              active={currentTab === "sauce"}
              onClick={setCurrent}
            >
              <p className="text text_type_main-default">Соусы</p>
            </Tab>
          </li>
          <li>
            <Tab
              value="main"
              active={currentTab === "main"}
              onClick={setCurrent}
            >
              <p className="text text_type_main-default">Начинки</p>
            </Tab>
          </li>
        </ul>
      </nav>
      <div
        className={`${burgerIngredients.categoriesContainer} mt-5`}
        onScroll={handlerScroll}
      >
        <div className={burgerIngredients.categoryContainer}>
          <h2 className="text text_type_main-medium mb-5" ref={bunRef}>
            Булки
          </h2>
          <div
            className={`${burgerIngredients.ingredientsContainer} pt-1 pr-2 pl-4 pb-5`}
          >
            {buns.map((item, index) => {
              return (
                <BurgerIngredient
                  data={item}
                  onClick={openDetailIngredients}
                  count={item.count}
                  key={index}
                />
              );
            })}
          </div>
        </div>
        <div className={burgerIngredients.categoryContainer}>
          <h2 className="text text_type_main-medium" ref={sauceRef}>
            Соусы
          </h2>
          <div
            className={`${burgerIngredients.ingredientsContainer} pt-1 pr-2 pl-4 pb-5`}
          >
            {sauces.map((item, index) => {
              return (
                <BurgerIngredient
                  data={item}
                  onClick={openDetailIngredients}
                  count={item.count}
                  key={item._id}
                />
              );
            })}
          </div>
        </div>
        <div className={burgerIngredients.categoryContainer}>
          <h2 className="text text_type_main-medium" ref={mainRef}>
            Начинки
          </h2>
          <div
            className={`${burgerIngredients.ingredientsContainer} pt-1 pr-2 pl-4 pb-5`}
          >
            {mains.map((item, index) => {
              return (
                <BurgerIngredient
                  data={item}
                  onClick={openDetailIngredients}
                  count={item.count}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </div>
      {isModalDetailsOpened && ingredientDetail && (
        <Modal title="Детали ингредиента" closeAllModals={closeIngredientModal}>
          <IngredientDetails data={ingredientDetail} />
        </Modal>
      )}
    </section>
  );
}
