import burgerIngredients from "./burgerIngredients.module.css";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "../modal/modal.js";
import IngredientDetails from "../ingredientDetails/ingredientDetails.js";
import BurgerIngredient from "../burgerIngredient/burgerIngredient.js";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { ingredientPropType } from "../../utils/prop-types.js";

export default function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState("bun");
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const [ingridientsDetail, setIngridientsDetail] = React.useState([]);

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
  };

  const handleEscKeydown = (e) => {
    e.key === "Escape" && closeAllModals();
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
      default:
        break;
    }
  }, [current]);

  const massiveBun = [];
  const massiveMain = [];
  const massiveSauce = [];
  props.data.forEach((item) => {
    switch (item.type) {
      case "bun":
        massiveBun.push(item);
        break;
      case "main":
        massiveMain.push(item);
        break;
      case "sauce":
        massiveSauce.push(item);
        break;
      default:
        break;
    }
  });

  function openDetailIngridients(e) {
    setIngridientsDetail(
      props.data.find((item) => item._id === e.currentTarget.id)
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
            {massiveBun.map((item, index) => {
              return (
                <BurgerIngredient
                  data={item}
                  openDetailIngridients={openDetailIngridients}
                  count={index === 0 ? 1 : 0}
                  key={item._id}
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
            {massiveSauce.map((item, index) => {
              return (
                <BurgerIngredient
                  data={item}
                  openDetailIngridients={openDetailIngridients}
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
            {massiveMain.map((item, index) => {
              return (
                <BurgerIngredient
                  data={item}
                  openDetailIngridients={openDetailIngridients}
                  count={index === 4 ? 1 : 0}
                  key={item._id}
                />
              );
            })}
          </div>
        </div>
      </div>
      {isOrderDetailsOpened && (
        <Modal
          title="Детали ингредиента"
          onOverlayClick={closeAllModals}
          onEscKeydown={handleEscKeydown}
        >
          <IngredientDetails data={ingridientsDetail} />
        </Modal>
      )}
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired),
};
