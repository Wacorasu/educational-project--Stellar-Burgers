import modal from "./modal.module.css";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay.js";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const modalsContainer = document.querySelector("#modals");

export default function Modal({
  title = "",
  children,
  closeAllModals,
  getTitle,
  styles = "text text_type_main-large",
}) {
  const { id } = useParams();

  useEffect(() => {
    const onEscKeydown = (e) => {
      e.key === "Escape" && closeAllModals();
    };
    document.addEventListener("keydown", onEscKeydown);
    return () => {
      document.removeEventListener("keydown", onEscKeydown);
    };
    // eslint-disable-next-line
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={modal.container}>
        <div className={modal.main}>
          <div className={modal.titleContainer}>
            <h3 className={styles}>{getTitle ? `${title}${id}` : title}</h3>
            <CloseIcon type="primary" onClick={closeAllModals} />
          </div>
          {children}
        </div>
      </div>
      <ModalOverlay onClick={closeAllModals} />
    </>,
    modalsContainer
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  closeAllModals: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  styles: PropTypes.string,
  getTitle: PropTypes.bool,
};
