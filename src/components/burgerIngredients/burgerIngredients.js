import burgerIngredients from "./burgerIngredients.module.css";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "../modal/modal.js";
import IngredientDetails from "../ingredientDetails/ingredientDetails.js";
import BurgerIngredient from "../burgerIngredient/burgerIngredient.js";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { ingredientPropType } from "../../utils/prop-types.js";

export default function BurgerIngredients({data}) {
  const [current, setCurrent] = React.useState("bun");
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const [ingredientDetail, setIngredientDetail] = React.useState([]);

  const closeIngredientModal = () => {
    setIsOrderDetailsOpened(false);
  };


  const bunRef = React.useRef(null);
  const mainRef = React.useRef(null);
  const sauceRef = React.useRef(null);

  
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



  const {buns,mains,sauces}  = React.useMemo(
    () =>{ return data.reduce(( acc, ingredient )  => {
      switch (ingredient.type) {
        case "bun":
          return {...acc, buns: [...acc.buns, ingredient]};
        case "main":
          return {...acc, mains: [...acc.mains, ingredient]};
        case "sauce":
          return {...acc, sauces: [...acc.sauces, ingredient]};
        default:
          return {...acc};
      }; }, { buns:[], mains: [], sauces: [] });},
    [data]
  );
 
  function openDetailIngredients(e) {
    setIngredientDetail(
      data.find((item) => item._id === e.currentTarget.id)
    );
    setIsOrderDetailsOpened(true);
  }

  return (
    <section className={`${burgerIngredients.container}`}>
      <nav className="mb-5">
        <ul className={burgerIngredients.menuList}>
          <li>
            <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
              <p className="text text_type_main-default">Булки</p>
            </Tab>
          </li>
          <li>
            <Tab
              value="sauce"
              active={current === "sauce"}
              onClick={setCurrent}
            >
              <p className="text text_type_main-default">Соусы</p>
            </Tab>
          </li>
          <li>
            <Tab value="main" active={current === "main"} onClick={setCurrent}>
              <p className="text text_type_main-default">Начинки</p>
            </Tab>
          </li>
        </ul>
      </nav>
      <div className={`${burgerIngredients.categorysContainer} mt-5`}>
        <div className={burgerIngredients.categoryContainer} ref={bunRef}>
          <h2 className="text text_type_main-medium mb-5">Булки</h2>
          <div
            className={`${burgerIngredients.ingredientsContainer} pt-1 pr-2 pl-4 pb-5`}
          >
            {buns.map((item, index) => {
              return (
                <BurgerIngredient
                  data={item}
                  onClick={openDetailIngredients}
                  count={index === 0 ? 1 : 0}
                  key={index}
                />
              );
            })}
          </div>
        </div>
        <div className={burgerIngredients.categoryContainer} ref={sauceRef}>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <div
            className={`${burgerIngredients.ingredientsContainer} pt-1 pr-2 pl-4 pb-5`}
          >
            {sauces.map((item, index) => {
              return (
                <BurgerIngredient
                  data={item}
                  onClick={openDetailIngredients}
                  count={index === 3 ? 1 : 0}
                  key={item._id}
                />
              );
            })}
          </div>
        </div>
        <div className={burgerIngredients.categoryContainer} ref={mainRef}>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <div
            className={`${burgerIngredients.ingredientsContainer} pt-1 pr-2 pl-4 pb-5`}
          >
            {mains.map((item, index) => {
              return (
                <BurgerIngredient
                  data={item}
                  onClick={openDetailIngredients}
                  count={index === 4 ? 1 : 0}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </div>
      {isOrderDetailsOpened && (
        <Modal
          title="Детали ингредиента"
          closeAllModals={closeIngredientModal}
        >
          <IngredientDetails data={ingredientDetail} />
        </Modal>
      )}
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
