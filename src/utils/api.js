const BURGER_API_URL = "https://norma.nomoreparties.space/api";

export { BURGER_API_URL };

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res.json());
};

export function request(url, options) {
  return fetch(url, options).then(checkResponse)
}
