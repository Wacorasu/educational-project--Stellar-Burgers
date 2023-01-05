import app from "./app.module.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppHeader from "../app-header/app-header.js";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.js";
import BurgerConstructor from "../burger-constructor/burger-constructor.js";
import { getData } from "../../services/actions/index";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Route,
  Switch,
  useLocation,
  useHistory,
  Redirect,
} from "react-router-dom";
import Ingredient from "../../pages/ingredient";
import Login from "../../pages/login";
import Register from "../../pages/register";
import ResetPassword from "../../pages/reset-password";
import ForgotPassword from "../../pages/forgot-password";
import Profile from "../../pages/profile";
import NotFound from "../../pages/not-found";
import { ProtectedRoute } from "../protected-route/protected-route";
import LogOut from "../../pages/logout";
import { getRefreshToken, getUserData } from "../../services/actions/auth-data";
import { getCookie } from "../../utils/cookie-api";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDescription from "../order-description/order-description";
import OrderDescriptionPage from "../order-description-page/order-description-page";
import OrdersFeed from "../orders-feed/orders-feed";

export default function App() {
  const data = useSelector((store) => store.allIngredients.data);
  const orderData = useSelector((store) => store.userOrders.ordersData);
  const history = useHistory();
  const { isAuth } = useSelector((store) => store.authData);
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;

  function closeModal() {
    history.goBack();
  }

  const regFeedUrl = /feed/;
  const regOrdersURL = /profile.orders/;

  useEffect(() => {
    dispatch(getData());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getUserData());
    let refreshToken = getCookie("refreshToken");
    if (!isAuth && refreshToken) {
      dispatch(getRefreshToken());
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className={app.main}>
      <AppHeader />
      <main className={`${app.content} pl-5 pr-5 mt-5`}>
        <Switch location={background || location}>
          <Route path="/ingredient" exact>
            <Ingredient />
          </Route>
          <ProtectedRoute path="/register" onlyUnAuth>
            <Register />
          </ProtectedRoute>
          <ProtectedRoute path="/reset-password" onlyUnAuth>
            <ResetPassword />
          </ProtectedRoute>
          <ProtectedRoute path="/forgot-password" onlyUnAuth>
            <ForgotPassword />
          </ProtectedRoute>
          <ProtectedRoute path="/login" onlyUnAuth>
            <Login />
          </ProtectedRoute>
          <Route path="/logout" exact>
            <LogOut />
          </Route>
          <ProtectedRoute path="/ingredients/:id" exact>
            <Ingredient />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/orders/:id">
            <OrderDescriptionPage />
          </ProtectedRoute>
          <ProtectedRoute path="/profile">
            <Profile />
          </ProtectedRoute>
          <Route path="/feed/:id">
            <OrderDescriptionPage />
          </Route>
          <Route path="/feed">
            <OrdersFeed />
          </Route>
          <Route path="/" exact>
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>

            <article className={app.constructorContainer}>
              <DndProvider backend={HTML5Backend}>
                {data && (
                  <>
                    <BurgerIngredients />
                    <BurgerConstructor />
                  </>
                )}{" "}
              </DndProvider>
            </article>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
        {background && (
          <Route path="/ingredients/:id">
            {location.state?.modalOpened && (
              <Modal title="Детали ингредиента" closeAllModals={closeModal}>
                <IngredientDetails />
              </Modal>
            )}
          </Route>
        )}
        {background && orderData?.length > 0 ? (
          <Route path="/profile/orders/:id">
            {location.state?.modalOpened && (
              <Modal
                title={"#"}
                closeAllModals={closeModal}
                getTitle
                styles="text text_type_digits-default"
              >
                <OrderDescription />
              </Modal>
            )}
          </Route>
        ) : (
          regOrdersURL.test(location.pathname) && (
            <Redirect to={{ pathname: location.pathname }} />
          )
        )}
        {background && orderData?.length > 0 ? (
          <Route path="/feed/:id">
            {location.state?.modalOpened && (
              <Modal
                title={"#"}
                closeAllModals={closeModal}
                getTitle
                styles="text text_type_digits-default"
              >
                <OrderDescription />
              </Modal>
            )}
          </Route>
        ) : (
          regFeedUrl.test(location.pathname) && (
            <Redirect to={{ pathname: location.pathname }} />
          )
        )}
      </main>
    </div>
  );
}
