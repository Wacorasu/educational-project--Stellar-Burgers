import modalOverlay from "./modalOverlay.module.css";
import React from "react";
import PropTypes from 'prop-types';

export const ModalOverlay = React.forwardRef(({onClick, children}, ref) =>{

    return(
        <div className={modalOverlay.main} onClick={onClick} ref={ref}>{children}</div>
    )
});

ModalOverlay.propTypes={
    onClick:  PropTypes.func.isRequired,
    children:PropTypes.node.isRequired,
  }