"use client";

import { type FC } from "react";
import styles from "./styles.module.scss";

interface Props {
  card: {
    id: string;
    text: string;
    linkToPicture: string;
  };
}

export const Card: FC<Props> = ({ card }) => {
  return (
    <div key={card.id}>
      <div className={styles.textContainer}>
        <p className={styles.text}>{card.text}</p>
      </div>
      {card.linkToPicture !== "" && (
        <div className={styles.imageContainer}>
          <img
            src={card.linkToPicture}
            className={styles.image}
          />
        </div>
      )}
    </div>
  );
};
