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
