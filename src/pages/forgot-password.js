import forgotPassword from "./forgot-password.module.css";
import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getResetPassword } from "../services/actions/auth-data";

export default function ForgotPassword() {
  const serverErrors = useSelector(
    (store) => store.authData.errors.errorResetPassword
  );
  const [formValue, setFormValue] = useState({
    email: "",
    resetError: false,
    resetErrorText: "",
    inputEmailError: false,
    inputEmailErrorText: "",
  });

  const history = useHistory();
  const dispatch = useDispatch();
  const inputEmailRef = React.useRef(null);
  const { isAuth, isResetPassword } = useSelector((store) => store.authData);

  const handleReset = useCallback(
    (e) => {
      e.preventDefault();
      if (!inputEmailRef.current.validity.valid) {
        setFormValue({
          ...formValue,
          inputEmailError: !inputEmailRef.current.validity.valid,
          inputEmailErrorText: inputEmailRef.current.validationMessage,
        });
      } else {
        dispatch(
          getResetPassword({
            email: formValue.email,
          })
        );
      }
    },
    // eslint-disable-next-line
    [formValue]
  );

  useEffect(() => {
    if (serverErrors?.hasError && formValue.email) {
      setFormValue({
        ...formValue,
        resetError: serverErrors.hasError,
        resetErrorText: serverErrors.text,
      });
    } else {
      setFormValue({
        ...formValue,
        resetError: false,
        resetErrorText: "",
      });
    }
    // eslint-disable-next-line
  }, [serverErrors?.hasError]);

  useEffect(() => {
    if (isResetPassword) {
      history.replace({ pathname: "/reset-password" });
    }
    // eslint-disable-next-line
  }, [isResetPassword]);

  const resetError = () => {
    if (formValue.resetError) {
      setFormValue({
        ...formValue,
        resetError: false,
        resetErrorText: "",
      });
    }
    if (formValue.inputEmailError) {
      setFormValue({
        ...formValue,
        inputEmailError: false,
        inputEmailErrorText: "",
      });
    }
  };

  return !isAuth ? (
    <section className={forgotPassword.page}>
      <div className={`${forgotPassword.forgotPasswordContainer} pt-25`}>
        <form
          className={`${forgotPassword.inputContainer} mb-20`}
          onSubmit={handleReset}
        >
          <h2 className={`${forgotPassword.title} text text_type_main-medium`}>
            Восстановление пароля
          </h2>
          <Input
            placeholder={"Укажите E-mail"}
            type={"email"}
            onChange={(e) =>
              setFormValue({ ...formValue, email: e.target.value })
            }
            value={formValue.email}
            onFocus={() => resetError()}
            error={
              formValue.resetError
                ? formValue.resetError
                : formValue.inputEmailError
            }
            errorText={
              formValue.resetError
                ? formValue.resetErrorText
                : formValue.inputEmailErrorText
            }
            ref={inputEmailRef}
          />
          <Button type="primary" size="large" htmlType="submit">
            Восстановить
          </Button>
        </form>
        <p
          className={`${forgotPassword.text} text text_type_main-default text_color_inactive mb-4`}
        >
          Вспомнили пароль?{" "}
          <Link to={{ pathname: "/login" }} className={forgotPassword.link}>
            Войти
          </Link>
        </p>
      </div>
    </section>
  ) : (
    history.replace({ pathname: "/" })
  );
}
