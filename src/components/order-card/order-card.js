import orderCard from "./order-card.module.css";
import React from "react";
import { useSelector } from "react-redux";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { MAX_LENGTH_PREVIEW_ORDER_IMAGE } from "../../utils/constants";
import PropTypes from "prop-types";

let localStatus = {};

export default function OrderCard({ data, onClick, hasStatus }) {
  const allIngredients = useSelector((store) => store.allIngredients.data);
  const { status, name, createdAt, ingredients, number } = data;
  let hasBun = false;
  const allUsedIngredients = ingredients.map((item) => {
    return allIngredients.find((itemSort) => item === itemSort._id);
  });

  const usedIngredients = allUsedIngredients.filter((item) => {
    if (item.type === "bun" && !hasBun) {
      hasBun = true;
      return item;
    } else if (item.type !== "bun") {
      return item;
    }
    return "";
  });
  const price = allUsedIngredients.reduce(
    (pre, item) => pre + item.price,
    null
  );

  switch (status) {
    case "done": {
      localStatus = { text: "Выполнен", styles: orderCard.statusTextSuccess };
      break;
    }
    case "pending": {
      localStatus = { text: "Готовится", styles: orderCard.statusTextDefault };
      break;
    }
    case "created": {
      localStatus = { text: "Создан", styles: orderCard.statusTextDefault };
      break;
    }
    default:
      break;
  }

  return data ? (
    <div
      className={`${orderCard.orderCardContainer} mr-2`}
      id={number}
      onClick={onClick}
    >
      <div className={`${orderCard.orderInfo}`}>
        <h3 className="text text_type_digits-default">{`#${number}`}</h3>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(`${createdAt}`)} />
        </p>
      </div>
      <h2 className="text text_type_main-medium">{name}</h2>
      {hasStatus && (
        <p className={`${localStatus.styles} text text_type_main-default`}>
          {localStatus.text}
        </p>
      )}
      <div className={`${orderCard.summaryContainer}`}>
        <div className={`${orderCard.imgPreview}`}>
          {usedIngredients.length <= MAX_LENGTH_PREVIEW_ORDER_IMAGE
            ? usedIngredients.reverse().map((item, index) => {
                return (
                  <img
                    className={`${orderCard.image}`}
                    src={item.image}
                    alt={item.name}
                    key={index}
                  />
                );
              })
            : usedIngredients
                .reverse()
                .slice(-MAX_LENGTH_PREVIEW_ORDER_IMAGE)
                .map((item, index) => {
                  return index !== 0 ? (
                    <img
                      className={`${orderCard.image}`}
                      src={item.image}
                      alt={item.name}
                      key={index}
                    />
                  ) : (
                    <div className={`${orderCard.countContainer}`} key={index}>
                      <div className={`${orderCard.count}`}>
                        <span className="text text_type_digits-default">{`+${
                          usedIngredients.length -
                          MAX_LENGTH_PREVIEW_ORDER_IMAGE
                        }`}</span>
                      </div>
                      <img
                        className={`${orderCard.imageCount}`}
                        src={item.image}
                        alt={item.name}
                      />
                    </div>
                  );
                })}
        </div>
        <div className={`${orderCard.priceContainer}`}>
          <p className="text text_type_digits-default">{price}</p>
          <CurrencyIcon />
        </div>
      </div>
    </div>
  ) : (
    <h2 className="text text_type_main-medium">Loading...</h2>
  );
}

OrderCard.propTypes = {
  data: PropTypes.shape({
    status: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    ingredients: PropTypes.array.isRequired,
    number: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  hasStatus: PropTypes.bool,
};
