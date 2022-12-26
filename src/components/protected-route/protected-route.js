import { Redirect, Route} from "react-router-dom";
import React from "react";
import {  useSelector } from "react-redux";

export function ProtectedRoute({ children, ...rest }) {
  const { isAuth} = useSelector((store) => store.authData);


  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
