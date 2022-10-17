import burgerConstructor from "./burgerConstructor.module.css";
import React from "react";
import PropTypes from "prop-types";
import OrderDetails from "../orderDetails/orderDetails.js";
import Modal from "../modal/modal.js";
import {
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types.js";

export default function BurgerConstructor({ data }) {
  const buns = React.useMemo(
    () => data.filter((ingredient) => ingredient.type === "bun"),
    [data]
  );

  const ingredients = React.useMemo(
    () => data.filter((ingredient) => ingredient.type !== "bun"),
    [data]
  );

  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);

  const closeDetailOrder = () => {
    setIsOrderDetailsOpened(false);
  };

  function openDetailOrder() {
    setIsOrderDetailsOpened(true);
  }

  return (
    <section className={`${burgerConstructor.container} pt-5 pl-4 pr-4`}>
      <div className={`${burgerConstructor.constructorContainer} pb-5`}>
        <ul className={burgerConstructor.constructor}>
          <li className={`${burgerConstructor.constructorBun} pr-4`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${buns[0].name} (вверх)`}
              price={buns[0].price}
              thumbnail={buns[0].image}
            />
          </li>
          <li className={`${burgerConstructor.constructorBetweenBuns} pr-2`}>
            <ul className={`${burgerConstructor.constructorBetweenBunsList}`}>
              {ingredients.map((item, index) => {
                return (
                  <li
                    className={burgerConstructor.constructorIngredients}
                    key={item._id}
                  >
                    <DragIcon type="secondary" />
                    <ConstructorElement
                      isLocked={false}
                      text={item.name}
                      price={item.price}
                      thumbnail={item.image}
                      key={index}
                    />
                  </li>
                );
              })}
            </ul>
          </li>
          <li className={`${burgerConstructor.constructorBun} pr-4`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${buns[1].name} (низ)`}
              price={buns[1].price}
              thumbnail={buns[1].image}
            />
          </li>
        </ul>
      </div>
      <div className={`${burgerConstructor.orderContainer} pt-5 pr-4`}>
        <div className={`${burgerConstructor.totalPriceBlock} `}>
          <p className="text text_type_main-large mr-2">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          onClick={openDetailOrder}
          htmlType="button"
        >
          <p className="text text_type_main-small">Оформить заказ</p>
        </Button>
      </div>
      {isOrderDetailsOpened && (
        <Modal title="" closeAllModals={closeDetailOrder}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

burgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
