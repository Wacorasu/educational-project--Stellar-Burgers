import app from "./app.module.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppHeader from "../app-header/app-header.js";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.js";
import BurgerConstructor from "../burger-constructor/burger-constructor.js";
import { getData } from "../../services/actions/index";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
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
import { CLOSE_DETAIL_INGREDIENTS } from "../../services/actions/ingredient-details";

export default function App() {
  const isModalDetailsOpened = useSelector(
    (store) => store.ingredientDetail.isOpened
  );
  const ingredientDetail = useSelector(
    (store) => store.ingredientDetail.ingredientDetails
  );
  const data = useSelector((store) => store.allIngredients.data);
  const history = useHistory();
  const { isAuth } = useSelector((store) => store.authData);
  const dispatch = useDispatch();
  let location = useLocation();
  let background = location.state && location.state.background;

  function closeIngredientModal(e) {
    dispatch({ type: CLOSE_DETAIL_INGREDIENTS });
    history.goBack();
  }

  /* eslint-disable */ //TODO необходим запрос данным при монтировании компонента
  useEffect(() => {
    dispatch(getData());
  }, []);
  /* eslint-enable */

  useEffect(() => {
    dispatch(getUserData());
    let refreshToken = getCookie("refreshToken");
    if (!isAuth && refreshToken) {
      dispatch(getRefreshToken());
    }
     // eslint-disable-next-line
  }, [isAuth]);

  return (
    <div className={app.main}>
      <AppHeader />
      <main className={`${app.content} pl-5 pr-5 mt-5`}>
        <Switch location={background || location}>
          <Route path="/ingredient" exact>
            <Ingredient />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/reset-password" exact>
            <ResetPassword />
          </Route>
          <Route path="/forgot-password" exact>
            <ForgotPassword />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/logout" exact>
            <LogOut />
          </Route>
          <Route path="/ingredients/:id" exact>
            <Ingredient />
          </Route>
          <ProtectedRoute path="/profile" exact={true}>
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/order-history" exact={true}>
            <Profile />
          </ProtectedRoute>
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
            {isModalDetailsOpened && ingredientDetail && (
              <Modal
                title="Детали ингредиента"
                closeAllModals={closeIngredientModal}
              >
                <IngredientDetails data={ingredientDetail} />
              </Modal>
            )}
          </Route>
        )}
      </main>
    </div>
  );
}
