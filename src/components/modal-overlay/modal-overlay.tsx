import modalOverlay from "./modal-overlay.module.css";
import React, { FC } from "react";
import PropTypes from "prop-types";

export const ModalOverlay: FC<{ onClick: () => void }> = ({ onClick }) => {
  return <div className={modalOverlay.main} onClick={onClick}></div>;
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};
