import { setCookie, deleteCookie } from "../../utils/cookie-api";

import {
  getServerAuth,
  getServerUser,
  getServerLogout,
  getServerRegister,
  getServerResetPassword,
  getServerNewPassword,
  getServerRefreshToken,
  getServerUpdateUser,
} from "../../utils/auth-api";

import type {
  TUserData,
  TMessageError,
  TServerRequest,
  TServersTokens,
} from "../types/data";

import {
  AUTH_REQUEST,
  AUTH_REQUEST_FAILED,
  AUTH_REQUEST_SUCCESS,
  USER_REQUEST,
  USER_REQUEST_FAILED,
  USER_REQUEST_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_REQUEST_FAILED,
  LOGOUT_REQUEST_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_REQUEST_FAILED,
  REGISTER_REQUEST_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_FAILED,
  RESET_PASSWORD_REQUEST_SUCCESS,
  SEND_PASSWORD_REQUEST,
  SEND_PASSWORD_REQUEST_FAILED,
  SEND_PASSWORD_REQUEST_SUCCESS,
  CLEAR_RESET_PASSWORD_REQUEST,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_REQUEST_FAILED,
  REFRESH_TOKEN_REQUEST_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_REQUEST_FAILED,
  USER_UPDATE_REQUEST_SUCCESS,
} from "../types/constants";

import type {
  TAuthFrom,
  TUserInfo,
  TAuthEmail,
  TAuthPassword,
} from "../types/auth";

import { AppDispatch, AppThunk } from "../types/index";

 type TGetClearRequest = {
  readonly type: typeof CLEAR_RESET_PASSWORD_REQUEST;
};

 type TGetAuthRequestAction = {
  readonly type: typeof AUTH_REQUEST;
};
 type TGetAuthRequestFailedAction = {
  readonly type: typeof AUTH_REQUEST_FAILED;
  readonly payload: TMessageError;
};
 type TGetAuthRequestSuccessAction = {
  readonly type: typeof AUTH_REQUEST_SUCCESS;
  readonly payload: TUserData;
};

 type TGetUserRequestAction = {
  readonly type: typeof USER_REQUEST;
};
 type TGetUserRequestFailedAction = {
  readonly type: typeof USER_REQUEST_FAILED;
  readonly payload: TMessageError;
};
 type TGetUserRequestSuccessAction = {
  readonly type: typeof USER_REQUEST_SUCCESS;
  readonly payload: TUserData;
};

 type TGetLogoutRequestAction = {
  readonly type: typeof LOGOUT_REQUEST;
};
 type TGetLogoutRequestFailedAction = {
  readonly type: typeof LOGOUT_REQUEST_FAILED;
  readonly payload: TMessageError;
};
 type TGetLogoutRequestSuccessAction = {
  readonly type: typeof LOGOUT_REQUEST_SUCCESS;
};

 type TGetRegisterRequestAction = {
  readonly type: typeof REGISTER_REQUEST;
};
 type TGetRegisterRequestFailedAction = {
  readonly type: typeof REGISTER_REQUEST_FAILED;
  readonly payload: TMessageError;
};
 type TGetRegisterRequestSuccessAction = {
  readonly type: typeof REGISTER_REQUEST_SUCCESS;
  readonly payload: TUserData;
};

 type TGetResetPasswordRequestAction = {
  readonly type: typeof RESET_PASSWORD_REQUEST;
};
 type TGetResetPasswordRequestFailedAction = {
  readonly type: typeof RESET_PASSWORD_REQUEST_FAILED;
  readonly payload: TMessageError;
};
 type TGetResetPasswordRequestSuccessAction = {
  readonly type: typeof RESET_PASSWORD_REQUEST_SUCCESS;
  readonly payload: TServerRequest;
};

 type TSendPasswordRequestAction = {
  readonly type: typeof SEND_PASSWORD_REQUEST;
};
 type TSendPasswordRequestFailedAction = {
  readonly type: typeof SEND_PASSWORD_REQUEST_FAILED;
  readonly payload: TMessageError;
};
 type TSendPasswordRequestSuccessAction = {
  readonly type: typeof SEND_PASSWORD_REQUEST_SUCCESS;
  readonly payload: TServerRequest;
};

 type TGetRefreshTokenRequestAction = {
  readonly type: typeof REFRESH_TOKEN_REQUEST;
};
 type TGetRefreshTokenRequestFailedAction = {
  readonly type: typeof REFRESH_TOKEN_REQUEST_FAILED;
  readonly payload: TMessageError;
};
 type TGetRefreshTokenRequestSuccessAction = {
  readonly type: typeof REFRESH_TOKEN_REQUEST_SUCCESS;
  readonly payload: TServersTokens;
};

 type TGetUserUpdateRequestAction = {
  readonly type: typeof USER_UPDATE_REQUEST;
};
 type TGetUserUpdateRequestFailedAction = {
  readonly type: typeof USER_UPDATE_REQUEST_FAILED;
  readonly payload: TMessageError;
};
 type TGetUserUpdateRequestSuccessAction = {
  readonly type: typeof USER_UPDATE_REQUEST_SUCCESS;
  readonly payload: TUserData;
};

export type TAuthActions =
  | TGetAuthRequestAction
  | TGetAuthRequestFailedAction
  | TGetAuthRequestSuccessAction
  | TGetClearRequest
  | TGetLogoutRequestAction
  | TGetLogoutRequestFailedAction
  | TGetLogoutRequestSuccessAction
  | TGetRefreshTokenRequestAction
  | TGetRefreshTokenRequestFailedAction
  | TGetRefreshTokenRequestSuccessAction
  | TGetRegisterRequestAction
  | TGetRegisterRequestFailedAction
  | TGetRegisterRequestSuccessAction
  | TGetResetPasswordRequestAction
  | TGetResetPasswordRequestFailedAction
  | TGetResetPasswordRequestSuccessAction
  | TGetUserRequestAction
  | TGetUserRequestFailedAction
  | TGetUserRequestSuccessAction
  | TGetUserUpdateRequestAction
  | TGetUserUpdateRequestFailedAction
  | TGetUserUpdateRequestSuccessAction
  | TSendPasswordRequestAction
  | TSendPasswordRequestFailedAction
  | TSendPasswordRequestSuccessAction;

export const getClearRequest = (): TGetClearRequest => ({
  type: CLEAR_RESET_PASSWORD_REQUEST,
});

export const getAuthRequest = (): TGetAuthRequestAction => {
  return { type: AUTH_REQUEST };
};

export const getAuthRequestFailed = (
  error: TMessageError
): TGetAuthRequestFailedAction => ({
  type: AUTH_REQUEST_FAILED,
  payload: error,
});

export const getAuthRequestSuccess = (
  userData: TUserData
): TGetAuthRequestSuccessAction => ({
  type: AUTH_REQUEST_SUCCESS,
  payload: userData,
});

export const getLogoutRequest = (): TGetLogoutRequestAction => {
  return { type: LOGOUT_REQUEST };
};

export const getLogoutRequestFailed = (
  error: TMessageError
): TGetLogoutRequestFailedAction => ({
  type: LOGOUT_REQUEST_FAILED,
  payload: error,
});

export const getLogoutRequestSuccess = (): TGetLogoutRequestSuccessAction => ({
  type: LOGOUT_REQUEST_SUCCESS,
});

export const getRefreshTokenRequest = (): TGetRefreshTokenRequestAction => {
  return { type: REFRESH_TOKEN_REQUEST };
};

export const getRefreshTokenRequestFailed = (
  error: TMessageError
): TGetRefreshTokenRequestFailedAction => ({
  type: REFRESH_TOKEN_REQUEST_FAILED,
  payload: error,
});

export const getRefreshTokenRequestSuccess = (
  tokens: TServersTokens
): TGetRefreshTokenRequestSuccessAction => ({
  type: REFRESH_TOKEN_REQUEST_SUCCESS,
  payload: tokens,
});

export const getRegisterRequest = (): TGetRegisterRequestAction => {
  return { type: REGISTER_REQUEST };
};

export const getRegisterRequestFailed = (
  error: TMessageError
): TGetRegisterRequestFailedAction => ({
  type: REGISTER_REQUEST_FAILED,
  payload: error,
});

export const getRegisterRequestSuccess = (
  userData: TUserData
): TGetRegisterRequestSuccessAction => ({
  type: REGISTER_REQUEST_SUCCESS,
  payload: userData,
});

export const getResetPasswordRequest = (): TGetResetPasswordRequestAction => {
  return { type: RESET_PASSWORD_REQUEST };
};

export const getResetPasswordRequestFailed = (
  error: TMessageError
): TGetResetPasswordRequestFailedAction => ({
  type: RESET_PASSWORD_REQUEST_FAILED,
  payload: error,
});

export const getResetPasswordRequestSuccess = (
  success: TServerRequest
): TGetResetPasswordRequestSuccessAction => ({
  type: RESET_PASSWORD_REQUEST_SUCCESS,
  payload: success,
});

export const getUserRequest = (): TGetUserRequestAction => {
  return { type: USER_REQUEST };
};

export const getUserRequestFailed = (
  error: TMessageError
): TGetUserRequestFailedAction => ({
  type: USER_REQUEST_FAILED,
  payload: error,
});

export const getUserRequestSuccess = (
  userData: TUserData
): TGetUserRequestSuccessAction => ({
  type: USER_REQUEST_SUCCESS,
  payload: userData,
});

export const getUserUpdateRequest = (): TGetUserUpdateRequestAction => {
  return { type: USER_UPDATE_REQUEST };
};

export const getUserUpdateRequestFailed = (
  error: TMessageError
): TGetUserUpdateRequestFailedAction => ({
  type: USER_UPDATE_REQUEST_FAILED,
  payload: error,
});

export const getUserUpdateRequestSuccess = (
  userData: TUserData
): TGetUserUpdateRequestSuccessAction => ({
  type: USER_UPDATE_REQUEST_SUCCESS,
  payload: userData,
});

export const sendPasswordRequest = (): TSendPasswordRequestAction => {
  return { type: SEND_PASSWORD_REQUEST };
};

export const sendPasswordRequestFailed = (
  error: TMessageError
): TSendPasswordRequestFailedAction => ({
  type: SEND_PASSWORD_REQUEST_FAILED,
  payload: error,
});

export const sendPasswordRequestSuccess = (
  success: TServerRequest
): TSendPasswordRequestSuccessAction => ({
  type: SEND_PASSWORD_REQUEST_SUCCESS,
  payload: success,
});

export const getAuth: AppThunk =
  (form: TAuthFrom) => (dispatch: AppDispatch) => {
    dispatch(getAuthRequest());
    return getServerAuth(form)
      .then((res) => {
        dispatch(getAuthRequestSuccess(res));
        if (res.accessToken && typeof(res.accessToken) === 'string' && typeof(res.refreshToken) === 'string') {
          setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
          setCookie("refreshToken", res.refreshToken);
        }
      })
      .catch((res) => {
        res.then((result: TMessageError) => {
          dispatch(getAuthRequestFailed(result));
        });
      });
  };

export const getUserData: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getUserRequest());
  return getServerUser()
    .then((res) => {
      dispatch(getUserRequestSuccess(res));
    })
    .catch((res) => {
      res.then((result: TMessageError) => {
        dispatch(getUserRequestFailed(result));
      });
    });
};

export const sendUpdatedData: AppThunk =
  (form: TUserInfo) => (dispatch: AppDispatch) => {
    dispatch(getUserUpdateRequest());
    return getServerUpdateUser(form)
      .then((res) => {
        dispatch(getUserUpdateRequestSuccess(res));
      })
      .catch((res) => {
        res.then((result: TMessageError) => {
          dispatch(getUserUpdateRequestFailed(result));
        });
      });
  };

export const getLogout: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getLogoutRequest());
  return getServerLogout()
    .then((res) => {
      if (res.success) {
        dispatch(getLogoutRequestSuccess());
        deleteCookie("refreshToken");
        deleteCookie("accessToken");
      }
    })
    .catch((res) => {
      res.then((result: TMessageError) => {
        dispatch(getLogoutRequestFailed(result));
      });
    });
};

export const getRegister: AppThunk =
  (form: TUserInfo) => (dispatch: AppDispatch) => {
    dispatch(getRegisterRequest());
    return getServerRegister(form)
      .then((res) => {
        dispatch(getRegisterRequestSuccess(res));
        if (res.accessToken &&  typeof(res.accessToken) === 'string' && typeof(res.refreshToken) === 'string') {
          setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
          setCookie("refreshToken", res.refreshToken);
        }
      })
      .catch((res) => {
        res.then((result: TMessageError) => {
          dispatch(getRegisterRequestFailed(result));
        });
      });
  };

export const getResetPassword: AppThunk =
  (form: TAuthEmail) => (dispatch: AppDispatch) => {
    dispatch(getResetPasswordRequest());
    return getServerResetPassword(form)
      .then((res) => {
        dispatch(getResetPasswordRequestSuccess(res));
      })
      .catch((res) => {
        res.then((result: TMessageError) => {
          dispatch(getResetPasswordRequestFailed(result));
        });
      });
  };

export const sendNewPassword: AppThunk =
  (form: TAuthPassword) => (dispatch: AppDispatch) => {
    dispatch(sendPasswordRequest());
    return getServerNewPassword(form)
      .then((res) => {
        dispatch(sendPasswordRequestSuccess(res));
      })
      .catch((res) => {
        res.then((result: TMessageError) => {
          dispatch(sendPasswordRequestFailed(result));
        });
      });
  };

export const getRefreshToken: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getRefreshTokenRequest());
  return getServerRefreshToken()
    .then((res) => {
      dispatch(getRefreshTokenRequestSuccess(res));
      if (res.accessToken &&  typeof(res.accessToken) === 'string' && typeof(res.refreshToken) === 'string') {
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", res.refreshToken);
      }
    })
    .catch((res) => {
      res.then((result: TMessageError) => {
        dispatch(getRefreshTokenRequestFailed(result));
      });
    });
};
