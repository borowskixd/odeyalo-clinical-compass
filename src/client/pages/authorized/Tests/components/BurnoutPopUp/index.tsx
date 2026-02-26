"use client";

import { Icons20 } from "@odeyalo/uikit";
import { type FC, useState } from "react";
import { BURNOUT_LEVELS } from "../constants";
import { BurnoutDetails } from "./components/BurnoutDetails";
import styles from "./styles.module.scss";

interface BurnoutPopUpProps {
  onClose: () => void;
}

export const BurnoutPopUp: FC<BurnoutPopUpProps> = ({ onClose }) => {
  const [showDetails, setShowDetails] = useState(false);

  const result = 0.8;

  const getBurnoutLevel = (result: number) => {
    if (result < 0.33) {
      return {
        text: BURNOUT_LEVELS.LOW.title,
        icon: <Icons20.FaceSmileIcon />,
        details: BURNOUT_LEVELS.LOW,
      };
    } else if (result > 0.66) {
      return {
        text: BURNOUT_LEVELS.HIGH.title,
        icon: <Icons20.FaceFrownIcon />,
        details: BURNOUT_LEVELS.HIGH,
      };
    } else {
      return {
        text: BURNOUT_LEVELS.MEDIUM.title,
        icon: <Icons20.FaceFrownIcon />,
        details: BURNOUT_LEVELS.MEDIUM,
      };
    }
  };

  const level = getBurnoutLevel(result);

  const fillWidth = `${result * 100}%`;

  const handleDetailsClick = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
    >
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.iconTopLeft}>{level.icon}</div>

        <button
          className={styles.detailsButton}
          onClick={handleDetailsClick}
        >
          <Icons20.QuestionMarkCircleIcon />
          Подробнее
        </button>

        <div className={styles.content}>
          <h2 className={styles.title}>{level.text}</h2>

          <div className={styles.scaleContainer}>
            <div className={styles.scale}>
              <div
                className={styles.scaleFill}
                style={{ width: fillWidth }}
              />
            </div>
          </div>

          {showDetails && (
            <div className={styles.detailsWrapper}>
              <BurnoutDetails level={level.details} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
