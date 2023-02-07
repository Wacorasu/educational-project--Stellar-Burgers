import React, { useEffect, FC } from "react";
import { useSelector, useDispatch } from "../services/hooks";
import { Redirect } from "react-router-dom";
import { getLogout } from "../services/actions/auth-data";

export  const LogOut: FC = () => {
  const { isAuth } = useSelector((store) => store.authData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLogout());
    // eslint-disable-next-line
  }, [isAuth]);

  return !isAuth ? (
    <Redirect
      to={{
        pathname: "/login",
      }}
    />
  ) : (
    <Redirect
      to={{
        pathname: "/profile",
      }}
    />
  );
}
