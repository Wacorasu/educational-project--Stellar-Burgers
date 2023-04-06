import { v4 as uuid } from "uuid";
import type { TIngredient } from "../types/data";
import type { TIngredientConstructor } from "../types/constructor";

import {
  CONSTRUCTOR_ADD,
  CONSTRUCTOR_DELETE,
  CONSTRUCTOR_REORDER,
  CONSTRUCTOR_RESET,
} from "../types/constants";

type TAddToConstructorAction = {
  readonly type: typeof CONSTRUCTOR_ADD;
  payload: TIngredientConstructor;
};

type TDeleteFromConstructorAction = {
  readonly type: typeof CONSTRUCTOR_DELETE;
  payload: TIngredientConstructor | undefined

};

type TResetConstructorAction = {
  readonly type: typeof CONSTRUCTOR_RESET;
};

type TReorderConstructorAction = {
  readonly type: typeof CONSTRUCTOR_REORDER;
  dragIndex: number;
  hoverIndex: number;

};

export type TConstructorActions =
  | TAddToConstructorAction
  | TDeleteFromConstructorAction
  | TResetConstructorAction
  | TReorderConstructorAction


export const deleteFromConstructor = (item: TIngredientConstructor | undefined): TDeleteFromConstructorAction => ({
  type: CONSTRUCTOR_DELETE,
  payload: item
});

export const resetConstructor = (): TResetConstructorAction => ({
  type: CONSTRUCTOR_RESET,
});

export const reorderConstructor = (dragIndex: number, hoverIndex: number): TReorderConstructorAction => ({
  type: CONSTRUCTOR_REORDER,
  dragIndex: dragIndex,
  hoverIndex: hoverIndex
});

export const addToConstructor = (
  data: TIngredient
): TAddToConstructorAction => {
  return {
    type: CONSTRUCTOR_ADD,
    payload: {
      ...data,
      id: uuid(),
    },
  };
};
