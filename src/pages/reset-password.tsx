import resetPassword from "./reset-password.module.css";
import React, { useState, useCallback, useEffect, FC } from "react";
import { useSelector, useDispatch } from "../services/hooks";
import { Link, useHistory } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  sendNewPassword,
  getClearRequest,
} from "../services/actions/auth-data";
import { TEmPasLogInputs } from "../services/types/inputs";

export const ResetPassword : FC<
React.FormHTMLAttributes<HTMLFormElement> &
  React.InputHTMLAttributes<HTMLInputElement>
> = () => {
  const serverErrors = useSelector(
    (store) => store.authData.errors.errorSendPassword
  );
  const [formValue, setFormValue] = useState<
    Pick<
      TEmPasLogInputs,
      "password" | "inputPasswordError" | "inputPasswordErrorText"
    > & {
      token: string;
      viewPassword: boolean;
      sendError: boolean;
      sendErrorText: string;
      inputTokenError: boolean;
      inputTokenErrorText: string | undefined;
    }
  >({
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
  const inputPasswordRef = React.useRef<HTMLInputElement>(null);
  const inputTokenRef = React.useRef<HTMLInputElement>(null);
  const { isResetPassword, isAcceptPassword } = useSelector(
    (store) => store.authData
  );

  const handleSendPassword = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (
        !inputPasswordRef.current?.validity.valid ||
        !inputTokenRef.current?.validity.valid
      ) {
        setFormValue({
          ...formValue,
          inputPasswordError: !inputPasswordRef.current?.validity.valid,
          inputPasswordErrorText: inputPasswordRef.current?.validationMessage,
          inputTokenError: !inputTokenRef.current?.validity.valid,
          inputTokenErrorText: inputTokenRef.current?.validationMessage,
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
        sendErrorText: serverErrors.message,
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
      dispatch(getClearRequest());
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

  useEffect(() => {
    if (!isResetPassword) {
      history.replace({ pathname: "/" });
    }
    // eslint-disable-next-line
  }, [isResetPassword]);

  return (
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
  );
};
