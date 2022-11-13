import {
  CONSTRUCTOR_ADD,
  CONSTRUCTOR_DELETE,
  CONSTRUCTOR_RESET,
  CONSTRUCTOR_REORDER,
} from "../actions/burger-constructor";

const initialState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTRUCTOR_ADD: {
      if (action.payload.type === "bun") {
        return { ...state, bun: action.payload };
      } else {
        return {
          ...state,
          ingredients: [...state.ingredients, action.payload],
        };
      }
    }
    case CONSTRUCTOR_DELETE: {
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient) => ingredient.id !== action.value.id
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
          ingredients: [
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
          ingredients: [
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
