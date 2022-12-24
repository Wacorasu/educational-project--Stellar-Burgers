import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getLogout } from "../services/actions/auth-data";

export default function LogOut() {
  const { isAuth } = useSelector((store) => store.authData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLogout());
  // eslint-disable-next-line
  }, [isAuth]);

  return (
    !isAuth ? (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    ) : <Redirect
    to={{
      pathname: "/profile",
    }}
  />
  );
}
