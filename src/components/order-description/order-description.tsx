import orderDescription from "./order-description.module.css";
import React, { useMemo, FC } from "react";
import { useSelector } from "../../services/hooks";
import { useParams } from "react-router-dom";
import {OrderIngredientCard} from "../order-ingredient-card/order-ingredient-card";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Spinner from "../spinner/spinner";


export const OrderDescription : FC = () => {
  const data = useSelector((store) => store.userOrders.allOrdersData);
  const singleData = useSelector((store) => store.userOrders.singleOrder);
  const allIngredients = useSelector((store) => store.allIngredients.data);

  const { id }: { id: string } = useParams();

  const orderData =
    data.length > 0
      ? data.find((item) => `${item.number}` === id)
      : singleData && singleData.order;


  const allUsedIngredients = orderData?.ingredients.map((item: string) => {
    return allIngredients?.find((itemSort) => item === itemSort._id);
  });

  const usedIngredients = allUsedIngredients
    ?.filter((item, index, arr) => {
      return arr.indexOf(item) === index;
    })
    .map((item) => {
      let count = 0;
      allUsedIngredients.forEach((element) => {
        if (item?._id === element?._id) {
          count = count + 1;
        }
      });
      return { ...item, qty: count };
    }) ;

  const price = useMemo(() => {
    usedIngredients?.reduce((pre: number | undefined, item) => {
      return item.price && pre && pre + item?.price * item?.qty;
    }, 0);
  }, [usedIngredients]);

  const localStatus = useMemo(() => {
    switch (orderData?.status) {
      case "done":
        return {
          text: "Выполнен",
          styles: orderDescription.statusTextSuccess,
        };
      case "pending":
        return {
          text: "Готовится",
          styles: orderDescription.statusTextDefault,
        };
      case "created":
        return {
          text: "Создан",
          styles: orderDescription.statusTextDefault,
        };
      default:
        return {
          text: "Неизвестен",
        };
    }
  }, [orderData?.status]);

  return !data ? (
    <Spinner />
  ) : (
    <div className={`${orderDescription.orderContainer}`}>
      {!(data.length > 0) && (
        <h3
          className={`${orderDescription.title} text text_type_digits-default`}
        >{`#${orderData?.number}`}</h3>
      )}
      <h2 className="text text_type_main-medium mt-10">{orderData?.name}</h2>
      <p className={`${localStatus.styles} text text_type_main-default mt-3`}>
        {localStatus.text}
      </p>
      <h3 className="text text_type_main-medium mt-15">Состав:</h3>
      <div className={`${orderDescription.ingredientContainer} mt-6`}>
        <ul className={`${orderDescription.ingredientList}`}>
          {usedIngredients?.reverse().map((item , index) => {
            return (
              <li key={index}>
                <OrderIngredientCard data={item} />
              </li>
            );
          })}
        </ul>
      </div>
      <div className={`${orderDescription.summaryContainer} mt-10`}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(`${orderData?.createdAt}`)} />{" "}
        </p>
        <div className={`${orderDescription.priceContainer} `}>
          <p
            className={`${orderDescription.price} text text_type_digits-default`}
          >
            {`${price}`}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
