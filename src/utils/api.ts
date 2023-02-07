const BURGER_API_URL = "https://norma.nomoreparties.space/api";
const BURGER_API_URL_WS = "wss://norma.nomoreparties.space";

export { BURGER_API_URL, BURGER_API_URL_WS };

const checkResponse = (res: {readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly type: ResponseType;
  readonly url: string;
  clone(): Response;
  json(): Promise<any>;
}) => {
  return res.ok ? res.json() : Promise.reject(res.json());
};

export function request(url: string, options?: RequestInit) {
  return fetch(url, options).then(checkResponse);
}
