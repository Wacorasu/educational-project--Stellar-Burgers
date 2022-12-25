import { BURGER_API_URL, request } from "./api.js";


const getOrder = (ingredients) => {
  return request(`${BURGER_API_URL}/orders`, {
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
  return request(`${BURGER_API_URL}/ingredients`);
};

export { getOrder, getServerData };
