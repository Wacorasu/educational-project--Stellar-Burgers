import { TResponseBody } from "../services/types";
import { request } from "./api";

const getServerSingleOrder = (order: string): Promise<
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
  return request(`${process.env.REACT_APP_BURGER_API_URL}/orders/${order}`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
};

export { getServerSingleOrder };
