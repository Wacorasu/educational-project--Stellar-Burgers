import {
  CLOSE_DETAIL_INGREDIENTS,
  OPEN_DETAIL_INGREDIENTS,
} from "../actions/ingredient-details";

const initialState = {
  isOpened: false,
  ingredientDetails: {},
};

export const ingredientDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DETAIL_INGREDIENTS: {
      return { ...state, isOpened: true, ingredientDetails: action.data };
    }
    case CLOSE_DETAIL_INGREDIENTS: {
      return { ...state, isOpened: false, ingredientDetails: {} };
    }
    default:
      return state;
  }
};
