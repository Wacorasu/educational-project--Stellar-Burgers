import burgerConstructor from "./burger-constructor.module.css";
import React from "react";
import OrderDetails from "../order-details/order-details.js";
import Modal from "../modal/modal.js";
import {
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { BurgerIngredientsContext } from "../../context/burger-ingredients-context";
import { BurgerConstructorContext } from "../../context/burger-constructor-context";
import { BURGER_API_URL, checkResponse } from "../../utils/api.js";

function reducer(state, action) {
  switch (action.type) {
    case "add":
      if (!state.some((item) => item._id === action.value._id)) {
        return [...state, action.value];
      } else return [...state];
    case "remove":
      return [
        state.filter((ingredient) => ingredient._id !== action.value._id),
      ];
    case "reset":
      return [];
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

export default function BurgerConstructor() {
  const data = React.useContext(BurgerIngredientsContext);
  const initialState = React.useContext(BurgerConstructorContext);

  const [ingredientsState, ingredientsReducer] = React.useReducer(
    reducer,
    initialState
  );

  const [orderInfo, setOrderInfo] = React.useState({
    isLoading: false,
    hasError: false,
    data: null,
  });

  const bun = React.useMemo(
    () =>
      data.find((ingredient) => {
        if (ingredient.type === "bun") {
          ingredientsReducer({ type: "add", value: ingredient });
          return ingredient;
        }
        return "";
      }),
    [data]
  );

  const ingredients = React.useMemo(
    () =>
      data.filter((ingredient) => {
        if (ingredient.type !== "bun") {
          ingredientsReducer({ type: "add", value: ingredient });
          return ingredient;
        }
        return "";
      }),
    [data]
  );

  const sendOrder = () => {
    setOrderInfo({ ...orderInfo, isLoading: true });
    fetch(`${BURGER_API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ingredients: ingredientsState.map((item) => item._id),
      }),
    })
      .then(checkResponse)
      .then((resData) => {
        setOrderInfo({ ...orderInfo, data: resData, isLoading: false });
      })
      .catch((e) =>
        setOrderInfo({ ...orderInfo, hasError: true, isLoading: false })
      );
    openDetailOrder();
  };

  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);

  const closeDetailOrder = () => {
    setIsOrderDetailsOpened(false);
  };

  function openDetailOrder() {
    setIsOrderDetailsOpened(true);
  }

  const getTotalPrice = React.useMemo(
    () =>
      ingredientsState.reduce((preItem, item) => {
        return preItem + item.price;
      }, 0),
    [ingredientsState]
  );

  return (
    <BurgerConstructorContext.Provider
      value={{ ingredientsState, ingredientsReducer }}
    >
      <section className={`${burgerConstructor.container} pt-5 pl-4 pr-4`}>
        <div className={`${burgerConstructor.constructorContainer} pb-5`}>
          <ul className={burgerConstructor.constructor}>
            <li className={`${burgerConstructor.constructorBun} pr-4`}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (вверх)`}
                price={bun.price}
                thumbnail={bun.image}
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
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            </li>
          </ul>
        </div>
        <div className={`${burgerConstructor.orderContainer} pt-5 pr-4`}>
          <div className={`${burgerConstructor.totalPriceBlock} `}>
            <p className="text text_type_main-large mr-2">{getTotalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            type="primary"
            size="large"
            onClick={sendOrder}
            htmlType="button"
          >
            <p className="text text_type_main-small">Оформить заказ</p>
          </Button>
        </div>
        {(isOrderDetailsOpened && orderInfo.data?.success) && (
          <Modal title="" closeAllModals={closeDetailOrder}>
            <OrderDetails orderInfo={orderInfo.data} />
          </Modal>
        )}
      </section>
    </BurgerConstructorContext.Provider>
  );
}
