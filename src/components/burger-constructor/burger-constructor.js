import burgerConstructor from "./burger-constructor.module.css";
import React, {useCallback} from "react";
import OrderDetails from "../order-details/order-details.js";
import Modal from "../modal/modal.js";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { createOrder, ORDER_RESET } from "../../services/actions/order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  addToConstructor,
  CONSTRUCTOR_DELETE,
  CONSTRUCTOR_REORDER
} from "../../services/actions/burger-constructor";
import { INCREASE_COUNT, DECREASE_COUNT } from "../../services/actions/index";
import { useDrop } from "react-dnd";
import {ConstructorIngredients} from '../constructor-ingredients/constructor-ingredients'
import {ConstructorBun} from '../constructor-bun/constructor-bun'

export default function BurgerConstructor() {
  const orderData = useSelector((store) => store.orderDetail.data);
  const constructorIngredients = useSelector(
    (store) => store.burgerConstructor.ingredients
  );
  const constructorBun = useSelector((store) => store.burgerConstructor.bun);
  const dispatch = useDispatch();

  const sendOrder = () => {
    dispatch(createOrder([...constructorIngredients, constructorBun]));
    openDetailOrder();
  };

  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);

  const closeDetailOrder = () => {
    dispatch({ type: ORDER_RESET });
    setIsOrderDetailsOpened(false);
  };

  function openDetailOrder() {
    setIsOrderDetailsOpened(true);
  }


  const [{ isAcceptZone }, dropIngredient] = useDrop({
    accept: ["main", "sauce"],
    collect: (monitor) => ({
      isAcceptZone: monitor.canDrop(),
    }),
    drop:(item) =>{
      dispatch(addToConstructor(item));
      dispatch({ type: INCREASE_COUNT, item: { ...item } });
    },
  });

  const removeIngredient = (id) => {
    const removeItem = constructorIngredients.find((item) => item.id === id);
    dispatch({ type: CONSTRUCTOR_DELETE, value: { ...removeItem } });
    dispatch({ type: DECREASE_COUNT, item: { ...removeItem } });
  };

 
  const moveIngredients = useCallback((dragIndex, hoverIndex) => {
      dispatch({type: CONSTRUCTOR_REORDER,
        hoverIndex:hoverIndex,
        dragIndex:dragIndex
      })
  }, [])

  const getTotalPrice = React.useMemo(() => {
    return`${
        (constructorBun ? constructorBun?.price : 0 )* 2  +
          constructorIngredients?.reduce((preItem, item) => {
            return preItem + item.price;
          }, 0)
        }`

  }, [constructorBun, constructorIngredients]);

  return (
    <section className={`${burgerConstructor.container} pt-5 pl-4 pr-4`}>
      <div className={`${burgerConstructor.constructorContainer} pb-5`}>
        <ul className={burgerConstructor.constructor}>
          <ConstructorBun type={'top'}/>
          <li className={`${burgerConstructor.constructorBetweenBuns} ${isAcceptZone ? burgerConstructor.onHover : ''} pr-2`}>
            <ul
              ref={dropIngredient}
              className={`${burgerConstructor.constructorBetweenBunsList} ` }
              style={{border:'2, solid, blue'}}
            >
              {constructorIngredients.length === 0 && (
                <li
                  className={
                    burgerConstructor.constructorIngredientsPlaceholder
                  }
                >
                  <p
                    className={`${burgerConstructor.constructorIngredientsPlaceholderT} text text_type_main-medium`}
                  >
                    Перетащите сюда ингредиенты
                  </p>
                </li>
              )}
              {constructorIngredients?.map((item, index) => {
                return (
                  <ConstructorIngredients ingredient={item} moveIngredients={moveIngredients} removeIngredient={removeIngredient} key={item.id} index={index}/>
                );
              })}
            </ul>
          </li>
          <ConstructorBun type={'bottom'}/>
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
          disabled={
            !(constructorIngredients.length !== 0 && constructorBun)
              ? true
              : false
          }
        >
          <p className="text text_type_main-small">Оформить заказ</p>
        </Button>
      </div>
      {isOrderDetailsOpened && orderData?.success && (
        <Modal closeAllModals={closeDetailOrder}>
          <OrderDetails orderInfo={constructorBun && orderData} />
        </Modal>
      )}
    </section>
  );
}
