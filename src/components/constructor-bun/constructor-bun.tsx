import React from "react";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from "react-dnd";
import defaultBurgerIcon from "../../images/bun-02.png";
import { useDispatch, useSelector } from "../../services/hooks";
import { addToConstructor } from "../../services/actions/burger-constructor";
import { increaseCount, decreaseCount } from "../../services/actions/index";
import constructorBun from "./constructor-bun.module.css";
import { TIngredientConstructor } from "../../services/types/constructor";

export const ConstructorBun = ({ type }: { type: "top" | "bottom" }) => {
  const dispatch = useDispatch();
  const bun = useSelector((store) => store.burgerConstructor.bun);
  const [{ isAcceptZone }, dropBun] = useDrop({
    accept: "bun",
    collect: (monitor) => ({
      isAcceptZone: monitor.canDrop(),
    }),
    drop: (item: TIngredientConstructor) => {
      bun && dispatch(decreaseCount({ ...bun }));
      bun && dispatch(decreaseCount({ ...bun }));
      dispatch(addToConstructor(item));
      dispatch(increaseCount({ ...item }));
      dispatch(increaseCount({ ...item }));
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
