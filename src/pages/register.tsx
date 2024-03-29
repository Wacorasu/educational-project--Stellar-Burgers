import register from "./register.module.css";
import React, { useState, useEffect, useCallback, FC } from "react";
import { useSelector, useDispatch } from "../services/hooks";
import { Link } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getRegister } from "../services/actions/auth-data";
import { TEmPasLogInputs } from "../services/types/inputs";

export const Register: FC<
  React.FormHTMLAttributes<HTMLFormElement> &
    React.InputHTMLAttributes<HTMLInputElement>
> = () => {
  const serverErrors = useSelector(
    (store) => store.authData.errors.errorRegister
  );
  const [formValue, setFormValue] = useState<
    TEmPasLogInputs & {
      viewPassword: boolean;
      registerError: boolean;
      registerErrorText: string;
    }
  >({
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
    inputPasswordErrorText: "",
  });

  const dispatch = useDispatch();
  const inputEmailRef = React.useRef<HTMLInputElement>(null);
  const inputNameRef = React.useRef<HTMLInputElement>(null);
  const inputPasswordRef = React.useRef<HTMLInputElement>(null);

  const handleRegister = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (
        !inputEmailRef.current?.validity.valid ||
        !inputNameRef.current?.validity.valid ||
        !inputPasswordRef.current?.validity.valid
      ) {
        setFormValue({
          ...formValue,
          inputEmailError: !inputEmailRef.current?.validity.valid,
          inputEmailErrorText: inputEmailRef.current?.validationMessage,
          inputNameError: !inputNameRef.current?.validity.valid,
          inputNameErrorText: inputNameRef.current?.validationMessage,
          inputPasswordError: !inputPasswordRef.current?.validity.valid,
          inputPasswordErrorText: inputPasswordRef.current?.validationMessage,
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
        registerErrorText: serverErrors.message,
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
        inputPasswordErrorText: "",
      });
    }
  };

  return (
    <section className={register.page}>
      <div className={`${register.registerContainer} pt-25`}>
        <form
          className={`${register.inputContainer} mb-20`}
          onSubmit={handleRegister}
        >
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
            error={formValue.inputPasswordError}
            errorText={formValue.inputPasswordErrorText}
            ref={inputPasswordRef}
          />
          <Button type="primary" size="large" htmlType="submit">
            Зарегистрироваться
          </Button>
        </form>
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
  );
};
