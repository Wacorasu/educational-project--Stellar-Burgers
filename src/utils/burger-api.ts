import { BURGER_API_URL, request } from "./api";
import { getCookie } from "./cookie-api";
import type { TIngredientConstructor } from "../services/types/constructor.js";
import type { TResponseBody } from "../services/types/index.js";
import { TIngredientServer } from "../services/types/data.js";

const getOrder = (
  ingredients: Array<TIngredientConstructor>
): Promise<
  TResponseBody<
    "order",
    {
      number: string;
      ingredients: Array<string>;
      _id: string;
      owner?: {
        name: string;
        email: string;
        createdAt: string;
        updatedAt: string;
      };
      status: string;
      name: string;
      createdAt: string;
      updatedAt: string;
      price: number;
    }
  >
> => {
  return request(`${BURGER_API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({
      ingredients: ingredients.map((item) => item._id),
    }),
  });
};

const getServerData = (): Promise<
  TResponseBody<"data", Array<TIngredientServer>>
> => {
  return request(`${BURGER_API_URL}/ingredients`);
};

export { getOrder, getServerData };
