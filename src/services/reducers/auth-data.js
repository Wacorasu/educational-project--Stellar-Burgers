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
} from "../actions/auth-data";

const initialState = {
  isLoading: false,
  hasError: false,
  isAuth: false,
  userData: null,
  isResetPassword: false,
  isAcceptPassword: false,
  isTokenRefresh:false,
  errors: {
    errorUser: { hasError: false, text: "" },
    errorAuth: { hasError: false, text: "" },
    errorUpdateUser: { hasError: false, text: "" },
    errorLogout: { hasError: false, text: "" },
    errorRegister: { hasError: false, text: "" },
    errorResetPassword: { hasError: false, text: "" },
    errorSendPassword: { hasError: false, text: "" },
    errorRefreshToken: { hasError: false, text: "" },
  },
};

export const authDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REQUEST: {
      return {
        ...state,
        errors: { ...state.errors, errorUser: initialState.errors.errorUser },
        isLoading: true,
      };
    }
    case USER_REQUEST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAuth: action.payload.success,
        userData: action.payload.user,
      };
    }
    case USER_REQUEST_FAILED: {
      return {
        ...state,
        isAuth: false,
        isLoading: false,
        errors: {
          ...state.errors,
          errorUser: { hasError: true, text: action.payload.message },
        },
      };
    }
    case USER_UPDATE_REQUEST: {
      return {
        ...state,
        errors: {
          ...state.errors,
          errorUpdateUser: initialState.errors.errorUpdateUser,
        },
        isLoading: true,
      };
    }
    case USER_UPDATE_REQUEST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        userData: action.payload.user,
      };
    }
    case USER_UPDATE_REQUEST_FAILED: {
      return {
        ...state,
        isLoading: false,
        errors: {
          ...state.errors,
          errorUpdateUser: { hasError: true, text: action.payload.message },
        },
      };
    }
    case REGISTER_REQUEST: {
      return {
        ...state,
        errors: { ...state.errors, errorRegister: initialState.errors.errorRegister },
        isLoading: true,
      };
    }
    case REGISTER_REQUEST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAuth: action.payload.success,
        userData: action.payload.user,
      };
    }
    case REGISTER_REQUEST_FAILED: {
      return {
        ...state,
        isAuth: false,
        isLoading: false,
        errors: {
          ...state.errors,
          errorRegister: { hasError: true, text: action.payload.message },
        },
      };
    }
    case AUTH_REQUEST: {
      return {
        ...state,
        errors: { ...state.errors, errorAuth: initialState.errors.errorAuth },
        isLoading: true,
      };
    }
    case AUTH_REQUEST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAuth: action.payload.success,
        userData: action.payload.user,
      };
    }
    case AUTH_REQUEST_FAILED: {
      return {
        ...state,
        isAuth: false,
        isLoading: false,
        errors: {
          ...state.errors,
          errorAuth: { hasError: true, text: action.payload.message },
        },
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        errors: { ...state.errors, errorLogout: initialState.errors.errorLogout },
        isLoading: true,
      };
    }
    case LOGOUT_REQUEST_SUCCESS: {
      return {
        initialState,
      };
    }
    case LOGOUT_REQUEST_FAILED: {
      return {
        ...state,
        isLoading: false,
        errors: {
          ...state.errors,
          errorLogout: { hasError: true, text: action.payload.message },
        },
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        errors: {
          ...state.errors,
          errorResetPassword: initialState.errors.errorResetPassword,
        },
        isLoading: true,
      };
    }
    case RESET_PASSWORD_REQUEST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isResetPassword: action.payload.success,
      };
    }
    case RESET_PASSWORD_REQUEST_FAILED: {
      return {
        ...state,
        isLoading: false,
        errors: {
          ...state.errors,
          errorResetPassword: { hasError: true, text: action.payload.message },
        },
      };
    }
    case SEND_PASSWORD_REQUEST: {
      return {
        ...state,
        errors: {
          ...state.errors,
          errorSendPassword: initialState.errors.errorSendPassword,
        },
        isLoading: true,
      };
    }
    case SEND_PASSWORD_REQUEST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAcceptPassword: action.payload.success,
      };
    }
    case SEND_PASSWORD_REQUEST_FAILED: {
      return {
        ...state,
        isLoading: false,
        errors: {
          ...state.errors,
          errorSendPassword: { hasError: true, text: action.payload.message },
        },
      };
    }
    case CLEAR_RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        isAcceptPassword: false,
        isResetPassword: false,
      };
    }
    case REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        isTokenRefresh:false,
        errors: {
          ...state.errors,
          errorRefreshToken: initialState.errors.errorRefreshToken,
        },
        isLoading: true,
      };
    }
    case REFRESH_TOKEN_REQUEST_FAILED: {
      return {
        ...state,
        isAuth: false,
        isTokenRefresh:false,
        isLoading: false,
        errors: {
          ...state.errors,
          errorRefreshToken: { hasError: true, text: action.payload.message },
        },
      };
    }
    case REFRESH_TOKEN_REQUEST_SUCCESS: {
      return {
        ...state,
        isTokenRefresh:true,
        isAuth: action.payload.success,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};
