import { Redirect, Route } from "react-router-dom";
import React, { FC } from "react";
import { useSelector } from "../../services/hooks";
import { useLocation } from "react-router-dom";
import { RouteProps } from "react-router";

export const ProtectedRoute: FC<
  RouteProps & { onlyUnAuth?: boolean}
> = ({ onlyUnAuth, children, ...props }) => {
  const { isAuth } = useSelector((store) => store.authData);
  const location = useLocation();

  if (onlyUnAuth && isAuth) {
    const { from }: { from?: { pathname: string } } = location.state || {
      from: { pathname: "/" },
    };
    return <Redirect to={{ ...from, state: { from: location } }} />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
  }

  return <Route {...props}>{children}</Route>;
};
