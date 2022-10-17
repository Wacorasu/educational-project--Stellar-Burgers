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

export default function BurgerConstructor(props) {
  const massiveBun = [];
  props.data.forEach((item) => {
    item.type === "bun" && massiveBun.push(item);
  });

  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
  };

  const handleEscKeydown = (e) => {
    e.key === "Escape" && closeAllModals();
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
              text={massiveBun[0].name}
              price={massiveBun[0].price}
              thumbnail={massiveBun[0].image}
            />
          </li>
          <li className={`${burgerConstructor.constructorBetweenBuns} pr-2`}>
            <ul className={`${burgerConstructor.constructorBetweenBunsList}`}>
              {props.data.map((item) => {
                if (item.type === "main" || item.type === "sauce") {
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
                        key={item._id}
                      />
                    </li>
                  );
                }
                return "";
              })}
            </ul>
          </li>
          <li className={`${burgerConstructor.constructorBun} pr-4`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={massiveBun[1].name}
              price={massiveBun[1].price}
              thumbnail={massiveBun[1].image}
            />
          </li>
        </ul>
      </div>
      <div className={`${burgerConstructor.orderContainer} pt-5 pr-4`}>
        <div className={`${burgerConstructor.totalPriceBlock} `}>
          <p className="text text_type_main-large mr-2">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={openDetailOrder} htmlType='button'>
          <p className="text text_type_main-small">Оформить заказ</p>
        </Button>
      </div>
      {isOrderDetailsOpened && (
        <Modal
          title=""
          onOverlayClick={closeAllModals}
          onEscKeydown={handleEscKeydown}
        >
          <OrderDetails/>
        </Modal>
      )}
    </section>
  );
}

burgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired),
};
