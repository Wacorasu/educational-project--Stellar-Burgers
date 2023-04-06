import profileEdit from "./profile-edit.module.css";
import React, { useEffect, useState, useCallback, FC } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "../../services/hooks";
import {
  sendUpdatedData,
  getRefreshToken,
} from "../../services/actions/auth-data";
import { TEmPasLogInputs } from "../../services/types/inputs";

export const ProfileEdit: FC<
  React.FormHTMLAttributes<HTMLFormElement> & React.InputHTMLAttributes<HTMLInputElement>
> = () => {
  const { userData } = useSelector((store) => store.authData);
  const { errors, isTokenRefresh } = useSelector((store) => store.authData);
  const serverErrors = useSelector(
    (store) => store.authData.errors.errorUpdateUser
  );
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState<
    TEmPasLogInputs & {
      activeEdit: boolean;
      resendData: boolean;
      updateUserError: boolean;
      updateUserErrorText: string;
    }
  >({
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
  const inputEmailRef = React.useRef<HTMLInputElement>(null);
  const inputNameRef = React.useRef<HTMLInputElement>(null);
  const inputPasswordRef = React.useRef<HTMLInputElement>(null);

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
    (e : React.FormEvent<HTMLFormElement>) => {
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
        updateUserErrorText: serverErrors.message,
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
        inputPasswordErrorText: "",
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
    setFormValue({ ...formValue, ...userData, password: "", activeEdit: true });
  };

  return (
    <form
      className={`${profileEdit.profileContainer}`}
      onSubmit={handleUpdateUserData}
    >
      <Input
        placeholder={"Имя"}
        value={formValue?.name}
        type={"text"}
        icon={"EditIcon"}
        onChange={(e) => setFormValue({ ...formValue, name: e.target.value })}
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
        errorText={formValue?.inputNameErrorText}
        ref={inputNameRef}
      />
      <Input
        placeholder={"Логин"}
        value={formValue?.email}
        type={"email"}
        icon={"EditIcon"}
        onChange={(e) => setFormValue({ ...formValue, email: e.target.value })}
        onIconClick={() => {
          setFormValue({
            ...formValue,
            activeEdit: !formValue.activeEdit,
          });
          resetError();
        }}
        disabled={formValue.activeEdit}
        onFocus={() => resetError()}
        ref={inputEmailRef}
        error={formValue?.inputEmailError}
        errorText={formValue?.inputEmailErrorText}
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
        className={`${profileEdit.buttonContainer} ${
          formValue.activeEdit && profileEdit.buttonContainerHide
        }`}
      >
        <Button
          type="secondary"
          size="large"
          htmlType="button"
          onClick={handleCancel}
        >
          Отмена
        </Button>
        <Button type="primary" size="large" htmlType="submit">
          Сохранить
        </Button>
      </div>
    </form>
  );
};
