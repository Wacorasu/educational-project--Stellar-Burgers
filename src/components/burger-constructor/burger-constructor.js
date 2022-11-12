import burgerConstructor from "./burger-constructor.module.css";
import React, { useEffect } from "react";
import OrderDetails from "../order-details/order-details.js";
import Modal from "../modal/modal.js";
import {
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { BurgerConstructorContext, BurgerIngredientsContext } from "../../services/burger-context";
import {checkResponse} from "../../utils/api.js";
import { getOrder} from "../../utils/burger-api";



export default function BurgerConstructor() {
  const data = React.useContext(BurgerIngredientsContext);
  const {ingredientsState, ingredientsReducer} = React.useContext(BurgerConstructorContext);


  const [orderInfo, setOrderInfo] = React.useState({
    isLoading: false,
    hasError: false,
    data: null,
  });

  useEffect(()=>{
    data.forEach(ingredient=>{
      ingredientsReducer({ type: "add", value: ingredient });
    });
  },[data])

  

  const sendOrder = () => {
    setOrderInfo({ ...orderInfo, isLoading: true });
      getOrder([...ingredientsState.ingredients, ingredientsState.bun])
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
      {
        return `${ingredientsState.bun?.price*2 + ingredientsState.ingredients.reduce((preItem, item) => {
        return preItem + item.price;
      }, 0)}`},
    [ingredientsState]
  );

  return (
      <section className={`${burgerConstructor.container} pt-5 pl-4 pr-4`}>
        <div className={`${burgerConstructor.constructorContainer} pb-5`}>
          <ul className={burgerConstructor.constructor}>
            <li className={`${burgerConstructor.constructorBun} pr-4`}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${ingredientsState.bun?.name} (вверх)`}
                price={ingredientsState.bun?.price}
                thumbnail={ingredientsState.bun?.image}
              />
            </li>
            <li className={`${burgerConstructor.constructorBetweenBuns} pr-2`}>
              <ul className={`${burgerConstructor.constructorBetweenBunsList}`}>
                {ingredientsState.ingredients.map((item, index) => {
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
                text={`${ingredientsState.bun?.name} (низ)`}
                price={ingredientsState.bun?.price}
                thumbnail={ingredientsState.bun?.image}
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
        {isOrderDetailsOpened && orderInfo.data?.success && (
          <Modal closeAllModals={closeDetailOrder}>
            <OrderDetails orderInfo={orderInfo.data} />
          </Modal>
        )}
      </section>
  );
}
