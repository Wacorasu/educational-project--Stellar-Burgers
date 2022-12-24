import { setCookie, deleteCookie } from "../../utils/cookie-api";

import {
  getServerAuth,
  getServerUser,
  getServerLogout,
  getServerRegister,
  getServerResetPassword,
  getServerNewPassword,
  getServerRefreshToken,
  getServerUpdateUser
} from "../../utils/auth-api";
import { checkResponse } from "../../utils/api.js";

export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_REQUEST_SUCCESS = "AUTH_REQUEST_SUCCESS";
export const AUTH_REQUEST_FAILED = "AUTH_REQUEST_FAILED";
export const USER_REQUEST = "USER_REQUEST";
export const USER_REQUEST_SUCCESS = "USER_REQUEST_SUCCESS";
export const USER_REQUEST_FAILED = "USER_REQUEST_FAILED";
export const USER_UPDATE_REQUEST = "USER_UPDATE_REQUEST";
export const USER_UPDATE_REQUEST_SUCCESS = "USER_UPDATE_REQUEST_SUCCESS";
export const USER_UPDATE_REQUEST_FAILED = "USER_UPDATE_REQUEST_FAILED";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_REQUEST_SUCCESS = "LOGOUT_REQUEST_SUCCESS";
export const LOGOUT_REQUEST_FAILED = "LOGOUT_REQUEST_FAILED";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_REQUEST_SUCCESS = "REGISTER_REQUEST_SUCCESS";
export const REGISTER_REQUEST_FAILED = "REGISTER_REQUEST_FAILED";
export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_REQUEST_SUCCESS = "RESET_PASSWORD_REQUEST_SUCCESS";
export const RESET_PASSWORD_REQUEST_FAILED = "RESET_PASSWORD_REQUEST_FAILED";
export const SEND_PASSWORD_REQUEST = "SEND_PASSWORD_REQUEST";
export const SEND_PASSWORD_REQUEST_SUCCESS = "SEND_PASSWORD_REQUEST_SUCCESS";
export const SEND_PASSWORD_REQUEST_FAILED = "SEND_PASSWORD_REQUEST_FAILED";
export const CLEAR_RESET_PASSWORD_REQUEST = "CLEAR_RESET_PASSWORD_REQUEST";
export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_REQUEST_SUCCESS = "REFRESH_TOKEN_REQUEST_SUCCESS";
export const REFRESH_TOKEN_REQUEST_FAILED = "REFRESH_TOKEN_REQUEST_FAILED";

export const getAuth = (form) => (dispatch) => {
  dispatch({
    type: AUTH_REQUEST,
  });
  return getServerAuth(form)
    .then(checkResponse)
    .then((res) => {
      dispatch({
        type: AUTH_REQUEST_SUCCESS,
        payload: res,
      });
      if (res.accessToken) {
        setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
        setCookie('refreshToken', res.refreshToken);
      }
    })
    .catch((res) => {
      res.then(result=>{
        dispatch({
          type: AUTH_REQUEST_FAILED,
          payload: result,
        });
      })
      
    });
};

export const getUserData = () => (dispatch) => {
  dispatch({
    type: USER_REQUEST,
  });
  return getServerUser()
    .then(checkResponse)
    .then((res) => {
      dispatch({
        type: USER_REQUEST_SUCCESS,
        payload: res,
      });
    })
    .catch((res) => {
      res.then(result=>{
        dispatch({
          type: USER_REQUEST_FAILED,
          payload: result,
        });
      })
    });
};

export const sendUpdatedData = (form) => (dispatch) => {
  dispatch({
    type: USER_UPDATE_REQUEST,
  });
  return getServerUpdateUser(form)
    .then(checkResponse)
    .then((res) => {
      dispatch({
        type: USER_UPDATE_REQUEST_SUCCESS,
        payload: res,
      });
    })
    .catch((res) => {
      res.then(result=>{
        dispatch({
          type: USER_UPDATE_REQUEST_FAILED,
          payload: result,
        });
      })
    });
};

export const getLogout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_REQUEST,
  });
  return getServerLogout()
    .then(checkResponse)
    .then((res) => {
      if (res.success){
        dispatch({
          type: LOGOUT_REQUEST_SUCCESS,
        });
        deleteCookie('refreshToken');
        deleteCookie('accessToken')
      }
    })
    .catch((res) => {
      res.then(result=>{
        dispatch({
          type: LOGOUT_REQUEST_FAILED,
          payload: result,
        })});
    });
};

export const getRegister = (form) => (dispatch) => {
  dispatch({
    type: REGISTER_REQUEST,
  });
  return getServerRegister(form)
    .then(checkResponse)
    .then((res) => {
      dispatch({
        type: REGISTER_REQUEST_SUCCESS,
        payload: res,
      });
      if (res.accessToken) {
        setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
        setCookie('refreshToken', res.refreshToken);
      }
  })
    .catch((res) => {
      res.then(result=>{
        dispatch({
          type: REGISTER_REQUEST_FAILED,
          payload: result,
        })});
    });
};

export const getResetPassword = (form) => (dispatch) => {
  dispatch({
    type: RESET_PASSWORD_REQUEST,
  });
  return getServerResetPassword(form)
    .then(checkResponse)
    .then((res) => {
      dispatch({
        type: RESET_PASSWORD_REQUEST_SUCCESS,
        payload: res,
      });
    })
    .catch((res) => {
      res.then(result=>{
        dispatch({
          type: RESET_PASSWORD_REQUEST_FAILED,
          payload: result,
        })});
    });
};

export const sendNewPassword = (form) => (dispatch) => {
  dispatch({
    type: SEND_PASSWORD_REQUEST,
  });
  return getServerNewPassword(form)
    .then(checkResponse)
    .then((res) => {
      dispatch({
        type: SEND_PASSWORD_REQUEST_SUCCESS,
        payload: res,
      });
    })
    .catch((res) => {
      res.then(result=>{
        dispatch({
          type: SEND_PASSWORD_REQUEST_FAILED,
          payload: result,
        })});
    });
};

export const getRefreshToken = () => (dispatch) => {
  dispatch({
    type: REFRESH_TOKEN_REQUEST,
  });
  return getServerRefreshToken()
    .then(checkResponse)
    .then((res) => {
      dispatch({
        type: REFRESH_TOKEN_REQUEST_SUCCESS,
        payload: res,
      });
      if (res.accessToken) {
        setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
        setCookie('refreshToken', res.refreshToken);
      }
    })
    .catch((res) => {
      res.then(result=>{
        dispatch({
          type: REFRESH_TOKEN_REQUEST_FAILED,
          payload: result,
        })});
    });
};
