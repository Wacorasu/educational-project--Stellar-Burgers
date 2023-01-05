import { BURGER_API_URL } from "./api";
import { request } from "./api";

const getServerSingleOrder = (order) => {
  return request(`${BURGER_API_URL}/orders/${order}`, {
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
