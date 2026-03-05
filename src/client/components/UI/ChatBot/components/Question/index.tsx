import { FC } from "react";
import styles from "./styles.module.scss";
import { Button } from "@/client/components";
import { useAppDispatch } from "@/client/hooks";
import { chatBotActions } from "@/client/redux";
import { GetChatBotQuestionsResponseData } from "@/shared/types";

interface QuestionProps {
  question: GetChatBotQuestionsResponseData[number];
  onSelectQuestion: () => void;
}

export const Question: FC<QuestionProps> = ({ question, onSelectQuestion }) => {
  const dispatch = useAppDispatch();

  const handleSelectQuestion = () => {
    onSelectQuestion();
    dispatch(chatBotActions.showMessages());
    dispatch(
      chatBotActions.addMessage({
        message: question.question,
        author: "user",
      }),
    );
    dispatch(
      chatBotActions.addMessage({
        message: question.answer,
        author: "bot",
      }),
    );
  };

  return (
    <Button
      className={styles.button}
      onClick={handleSelectQuestion}
    >
      {question.question}
    </Button>
  );
};
