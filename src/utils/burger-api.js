import { BURGER_API_URL } from "./api.js";

const getOrder = (ingredients) => {
  return fetch(`${BURGER_API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredients.map((item) => item._id),
    }),
  });
};

const getServerData = () => {
  return fetch(`${BURGER_API_URL}/ingredients`);
};

export { getOrder, getServerData };
