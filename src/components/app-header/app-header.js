import appHeader from "./app-header.module.css";
import React from "react";
import {
  Logo,
  ProfileIcon,
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation, Link } from "react-router-dom";

export default function AppHeader() {
  const location = useLocation();
  return (
    <header className={`${appHeader.header} mb-5`}>
      <nav className={appHeader.navigation}>
        <ul className={`${appHeader.menuList} pt-4 pb-4`}>
          <li>
            <ul className={appHeader.menuListLeft}>
              <li>
                <NavLink
                  className={`${appHeader.link} pt-4 pb-4 pl-5 pr-5 mr-2`}
                  to={{ pathname: "/" }}
                  activeClassName={appHeader.activeLink}
                  exact
                >
                  <BurgerIcon
                    type={location.pathname === "/" ? "primary" : "secondary"}
                  />
                  <p className="text text_type_main-default ml-2">
                    Конструктор
                  </p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`${appHeader.link} pt-4 pb-4 pl-5 pr-5`}
                  to={{ pathname: "/feed" }}
                  activeClassName={appHeader.activeLink}
                  exact
                >
                  <ListIcon  type={location.pathname === "/orders-list" ? "primary" : "secondary"} />
                  <p className="text text_type_main-default ml-2">
                    Лента заказов
                  </p>
                </NavLink>
              </li>
            </ul>
          </li>
          <li className={appHeader.logo}>
           <Link to={{pathname:'/'}}> <Logo /> </Link>
          </li>
          <li>
            <NavLink
              className={`${appHeader.link} pt-4 pb-4 pl-5 pr-5 ${location.pathname.indexOf('/profile') > -1 ? appHeader.activeLink : ""}`}
              to={{ pathname: "/profile" }}
              exact
            >
              <ProfileIcon type={location.pathname.indexOf('/profile') > -1 ? "primary" : "secondary"} />
              <p className="text text_type_main-default ml-2">Личный кабинет</p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
