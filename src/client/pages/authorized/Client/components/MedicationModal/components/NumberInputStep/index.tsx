import { Button } from "@odeyalo/uikit";
import { type FC, useState } from "react";
import styles from "./styles.module.scss";
import { type SchemeNode } from "@/shared/data";

type NumberInputNode = Extract<SchemeNode, { type: "number-input" }>;

interface NumberInputStepProps {
  node: NumberInputNode;
  initialValue?: number;
  onSubmit: (value: number) => void;
  onBack?: () => void;
}

export const NumberInputStep: FC<NumberInputStepProps> = ({
  node,
  initialValue,
  onSubmit,
  onBack,
}) => {
  const [value, setValue] = useState<string>(
    initialValue !== undefined ? String(initialValue) : "",
  );

  const parsed = Number(value);
  const isValid =
    value.trim() !== "" &&
    !Number.isNaN(parsed) &&
    (node.min === undefined || parsed >= node.min) &&
    (node.max === undefined || parsed <= node.max);

  const handleSubmit = () => {
    if (isValid) onSubmit(parsed);
  };

  return (
    <div className={styles.step}>
      <h3 className={styles.question}>{node.text}</h3>
      <input
        className={styles.numberInput}
        type="number"
        min={node.min}
        max={node.max}
        placeholder={node.placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
      />
      <div className={styles.actions}>
        {onBack && (
          <Button
            view="unstyled"
            onClick={onBack}
          >
            Назад
          </Button>
        )}
        <Button
          view="primary"
          onClick={handleSubmit}
          disabled={!isValid}
        >
          Далее
        </Button>
      </div>
    </div>
  );
};
