import { Button } from "@odeyalo/uikit";
import { type FC } from "react";
import styles from "./styles.module.scss";
import { type SchemeNode } from "@/shared/data";

type ResultNode = Extract<SchemeNode, { type: "result" }>;

interface ResultStepProps {
  result: ResultNode;
  onRestart: () => void;
  onClose: () => void;
}

export const ResultStep: FC<ResultStepProps> = ({ result, onClose }) => {
  return (
    <div className={styles.step}>
      <p className={styles.resultText}>{result.text}</p>
      <div className={styles.actions}>
        <Button
          view="primary"
          onClick={onClose}
        >
          Готово
        </Button>
      </div>
    </div>
  );
};
