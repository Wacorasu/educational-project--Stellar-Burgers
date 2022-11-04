import modalOverlay from "./modal-overlay.module.css";
import React from "react";
import PropTypes from "prop-types";

export default function ModalOverlay({onClick}) {
  return (
    <div className={modalOverlay.main} onClick={onClick}>
    </div>
  );
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};
