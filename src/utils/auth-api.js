import { getCookie } from './cookie-api';
import { BURGER_API_URL } from "./api.js";

const getServerAuth = (form) => {
    return fetch(`${BURGER_API_URL}/auth/login`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(form)
    });
  };
  
const getServerUser = () =>
    fetch(`${BURGER_API_URL}/auth/user`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + getCookie('accessToken')
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    });
  
  const getServerLogout = () => {
    return fetch(`${BURGER_API_URL}/auth/logout`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + getCookie('accessToken')
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({"token":getCookie('refreshToken')})
    });
  };

  const getServerUpdateUser = (form) => {
    return fetch(`${BURGER_API_URL}/auth/user`, {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + getCookie('accessToken')
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(form)
    });
  };

  const getServerRegister = (form) => {
    return fetch(`${BURGER_API_URL}/auth/register`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(form)
    });
  };

  const getServerResetPassword = (form) => {
    return fetch(`${BURGER_API_URL}/password-reset`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(form)
    });
  };

  const getServerNewPassword = (form) => {
    return fetch(`${BURGER_API_URL}/password-reset/reset`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(form)
    });
  };

  const getServerRefreshToken = () => {
    return fetch(`${BURGER_API_URL}/auth/token`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({"token":getCookie('refreshToken')})
    });
  };


  export {getServerAuth, getServerLogout, getServerUser, getServerRegister, getServerResetPassword, getServerNewPassword, getServerRefreshToken, getServerUpdateUser};