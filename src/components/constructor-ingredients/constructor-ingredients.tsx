import React, { useRef } from "react";
import constructorIngredients from "./constructor-ingredients.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { TIngredientConstructor } from "../../services/types/constructor";

export const ConstructorIngredients = ({
  ingredient,
  index,
  removeIngredient,
  moveIngredients,
}: {
  ingredient: TIngredientConstructor;
  index: number;
  removeIngredient: (id: string) => void;
  moveIngredients: (dragIndex: number, hoverIndex: number) => void;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "Sortable",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item : any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY =  clientOffset && clientOffset.y - hoverBoundingRect.top;
      if (hoverClientY && (dragIndex < hoverIndex && hoverClientY < hoverMiddleY)) {
        return;
      }
      if (hoverClientY && (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)) {
        return;
      }
      moveIngredients(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "Sortable",
    item: () => {
      return { id: ingredient.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <li
      className={constructorIngredients.constructorIngredients}
      ref={ref}
      data-handler-id={handlerId}
      style={{ opacity }}
    >
      <DragIcon type="secondary" onClick={() => moveIngredients} />
      <ConstructorElement
        isLocked={false}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => removeIngredient(ingredient.id)}
      />
    </li>
  );
};
