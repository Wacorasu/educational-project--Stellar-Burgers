import burgerIngredients from "./burger-ingredients.module.css";
import React, { useEffect } from "react";
import { BurgerIngredient } from "../burger-ingredient/burger-ingredient.js";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { tabSwitchInterval } from "../../utils/constants";
import { useLocation, useHistory } from "react-router-dom";

export default function BurgerIngredients() {
  const [current, setCurrent] = React.useState("bun");
  const [currentTab, setCurrentTab] = React.useState("bun");

  const data = useSelector((store) => store.allIngredients.data);
  let location = useLocation();
  const history = useHistory();

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
        navRef.current?.getBoundingClientRect().bottom + tabSwitchInterval &&
      mainRef.current?.getBoundingClientRect().top >
        navRef.current?.getBoundingClientRect().bottom
    ) {
      setCurrentTab("main");
    } else if (
      bunRef.current?.getBoundingClientRect().top <
        navRef.current?.getBoundingClientRect().bottom + tabSwitchInterval &&
      bunRef.current?.getBoundingClientRect().top >
        navRef.current?.getBoundingClientRect().bottom
    ) {
      setCurrentTab("bun");
    } else if (
      sauceRef.current?.getBoundingClientRect().top <
        navRef.current?.getBoundingClientRect().bottom + tabSwitchInterval &&
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
    history.push({
      pathname: `/ingredients/${e.currentTarget.id}`,
      state: { background: location,
      modalOpened: true },
    });
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
            {buns.map((item) => {
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
                  key={item._id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
