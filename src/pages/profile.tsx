import profile from "./profile.module.css";
import { Route, Switch } from "react-router-dom";
import { NotFound } from "./not-found";
import { OrderHistory } from "../components/order-history/order-history";
import ProfileNavigate from "../components/profile-navigate/profile-navigate";
import { ProfileEdit } from "../components/profile-edit/profile-edit";
import React, { FC } from "react";

export const Profile: FC = () => {
  return (
    <section className={`${profile.page} pt-25`}>
      <ProfileNavigate />
      <Switch>
        <Route path="/profile/" exact>
          <ProfileEdit />
        </Route>
        <Route path="/profile/orders" exact>
          <OrderHistory />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </section>
  );
};
