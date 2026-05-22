import { Button, Icons20 } from "@odeyalo/uikit";
import { type FC, useState } from "react";
import styles from "./styles.module.scss";

interface InfoButtonProps {
  popupText: string;
}

export const InfoButton: FC<InfoButtonProps> = ({ popupText }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className={styles.container}>
      <Button
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
          <div className={styles.popup}>
            <div className={styles.popupText}>{popupText}</div>
            <Button
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
