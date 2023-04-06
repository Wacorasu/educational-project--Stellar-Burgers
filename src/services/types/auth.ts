
import type {
  TError
} from "./data";

export type TAuthPassword = {
    password: string
}

export type TAuthEmail = {
    email: string
}

export type TAuthFrom = TAuthPassword & TAuthEmail;

export type TUserInfo = TAuthFrom & {
  name: string;
};

export type TAuthDataState = {
  isLoading: boolean;
  hasError: boolean;
  isAuth: boolean;
  userData: { name: string; email: string } | null;
  isResetPassword: boolean;
  isAcceptPassword: boolean;
  isTokenRefresh: boolean;
  errors: {
    errorUser: TError;
    errorAuth: TError;
    errorUpdateUser: TError;
    errorLogout: TError;
    errorRegister: TError;
    errorResetPassword: TError;
    errorSendPassword: TError;
    errorRefreshToken: TError;
  };
};


