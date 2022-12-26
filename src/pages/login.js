import login from "./login.module.css";
import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getAuth } from "../services/actions/auth-data";

export default function Login() {
  const serverErrors = useSelector(
    (store) => store.authData?.errors?.errorAuth
  );
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    viewPassword: true,
    authError: false,
    authErrorText: "",
    inputEmailError: false,
    inputEmailErrorText: "",
    inputPasswordError: false,
    inputPasswordErrorText: "",
  });

  const location = useLocation();

  const dispatch = useDispatch();
  const inputEmailRef = React.useRef(null);
  const inputPasswordRef = React.useRef(null);
  const { isAuth } = useSelector((store) => store.authData);

  useEffect(() => {
    if (serverErrors?.hasError && formValue.email) {
      setFormValue({
        ...formValue,
        authError: serverErrors.hasError,
        authErrorText: serverErrors.text,
      });
    } else {
      setFormValue({
        ...formValue,
        authError: false,
        authErrorText: "",
        inputEmailError: false,
        inputEmailErrorText: "",
        inputPasswordError: false,
        inputPasswordErrorText: "",
      });
    }
    // eslint-disable-next-line
  }, [serverErrors?.hasError]);

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      if (
        !inputEmailRef.current.validity.valid ||
        !inputPasswordRef.current.validity.valid
      ) {
        setFormValue({
          ...formValue,
          inputEmailError: !inputEmailRef.current.validity.valid,
          inputEmailErrorText: inputEmailRef.current.validationMessage,
          inputPasswordError: !inputPasswordRef.current.validity.valid,
          inputPasswordErrorText: inputPasswordRef.current.validationMessage,
        });
      } else {
        dispatch(
          getAuth({
            email: formValue.email,
            password: formValue.password,
          })
        );
      }
    },
    // eslint-disable-next-line
    [formValue]
  );

  const resetError = () => {
    if (formValue.authError) {
      setFormValue({
        ...formValue,
        registerError: false,
        registerErrorText: "",
      });
    }
    if (formValue.inputEmailError) {
      setFormValue({
        ...formValue,
        inputEmailError: false,
        inputEmailErrorText: "",
      });
    }
    if (formValue.inputPasswordError) {
      setFormValue({
        ...formValue,
        inputPasswordError: false,
        inputPasswordErrorText: "",
      });
    }
  };

  return !isAuth ? (
    <section className={login.page}>
      <div className={`${login.loginContainer} pt-25`}>
        <form
          className={`${login.inputContainer} mb-20`}
          onSubmit={handleLogin}
        >
          <h2 className={`${login.title} text text_type_main-medium`}>Вход</h2>
          <Input
            placeholder={"E-mail"}
            type={"email"}
            value={formValue.email}
            onChange={(e) => {
              setFormValue({ ...formValue, email: e.target.value });
            }}
            onFocus={() => resetError()}
            ref={inputEmailRef}
            error={formValue.inputEmailError}
            errorText={formValue.inputEmailErrorText}
          />
          <Input
            placeholder={"Пароль"}
            type={formValue.viewPassword ? "password" : "text"}
            icon={formValue.viewPassword ? "ShowIcon" : "HideIcon"}
            onChange={(e) => {
              setFormValue({ ...formValue, password: e.target.value });
              resetError();
            }}
            value={formValue.password}
            onIconClick={() =>
              setFormValue({
                ...formValue,
                viewPassword: !formValue.viewPassword,
              })
            }
            onFocus={() => resetError()}
            error={
              formValue.authError
                ? formValue.authError
                : formValue.inputPasswordError
            }
            errorText={
              formValue.authError
                ? formValue.authErrorText
                : formValue.inputPasswordErrorText
            }
            ref={inputPasswordRef}
            minLength={2}
          />
          <Button type="primary" size="large" htmlType="submit">
            Войти
          </Button>
        </form>
        <p
          className={`${login.text} text text_type_main-default text_color_inactive mb-4`}
        >
          Вы — новый пользователь?{" "}
          <Link to={{ pathname: "/register" }} className={login.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p
          className={`${login.text} text text_type_main-default text_color_inactive`}
        >
          Забыли пароль?{" "}
          <Link to={{ pathname: "/forgot-password" }} className={login.link}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </section>
  ) : (
    <Redirect
      to={{
        pathname: location.state?.from ? location.state.from.pathname : "/",
      }}
    />
  );
}
