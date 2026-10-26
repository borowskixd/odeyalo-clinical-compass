import { Button } from "@odeyalo/uikit";
import { type FC } from "react";
import styles from "./styles.module.scss";
import { type SchemeNode } from "@/shared/data";

type QuestionNode = Extract<SchemeNode, { type: "question" }>;

interface QuestionStepProps {
  question: QuestionNode;
  onSelect: (nextId: string) => void;
  onBack?: () => void;
}

export const QuestionStep: FC<QuestionStepProps> = ({
  question,
  onSelect,
  onBack,
}) => {
  return (
    <div className={styles.step}>
      <h3 className={styles.question}>{question.text}</h3>
      <div className={styles.options}>
        {question.options.map((option) => (
          <Button
            key={option.label}
            view="default"
            width="max"
            align="left"
            ellipsis={false}
            onClick={() => onSelect(option.next)}
          >
            {option.label}
          </Button>
        ))}
      </div>
      {onBack && (
        <Button
          view="unstyled"
          onClick={onBack}
          className={styles.backButton}
        >
          Назад
        </Button>
      )}
    </div>
  );
};
