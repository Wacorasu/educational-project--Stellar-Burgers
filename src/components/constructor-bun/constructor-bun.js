import React from "react";
import PropTypes from "prop-types";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from "react-dnd";
import defaultBurgerIcon from "../../images/bun-02.png";
import { useDispatch, useSelector } from "react-redux";
import { addToConstructor } from "../../services/actions/burger-constructor";
import { INCREASE_COUNT, DECREASE_COUNT } from "../../services/actions/index";
import constructorBun from "./constructor-bun.module.css";

export const ConstructorBun = ({ type }) => {
  const dispatch = useDispatch();
  const bun = useSelector((store) => store.burgerConstructor.bun);
  const [{ isAcceptZone }, dropBun] = useDrop({
    accept: "bun",
    collect: (monitor) => ({
      isAcceptZone: monitor.canDrop(),
    }),
    drop: (item) => {
      bun &&
        dispatch({
          type: DECREASE_COUNT,
          item: { ...bun },
        });
      dispatch({
        type: DECREASE_COUNT,
        item: { ...bun },
      });
      dispatch(addToConstructor(item));
      dispatch({ type: INCREASE_COUNT, item: { ...item } });
      dispatch({ type: INCREASE_COUNT, item: { ...item } });
    },
  });

  return (
    <li
      ref={dropBun}
      className={`${constructorBun.constructorBun} ${
        isAcceptZone ? constructorBun.onHover : ""
      } mr-4`}
    >
      <ConstructorElement
        type={type}
        isLocked={true}
        text={
          bun
            ? `${bun?.name} ${type === "top" ? "(вверх)" : "(низ)"}`
            : "Перетащите сюда булочку"
        }
        price={bun ? bun?.price : 0}
        thumbnail={bun ? bun?.image : defaultBurgerIcon}
      />
    </li>
  );
};

ConstructorBun.propTypes = {
  type: PropTypes.string.isRequired,
};
