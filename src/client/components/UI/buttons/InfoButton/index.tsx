"use client";

import { Button, Icons20 } from "@odeyalo/uikit";
import { type FC, useState } from "react";
import styles from "./styles.module.scss";
import { PageTitle } from "@/client/components";

interface InfoButtonProps {
  title?: string;
  popupText: string;
}

export const InfoButton: FC<InfoButtonProps> = ({ title, popupText }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className={styles.container}>
      <Button
        type="button"
        aria-label="Показать описание"
        aria-expanded={isPopupOpen}
        aria-haspopup="dialog"
        onClick={() => setIsPopupOpen(!isPopupOpen)}
        size="s"
        width="auto"
        className={styles.infoButton}
      >
        <Icons20.QuestionMarkCircleIcon />
      </Button>

      {isPopupOpen && (
        <>
          <div
            className={styles.overlay}
            onClick={() => setIsPopupOpen(false)}
          />
          <div
            className={styles.popup}
            role="dialog"
            aria-label={title ?? "Описание"}
            aria-modal="true"
          >
            {title && (
              <PageTitle className={styles.popupTitle}>{title}</PageTitle>
            )}

            <div className={styles.popupText}>{popupText}</div>

            <Button
              type="button"
              onClick={() => setIsPopupOpen(false)}
              view="primary"
              size="s"
              width="auto"
              className={styles.closeButton}
            >
              Все понял
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
