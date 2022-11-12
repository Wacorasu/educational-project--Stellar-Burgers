import modal from "./modal.module.css";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay.js";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const modalsContainer = document.querySelector("#modals");

export default function Modal({ title='', children, closeAllModals }) {
  useEffect(() => {
    const onEscKeydown = (e) => {
      e.key === "Escape" && closeAllModals();
    };
    document.addEventListener("keydown", onEscKeydown);
    return () => {
      document.removeEventListener("keydown", onEscKeydown);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={modal.container}>
        <div className={modal.main}>
          <div className={modal.titleContainer}>
            <h3 className="text text_type_main-large">{title}</h3>
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
};
