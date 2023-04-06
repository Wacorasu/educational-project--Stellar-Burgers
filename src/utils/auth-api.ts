import { getCookie } from "./cookie-api";
import { BURGER_API_URL } from "./api";
import { request } from "./api";
import type { TAuthEmail, TAuthFrom, TAuthPassword, TUserInfo } from "../services/types/auth";
import type { TResponseBody } from "../services/types";



const getServerAuth = (
  form: TAuthFrom
): Promise<
  TResponseBody<"user", { name: string; email: string }>> => {
  return request(`${BURGER_API_URL}/auth/login`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  });
};

const getServerUser = () : Promise<
TResponseBody<"user", { name: string; email: string }>>=>
  request(`${BURGER_API_URL}/auth/user`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + getCookie("accessToken"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });

const getServerLogout = () : Promise <TResponseBody> => {
  return request(`${BURGER_API_URL}/auth/logout`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + getCookie("accessToken"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ token: getCookie("refreshToken") }),
  });
};

const getServerUpdateUser = (form: TUserInfo) : Promise<
TResponseBody<"user", { name: string; email: string }>>=> {
  return request(`${BURGER_API_URL}/auth/user`, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + getCookie("accessToken"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  });
};

const getServerRegister = (form: TUserInfo) : Promise<
TResponseBody<"user", { name: string; email: string }>>=> {
  return request(`${BURGER_API_URL}/auth/register`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  });
};

const getServerResetPassword = (form: TAuthEmail) : Promise <TResponseBody>=> {
  return request(`${BURGER_API_URL}/password-reset`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  });
};

const getServerNewPassword = (form: TAuthPassword): Promise <TResponseBody> => {
  return request(`${BURGER_API_URL}/password-reset/reset`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  });
};

const getServerRefreshToken = () : Promise<
TResponseBody>=> {
  return request(`${BURGER_API_URL}/auth/token`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ token: getCookie("refreshToken") }),
  });
};

export {
  getServerAuth,
  getServerLogout,
  getServerUser,
  getServerRegister,
  getServerResetPassword,
  getServerNewPassword,
  getServerRefreshToken,
  getServerUpdateUser,
};
