const BURGER_API_URL = "https://norma.nomoreparties.space/api";
const BURGER_API_URL_WS = "wss://norma.nomoreparties.space";

export { BURGER_API_URL, BURGER_API_URL_WS };

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res.json());
};

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}
