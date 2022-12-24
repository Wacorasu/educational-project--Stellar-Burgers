import register from "./register.module.css";
import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getRegister } from "../services/actions/auth-data";

export default function Register() {
  const history = useHistory();
  const serverErrors = useSelector((store) => store.authData.errors.errorRegister);
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    viewPassword: true,
    registerError: false,
    registerErrorText: "",
    inputEmailError: false,
    inputEmailErrorText: "",
    inputNameError: false,
    inputNameErrorText: "",
    inputPasswordError: false,
    inputPasswordText: "",
  });

  const { isAuth } = useSelector((store) => store.authData);
  const dispatch = useDispatch();
  const inputEmailRef = React.useRef(null);
  const inputNameRef = React.useRef(null);
  const inputPasswordRef = React.useRef(null);

  const handleRegister = useCallback(
    (e) => {
      e.preventDefault();
      if (
        !inputEmailRef.current.validity.valid ||
        !inputNameRef.current.validity.valid ||
        !inputPasswordRef.current.validity.valid
      ) {
        setFormValue({
          ...formValue,
          inputEmailError: !inputEmailRef.current.validity.valid,
          inputEmailErrorText: inputEmailRef.current.validationMessage,
          inputNameError: !inputNameRef.current.validity.valid,
          inputNameErrorText: inputNameRef.current.validationMessage,
          inputPasswordError: !inputPasswordRef.current.validity.valid,
          inputPasswordText: inputPasswordRef.current.validationMessage,
        });
      } else {
        dispatch(
          getRegister({
            email: formValue.email,
            name: formValue.name,
            password: formValue.password,
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
        registerError: serverErrors.hasError,
        registerErrorText: serverErrors.text,
      });
    } else {
      setFormValue({
        ...formValue,
        registerError: false,
        registerErrorText: "",
      });
    }
    // eslint-disable-next-line
  }, [serverErrors?.hasError]);

  const resetError = () => {
    if (formValue.registerError) {
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
    if (formValue.inputNameError) {
      setFormValue({
        ...formValue,
        inputNameError: false,
        inputNameErrorText: "",
      });
    }
    if (formValue.inputPasswordError) {
      setFormValue({
        ...formValue,
        inputPasswordError: false,
        inputPasswordText: "",
      });
    }
  };

  return !isAuth ? (
    <section className={register.page}>
      <div className={`${register.registerContainer} pt-25`}>
        <div className={`${register.inputContainer} mb-20`}>
          <h2 className={`${register.title} text text_type_main-medium`}>
            Регистрация
          </h2>
          <Input
            placeholder={"Имя"}
            type={"text"}
            onChange={(e) =>
              setFormValue({ ...formValue, name: e.target.value })
            }
            name={"name"}
            value={formValue.name}
            minLength={2}
            error={formValue.inputNameError}
            onFocus={() => resetError()}
            errorText={formValue.inputNameErrorText}
            ref={inputNameRef}
          />
          <Input
            placeholder={"E-mail"}
            type={"email"}
            onChange={(e) =>
              setFormValue({ ...formValue, email: e.target.value })
            }
            value={formValue.email}
            onFocus={() => resetError()}
            error={
              formValue.registerError
                ? formValue.registerError
                : formValue.inputEmailError
            }
            errorText={
              formValue.registerError
                ? formValue.registerErrorText
                : formValue.inputEmailErrorText
            }
            ref={inputEmailRef}
          />
          <Input
            placeholder={"Пароль"}
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
            minLength={2}
            onFocus={() => resetError()}
            error={ formValue.inputPasswordError
            }
            errorText={formValue.inputPasswordText
            }
            ref={inputPasswordRef}
          />
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            onClick={handleRegister}
          >
            Зарегистрироваться
          </Button>
        </div>
        <p
          className={`${register.text} text text_type_main-default text_color_inactive mb-4`}
        >
          Уже зарегистрированы?{" "}
          <Link to={{ pathname: "/login" }} className={register.link}>
            Войти
          </Link>
        </p>
      </div>
    </section>
  ) : (
    history.replace({ pathname: "/" })
  );
}
