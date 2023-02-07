import {
  CONSTRUCTOR_ADD,
  CONSTRUCTOR_DELETE,
  CONSTRUCTOR_RESET,
  CONSTRUCTOR_REORDER,
} from "../types/constants"

import type { TConstructorActions } from "../actions/burger-constructor";
import type { TConstructorState } from "../types/constructor";

const initialState : TConstructorState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorReducer = (state = initialState, action : TConstructorActions) : TConstructorState => {
  switch (action.type) {
    case CONSTRUCTOR_ADD: {
      if (action.payload.type === "bun") {
        return { ...state, bun: action.payload };
      } else {
        return {
          ...state,
          ingredients: state.ingredients ? [...state.ingredients, action.payload] : [action.payload],
        };
      }
    }
    case CONSTRUCTOR_DELETE: {
      return {
        ...state,
        ingredients: state.ingredients && state.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload?.id
        ),
      };
    }
    case CONSTRUCTOR_RESET: {
      return initialState;
    }
    case CONSTRUCTOR_REORDER: {
      if (action.hoverIndex > action.dragIndex) {
        return {
          ...state,
          ingredients: state.ingredients && [
            ...state.ingredients.slice(0, action.dragIndex),
            ...state.ingredients.slice(
              action.dragIndex + 1,
              action.hoverIndex + 1
            ),
            ...state.ingredients.slice(action.dragIndex, action.dragIndex + 1),
            ...state.ingredients.slice(action.hoverIndex + 1),
          ],
        };
      } else
        return {
          ...state,
          ingredients: state.ingredients && [
            ...state.ingredients.slice(0, action.hoverIndex),
            ...state.ingredients.slice(action.dragIndex, action.dragIndex + 1),
            ...state.ingredients.slice(action.hoverIndex, action.dragIndex),
            ...state.ingredients.slice(action.dragIndex + 1),
          ],
        };
    }
    default:
      return state;
  }
};
