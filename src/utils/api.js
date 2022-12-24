const BURGER_API_URL = "https://norma.nomoreparties.space/api";

export { BURGER_API_URL };

export const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res.json());
};
