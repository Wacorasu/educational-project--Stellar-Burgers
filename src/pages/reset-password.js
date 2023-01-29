import resetPassword from "./reset-password.module.css";
import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  sendNewPassword,
  CLEAR_RESET_PASSWORD_REQUEST,
} from "../services/actions/auth-data";

export default function ResetPassword() {
  const serverErrors = useSelector(
    (store) => store.authData.errors.errorSendPassword
  );
  const [formValue, setFormValue] = useState({
    token: "",
    password: "",
    viewPassword: true,
    sendError: false,
    sendErrorText: "",
    inputPasswordError: false,
    inputPasswordErrorText: "",
    inputTokenError: false,
    inputTokenErrorText: "",
  });

  const history = useHistory();
  const dispatch = useDispatch();
  const inputPasswordRef = React.useRef(null);
  const inputTokenRef = React.useRef(null);
  const { isResetPassword, isAcceptPassword } = useSelector(
    (store) => store.authData
  );

  const handleSendPassword = useCallback(
    (e) => {
      e.preventDefault();
      if (
        !inputPasswordRef.current.validity.valid ||
        !inputTokenRef.current.validity.valid
      ) {
        setFormValue({
          ...formValue,
          inputPasswordError: !inputPasswordRef.current.validity.valid,
          inputPasswordErrorText: inputPasswordRef.current.validationMessage,
          inputTokenError: !inputTokenRef.current.validity.valid,
          inputTokenErrorText: inputTokenRef.current.validationMessage,
        });
      } else {
        dispatch(
          sendNewPassword({
            password: formValue.password,
            token: formValue.token,
          })
        );
      }
    },
    // eslint-disable-next-line
    [formValue]
  );

  useEffect(() => {
    if (serverErrors?.hasError && formValue.token) {
      setFormValue({
        ...formValue,
        sendError: serverErrors.hasError,
        sendErrorText: serverErrors.text,
      });
    } else {
      setFormValue({
        ...formValue,
        sendError: false,
        sendErrorText: "",
      });
    }
    // eslint-disable-next-line
  }, [serverErrors?.hasError]);

  useEffect(() => {
    if (isAcceptPassword) {
      dispatch({ type: CLEAR_RESET_PASSWORD_REQUEST });
      history.replace({ pathname: "/login" });
    }
    // eslint-disable-next-line
  }, [isAcceptPassword]);

  const resetError = () => {
    if (formValue.sendError) {
      setFormValue({
        ...formValue,
        sendError: false,
        sendErrorText: "",
      });
    }
    if (formValue.inputPasswordError) {
      setFormValue({
        ...formValue,
        inputPasswordError: false,
        inputPasswordErrorText: "",
      });
    }
    if (formValue.inputTokenError) {
      setFormValue({
        ...formValue,
        inputTokenError: false,
        inputTokenErrorText: "",
      });
    }
  };

  return isResetPassword ? (
    <section className={resetPassword.page}>
      <div className={`${resetPassword.resetPasswordContainer} pt-25`}>
        <form
          className={`${resetPassword.inputContainer} mb-20`}
          onSubmit={handleSendPassword}
        >
          <h2 className={`${resetPassword.title} text text_type_main-medium`}>
            Восстановление пароля
          </h2>
          <Input
            placeholder={"Введите новый пароль"}
            type={formValue.viewPassword ? "password" : "text"}
            icon={formValue.viewPassword ? "ShowIcon" : "HideIcon"}
            onChange={(e) =>
              setFormValue({ ...formValue, password: e.target.value })
            }
            value={formValue.password}
            onIconClick={() =>
              setFormValue({
                ...formValue,
                viewPassword: !formValue.viewPassword,
              })
            }
            onFocus={() => resetError()}
            error={formValue.inputPasswordError}
            errorText={formValue.inputPasswordErrorText}
            ref={inputPasswordRef}
            minLength={2}
          />
          <Input
            placeholder={"Введите код из письма"}
            type={"text"}
            onChange={(e) =>
              setFormValue({ ...formValue, token: e.target.value })
            }
            value={formValue.token}
            onFocus={() => resetError()}
            error={
              formValue.sendError
                ? formValue.sendError
                : formValue.inputTokenError
            }
            errorText={
              formValue.sendError
                ? formValue.sendErrorText
                : formValue.inputTokenErrorText
            }
            ref={inputTokenRef}
            minLength={2}
          />
          <Button type="primary" size="large" htmlType="submit">
            Сохранить
          </Button>
        </form>
        <p
          className={`${resetPassword.text} text text_type_main-default text_color_inactive mb-4`}
        >
          Вспомнили пароль?{" "}
          <Link to={{ pathname: "/login" }} className={resetPassword.link}>
            Войти
          </Link>
        </p>
      </div>
    </section>
  ) : (
    history.replace({ pathname: "/" })
  );
}
