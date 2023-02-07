import modal from "./modal.module.css";
import React, { useEffect, FC, ReactNode } from "react";
import ReactDOM from "react-dom";
import {ModalOverlay} from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";

const modalsContainer: Element | DocumentFragment | null =
  document.querySelector("#modals");

export const Modal: FC<{
  title?: string;
  closeAllModals: () => void;
  getTitle?: boolean;
  styles?: string;
  children: ReactNode;
}> = ({
  title = "",
  closeAllModals,
  getTitle,
  styles = "text text_type_main-large",
  children,
}) => {
  const { id }: { id: string } = useParams();

  useEffect(() => {
    const onEscKeydown = (e: KeyboardEvent) => {
      e.key === "Escape" && closeAllModals();
    };
    document.addEventListener("keydown", onEscKeydown);
    return () => {
      document.removeEventListener("keydown", onEscKeydown);
    };
    // eslint-disable-next-line
  }, []);

  return (
    modalsContainer &&
    ReactDOM.createPortal(
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
    )
  );
};
