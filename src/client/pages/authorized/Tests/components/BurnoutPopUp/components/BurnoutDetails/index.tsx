"use client";

import { type FC } from "react";
import styles from "./styles.module.scss";

interface BurnoutDetailsProps {
  level: {
    title: string;
    meaning: string;
    recommendations: readonly string[];
  };
}

export const BurnoutDetails: FC<BurnoutDetailsProps> = ({ level }) => {
  return (
    <div className={styles.container}>
      <p className={styles.meaning}>
        <strong>Что это значит:</strong> {level.meaning}
      </p>
      <div className={styles.recommendations}>
        <strong>Рекомендации:</strong>
        <ul>
          {level.recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
