import modal from "./modal.module.css";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import {ModalOverlay} from "../modalOverlay/modalOverlay.js";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const modalsContainer = document.querySelector("#modals");

export default function Modal({
  title,
  onOverlayClick,
  onEscKeydown,
  children,
}) {
  useEffect(() => {
    document.addEventListener("keydown", onEscKeydown);

    return () => {
      document.removeEventListener("keydown", onEscKeydown);
    };
  }, []);

  const modalRef = React.useRef(null);

  function handleClick(e) {
    if (e.target===modalRef.current){
        onOverlayClick();
    }
  }

  return ReactDOM.createPortal(
    <ModalOverlay onClick={handleClick} ref={modalRef}>
      <div className={modal.main}>
        <div className={modal.titleContainer}>
          <h3 className="text text_type_main-large">{title}</h3>
          <CloseIcon type="primary" onClick={onOverlayClick} />
        </div>
        {children}
      </div>
    </ModalOverlay>,

    modalsContainer
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onOverlayClick: PropTypes.func.isRequired,
  onEscKeydown: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
