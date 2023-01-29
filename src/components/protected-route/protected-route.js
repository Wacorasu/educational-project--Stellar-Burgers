import { Redirect, Route } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

export function ProtectedRoute({ onlyUnAuth, unAuth, children, ...props }) {
  const { isAuth } = useSelector((store) => store.authData);
  const location = useLocation();



  if (onlyUnAuth && isAuth) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Redirect to={{ ...from, state: { from: location } }} />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
  }

  return <Route {...props}>{children}</Route>;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  props: PropTypes.object,
  onlyUnAuth: PropTypes.bool,
  unAuth:PropTypes.bool
};