import profileNavigate from "./profile-navigate.module.css";
import { NavLink } from "react-router-dom";
import React from "react";

export default function ProfileNavigate() {
  return (
    <div className={profileNavigate.navContainer}>
      <nav className={`${profileNavigate.navigation} mb-20`}>
        <ul className={profileNavigate.navList}>
          <li className={profileNavigate.navLink}>
            <NavLink
              to={{ pathname: "/profile" }}
              className={`${profileNavigate.link} text text_type_main-medium`}
              activeClassName={profileNavigate.activeLink}
              exact
            >
              Профиль
            </NavLink>
          </li>
          <li className={profileNavigate.navLink}>
            <NavLink
              to={{ pathname: "/profile/orders" }}
              className={`${profileNavigate.link} text text_type_main-medium`}
              activeClassName={profileNavigate.activeLink}
              exact
            >
              История заказов
            </NavLink>
          </li>
          <li className={profileNavigate.navLink}>
            <NavLink
              to={{ pathname: "/logout" }}
              className={`${profileNavigate.link} text text_type_main-medium`}
              activeClassName={profileNavigate.activeLink}
              exact
            >
              Выход
            </NavLink>
          </li>
        </ul>
      </nav>
      <p
        className={`${profileNavigate.aboutPage} text text_type_main-default text_color_inactive`}
      >
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
}
