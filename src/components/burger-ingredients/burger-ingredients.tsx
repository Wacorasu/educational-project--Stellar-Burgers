import burgerIngredients from "./burger-ingredients.module.css";
import React, { useEffect, FC } from "react";
import { BurgerIngredient } from "../burger-ingredient/burger-ingredient";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../services/hooks";
import { tabSwitchInterval } from "../../services/types/constants";
import { useLocation, useHistory } from "react-router-dom";
import { TTabSwitch } from "../../services/types/constructor";
import { TIngredient } from "../../services/types/data";

export const BurgerIngredients : FC = () => {
  const [current, setCurrent] = React.useState<TTabSwitch>("bun");
  const [currentTab, setCurrentTab] = React.useState<TTabSwitch>("bun");

  const data = useSelector((store) => store.allIngredients.data);
  let location = useLocation();
  const history = useHistory();

  const bunRef = React.useRef<HTMLHeadingElement>(null);
  const mainRef = React.useRef<HTMLHeadingElement>(null);
  const sauceRef = React.useRef<HTMLHeadingElement>(null);
  const navRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    switch (current) {
      case "bun":
        bunRef.current && bunRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "main":
        mainRef.current &&
          mainRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "sauce":
        sauceRef.current &&
          sauceRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      //no default
    }
  }, [current]);

  const handlerScroll = (e: React.MouseEvent<HTMLInputElement>) => {
    if (
      mainRef.current &&
      navRef.current &&
      mainRef.current?.getBoundingClientRect().top <
        navRef.current?.getBoundingClientRect().bottom + tabSwitchInterval &&
      mainRef.current?.getBoundingClientRect().top >
        navRef.current?.getBoundingClientRect().bottom
    ) {
      setCurrentTab("main");
    } else if (
      bunRef.current &&
      navRef.current &&
      bunRef.current?.getBoundingClientRect().top <
        navRef.current?.getBoundingClientRect().bottom + tabSwitchInterval &&
      bunRef.current?.getBoundingClientRect().top >
        navRef.current?.getBoundingClientRect().bottom
    ) {
      setCurrentTab("bun");
    } else if (
      sauceRef.current &&
      navRef.current &&
      sauceRef.current?.getBoundingClientRect().top <
        navRef.current?.getBoundingClientRect().bottom + tabSwitchInterval &&
      sauceRef.current?.getBoundingClientRect().top >
        navRef.current?.getBoundingClientRect().bottom
    ) {
      setCurrentTab("sauce");
    }
  };

  const ingredientsCategory = React.useMemo(() => {
    return (
      data &&
      data?.reduce(
        (
          acc: {
            buns: Array<TIngredient>;
            mains: Array<TIngredient>;
            sauces: Array<TIngredient>;
          },
          ingredient
        ) => {
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
      )
    );
  }, [data]);

  function openDetailIngredients(e: React.MouseEvent<HTMLInputElement>) {
    history.push({
      pathname: `/ingredients/${e.currentTarget.id}`,
      state: { background: location, modalOpened: true },
    });
  }

  return (
    <section className={`${burgerIngredients.container}`}>
      <nav ref={navRef}>
        <ul className={burgerIngredients.menuList}>
          <li>
            <Tab
              value="bun"
              active={currentTab === "bun"}
              onClick={() => setCurrent("bun")}
            >
              <p className="text text_type_main-default">Булки</p>
            </Tab>
          </li>
          <li>
            <Tab
              value="sauce"
              active={currentTab === "sauce"}
              onClick={() => setCurrent("sauce")}
            >
              <p className="text text_type_main-default">Соусы</p>
            </Tab>
          </li>
          <li>
            <Tab
              value="main"
              active={currentTab === "main"}
              onClick={() => setCurrent("main")}
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
            {ingredientsCategory &&
              ingredientsCategory.buns.map((item) => {
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
            {ingredientsCategory &&
              ingredientsCategory.sauces.map((item, index) => {
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
            {ingredientsCategory &&
              ingredientsCategory.mains.map((item, index) => {
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
};
