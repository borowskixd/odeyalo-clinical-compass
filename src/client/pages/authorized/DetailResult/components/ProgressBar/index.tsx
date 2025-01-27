"use client";

import styles from "./styles.module.scss";
import { type GetTestResultResponseData } from "@/shared/types";
import { type FC } from "react";

interface ProgressBarProps {
  scale: GetTestResultResponseData["scales"][number];
  result: number;
}

export const ProgressBar: FC<ProgressBarProps> = ({ scale, result }) => {
  const { title, min, max } = scale;

  const color = scale.borders.reduce((acc, border) => {
    if (result <= border.rightBorder && result >= border.leftBorder)
      acc = border.color;

    return acc;
  }, "");

  const percent = (max - min) / 100;
  const valuePercent = (result - min) / percent;

  return (
    <div className={styles.result}>
      <h4
        className={styles.resultTitle}
        style={{ backgroundColor: color + "30" }}
      >
        {title}
      </h4>
      <div className={styles.progressBar}>
        <div
          className={styles.progressLine}
          style={{ backgroundColor: color + "30" }}
        >
          <div
            className={styles.progress}
            style={{ width: `${valuePercent}%`, backgroundColor: color }}
          ></div>
        </div>
        <div className={styles.values}>
          <div>{result}</div>
          <div>{max}</div>
        </div>
      </div>
    </div>
  );
};
