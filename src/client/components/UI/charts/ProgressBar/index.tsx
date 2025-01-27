import styles from "./styles.module.scss";
import { type FC } from "react";

interface Props {
  value: number;
  min: number;
  max: number;
  color: string;
  className?: string;
}

export const ProgressBar: FC<Props> = ({
  value,
  min,
  max,
  color,
  className = "",
}) => {
  const percent = (max - min) / 100;
  const valuePercent = (value - min) / percent;

  return (
    <div className={`${styles.progressBar} ${className}`}>
      <div
        className={styles.progressLine}
        style={{ backgroundColor: color + "30" }}
      >
        <div
          className={styles.progress}
          style={{ width: `${valuePercent}%`, backgroundColor: color }}
        ></div>
      </div>
      {/* <div className={styles.values}>
          {borders.map((el, index) => {
            return (
              <div
                key={el.leftBorder}
                className={styles.range}
                style={{
                  width: `${
                    (index === 0
                      ? el.rightBorder - el.leftBorder
                      : el.rightBorder -
                        el.leftBorder +
                        percent * (borders.length + 1)) / percent
                  }%`,
                  color: el.color,
                }}
              >
                <span>[{el.leftBorder}</span>
                <span>{el.rightBorder}]</span>
              </div>
            );
          })}
        </div> */}
      <div className={styles.values}>
        <div>{value}</div>
        <div>{max}</div>
      </div>
    </div>
  );
};
