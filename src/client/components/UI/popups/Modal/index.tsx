"use client";

import { Portal } from "@odeyalo/uikit";
import { type FC, type MouseEvent, type ReactNode, useEffect } from "react";
import styles from "./styles.module.scss";
import { CloseIcon } from "@/client/assets/icons";

interface Props {
  isOpen: boolean;
  onCloseAction: () => void;
  title: string;
  content: ReactNode;
}

export const Modal: FC<Props> = ({ isOpen, title, onCloseAction, content }) => {
  const modalsPortal = document.getElementById("modals");

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("disable-scroll");
    } else {
      document.body.classList.remove("disable-scroll");
    }

    return () => {
      document.body.classList.remove("disable-scroll");
    };
  }, [isOpen]);

  const clickContainerHandler = (event: MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) {
      onCloseAction();
    }
  };

  return (
    <Portal container={modalsPortal}>
      <div
        className={`${styles.container} ${isOpen ? styles.opened : ""}`}
        onClick={clickContainerHandler}
      >
        <div className={styles.modal}>
          <div className={styles.header}>
            <h4 className={styles.title}>{title}</h4>
            <button
              onClick={onCloseAction}
              className={styles.closeButton}
            >
              <CloseIcon className={styles.closeIcon} />
            </button>
          </div>
          <div className={styles.main}>{content}</div>
        </div>
      </div>
    </Portal>
  );
};
