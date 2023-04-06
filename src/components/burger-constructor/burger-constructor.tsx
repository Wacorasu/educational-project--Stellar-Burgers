import burgerConstructor from "./burger-constructor.module.css";
import React, { useCallback, useEffect, FC } from "react";
import OrderDetails from "../order-details/order-details";
import { Modal } from "../modal/modal";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { createOrder, orderReset } from "../../services/actions/order-details";
import { useDispatch, useSelector } from "../../services/hooks";
import {
  addToConstructor,
  deleteFromConstructor,
  reorderConstructor,
  resetConstructor,
} from "../../services/actions/burger-constructor";
import {
  increaseCount,
  decreaseCount,
  resetCount,
} from "../../services/actions/index";
import { useDrop } from "react-dnd";
import { ConstructorIngredients } from "../constructor-ingredients/constructor-ingredients";
import { ConstructorBun } from "../constructor-bun/constructor-bun";
import { useHistory } from "react-router-dom";
import { getRefreshToken } from "../../services/actions/auth-data";
import { TIngredientConstructor } from "../../services/types/constructor";

export const BurgerConstructor: FC = () => {
  const orderData = useSelector((store) => store.orderDetail.data);
  const constructorIngredients = useSelector(
    (store) => store.burgerConstructor.ingredients
  );
  const constructorBun = useSelector((store) => store.burgerConstructor.bun);
  const dispatch = useDispatch();
  const { isAuth } = useSelector((store) => store.authData);
  const history = useHistory();
  const serverErrors = useSelector((store) => store.orderDetail.hasError);
  const { isTokenRefresh } = useSelector((store) => store.authData);

  const sendOrder = (): void => {
    if (isAuth) {
      dispatch(
        createOrder([constructorBun, ...constructorIngredients, constructorBun])
      );
      openDetailOrder();
    } else {
      history.push({ pathname: "/login" });
    }
  };

  useEffect(() => {
    if (serverErrors) {
      dispatch(getRefreshToken());
    }
    // eslint-disable-next-line
  }, [serverErrors]);

  useEffect(() => {
    if (isTokenRefresh && serverErrors) {
      sendOrder();
    }
    // eslint-disable-next-line
  }, [isTokenRefresh]);

  const [isOrderDetailsOpened, setIsOrderDetailsOpened] =
    React.useState<boolean>(false);

  const closeDetailOrder = (): void => {
    setIsOrderDetailsOpened(false);
    dispatch(orderReset());
    dispatch(resetConstructor());
    dispatch(resetCount());
  };

  function openDetailOrder(): void {
    setIsOrderDetailsOpened(true);
  }

  const [{ isAcceptZone }, dropIngredient] = useDrop({
    accept: ["main", "sauce"],
    collect: (monitor) => ({
      isAcceptZone: monitor.canDrop(),
    }),
    drop: (item: TIngredientConstructor) => {
      dispatch(addToConstructor(item));
      dispatch(increaseCount({ ...item }));
    },
  });

  const removeIngredient = (id: string): void => {
    const removeItem = constructorIngredients.find((item) => item.id === id);
    dispatch(deleteFromConstructor(removeItem));
    dispatch(decreaseCount(removeItem));
  };

  const moveIngredients = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch(reorderConstructor(dragIndex, hoverIndex));
    },
    // eslint-disable-next-line
    []
  );

  const getTotalPrice = React.useMemo(() => {
    return `${
      (constructorBun ? constructorBun?.price : 0) * 2 +
      (constructorIngredients
        ? constructorIngredients?.reduce(
            (preItem: number, item: TIngredientConstructor) => {
              return preItem + item.price;
            },
            0
          )
        : 0)
    }`;
  }, [constructorBun, constructorIngredients]);

  return (
    <section className={`${burgerConstructor.container} pt-5 pl-4 pr-4`}>
      <div className={`${burgerConstructor.constructorContainer} pb-5`}>
        <ul className={`${burgerConstructor.constructor}`}>
          <ConstructorBun type={"top"} />
          <li
            className={`${burgerConstructor.constructorBetweenBuns} ${
              isAcceptZone ? burgerConstructor.onHover : ""
            } pr-2`}
          >
            <ul
              ref={dropIngredient}
              className={`${burgerConstructor.constructorBetweenBunsList} `}
            >
              {!(constructorIngredients?.length > 0) && (
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
              {constructorIngredients?.map(
                (item: TIngredientConstructor, index: number) => {
                  return (
                    <ConstructorIngredients
                      ingredient={item}
                      moveIngredients={moveIngredients}
                      removeIngredient={removeIngredient}
                      key={item.id}
                      index={index}
                    />
                  );
                }
              )}
            </ul>
          </li>
          <ConstructorBun type={"bottom"} />
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
          disabled={!(constructorIngredients && constructorBun) ? true : false}
        >
          <p className="text text_type_main-small">Оформить заказ</p>
        </Button>
      </div>
      {isOrderDetailsOpened && (
        <Modal closeAllModals={closeDetailOrder}>
          <OrderDetails orderInfo={constructorBun && orderData} />
        </Modal>
      )}
    </section>
  );
};
