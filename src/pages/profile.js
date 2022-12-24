import profile from "./profile.module.css";
import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import NotFound from "./not-found";
import { sendUpdatedData } from "../services/actions/auth-data";
import { getRefreshToken } from "../services/actions/auth-data";

export default function Profile() {
  const { userData } = useSelector((store) => store.authData);
  const { errors, isTokenRefresh } = useSelector((store) => store.authData);
  const serverErrors = useSelector(
    (store) => store.authData.errors.errorUpdateUser
  );
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState({
    email: "",
    name: "",
    password: "",
    activeEdit: true,
    resendData: false,
    updateUserError: false,
    updateUserErrorText: "",
    inputEmailError: false,
    inputEmailErrorText: "",
    inputNameError: false,
    inputNameErrorText: "",
    inputPasswordError: false,
    inputPasswordErrorText: "",
  });
  const inputEmailRef = React.useRef(null);
  const inputNameRef = React.useRef(null);
  const inputPasswordRef = React.useRef(null);

  const sendData = () => {
    dispatch(
      sendUpdatedData({
        name: formValue.name,
        email: formValue.email,
        password: formValue.password,
      })
    );
    setFormValue({ ...formValue, activeEdit: true });
  };

  const handleUpdateUserData = useCallback(
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
          inputPasswordErrorText: inputPasswordRef.current.validationMessage,
        });
      } else {
        sendData();
      }
    },
    // eslint-disable-next-line
    [formValue]
  );

  useEffect(() => {
    if (serverErrors?.hasError && formValue.email) {
      setFormValue({
        ...formValue,
        updateUserError: serverErrors.hasError,
        updateUserErrorText: serverErrors.text,
      });
    } else {
      setFormValue({
        ...formValue,
        updateUserError: false,
        updateUserErrorText: "",
      });
    }
    // eslint-disable-next-line
  }, [serverErrors?.hasError]);

  const resetError = () => {
    if (formValue.updateUserError) {
      setFormValue({
        ...formValue,
        updateUserError: false,
        updateUserErrorText: "",
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

  useEffect(() => {
    setFormValue({ ...formValue, ...userData });
    // eslint-disable-next-line
  }, [userData]);

  useEffect(() => {
    if (serverErrors?.hasError) {
      dispatch(getRefreshToken());
    }
    // eslint-disable-next-line
  }, [serverErrors?.hasError]);

  useEffect(() => {
    if (isTokenRefresh && errors.errorUpdateUser.hasError) {
      sendData();
    }
    // eslint-disable-next-line
  }, [isTokenRefresh]);

  const handleCancel = () => {
    setFormValue({ ...userData, password: "", activeEdit: true });
  };

  return (
    <section className={`${profile.page} pt-25`}>
      <div className={profile.navContainer}>
        <nav className={`${profile.navigation} mb-20`}>
          <ul className={profile.navList}>
            <li className={profile.navLink}>
              <NavLink
                to={{ pathname: "/profile" }}
                className={`${profile.link} text text_type_main-medium`}
                activeClassName={profile.activeLink}
                exact
              >
                Профиль
              </NavLink>
            </li>
            <li className={profile.navLink}>
              <NavLink
                to={{ pathname: "/profile/order-history" }}
                className={`${profile.link} text text_type_main-medium`}
                activeClassName={profile.activeLink}
                exact
              >
                История заказов
              </NavLink>
            </li>
            <li className={profile.navLink}>
              <NavLink
                to={{ pathname: "/logout" }}
                className={`${profile.link} text text_type_main-medium`}
                activeClassName={profile.activeLink}
                exact
              >
                Выход
              </NavLink>
            </li>
          </ul>
        </nav>
        <p
          className={`${profile.aboutPage} text text_type_main-default text_color_inactive`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <Switch>
        <Route path="/profile/" exact>
          <div className={`${profile.profileContainer}`}>
            <Input
              placeholder={"Имя"}
              value={formValue?.name}
              type={"text"}
              icon={"EditIcon"}
              onChange={(e) =>
                setFormValue({ ...formValue, name: e.target.value })
              }
              onIconClick={() => {
                setFormValue({
                  ...formValue,
                  activeEdit: !formValue.activeEdit,
                });
                resetError();
              }}
              disabled={formValue?.activeEdit}
              minLength={2}
              error={formValue.inputNameError}
              onFocus={() => resetError()}
              errorText={formValue.inputNameErrorText}
              ref={inputNameRef}
            />
            <Input
              placeholder={"Логин"}
              value={formValue?.email}
              type={"email"}
              icon={"EditIcon"}
              onChange={(e) =>
                setFormValue({ ...formValue, email: e.target.value })
              }
              onIconClick={() => {
                setFormValue({
                  ...formValue,
                  activeEdit: !formValue.activeEdit,
                });
                resetError();
              }}
              disabled={formValue?.activeEdit}
              onFocus={() => resetError()}
              ref={inputEmailRef}
              error={formValue.inputEmailError}
              errorText={formValue.inputEmailErrorText}
            />
            <Input
              placeholder={"Пароль"}
              value={formValue?.password}
              type={"password"}
              icon={"EditIcon"}
              onChange={(e) =>
                setFormValue({ ...formValue, password: e.target.value })
              }
              onIconClick={() => {
                setFormValue({
                  ...formValue,
                  activeEdit: !formValue.activeEdit,
                });
                resetError();
              }}
              disabled={formValue?.activeEdit}
              onFocus={() => resetError()}
              error={
                formValue.updateUserError
                  ? formValue.updateUserError
                  : formValue.inputPasswordError
              }
              errorText={
                formValue.updateUserError
                  ? formValue.updateUserErrorText
                  : formValue.inputPasswordErrorText
              }
              ref={inputPasswordRef}
              minLength={2}
            />
            <div
              className={`${profile.buttonContainer} ${
                formValue.activeEdit && profile.buttonContainerHide
              }`}
            >
              <Button
                type="secondary"
                size="large"
                htmlType="submit"
                onClick={handleCancel}
              >
                Отмена
              </Button>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                onClick={handleUpdateUserData}
              >
                Сохранить
              </Button>
            </div>
          </div>
        </Route>
        <Route path="/profile/order-history" exact>
          <h2 className="text text_type_main-large">In progress</h2>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </section>
  );
}
