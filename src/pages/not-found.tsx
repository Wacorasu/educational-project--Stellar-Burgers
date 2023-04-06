import notFound from "./not-found.module.css";
import React, {FC} from "react";
import { Link } from "react-router-dom";


export const NotFound : FC = () => {
  return (
    <section className={notFound.page}>
      <div className={`${notFound.notFoundContainer} pt-25`}>
        <h2 className={`${notFound.title} text text_type_digits-large`}>
          404
        </h2>
        <p
          className={`${notFound.text} text text_type_main-large mb-4`}
        >
            Страница не найдена
        </p>
        <p
          className={`${notFound.text} text text_type_main-default text_color_inactive mb-4`}
        >
          <Link to={{ pathname: "/" }} className={notFound.link}>
            Вернуться на главную
          </Link>
        </p>
      </div>
    </section>
  );
}
