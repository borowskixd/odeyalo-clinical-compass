import { Button, Icon, Icons24Solid, Text } from "@odeyalo/uikit";
import { FC } from "react";
import styles from "./styles.module.scss";
import { Question } from "@/client/components/UI/ChatBot/components/Question";
import { useGetChatBotQuestionsQuery } from "@/client/redux";

interface GroupProps {
  id: number;
  name: string;
  showQuestions: boolean;
  handleToggleQuestions: () => void;
  handleSelectQuestion: () => void;
}

export const Group: FC<GroupProps> = ({
  id,
  name,
  showQuestions,
  handleToggleQuestions,
  handleSelectQuestion,
}) => {
  const { data: questions, isLoading } = useGetChatBotQuestionsQuery(id);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Text variant="body-l-bold">{name}</Text>
        <Button
          onClick={handleToggleQuestions}
          size="xs"
          disabled={isLoading}
        >
          <Icon
            data={
              showQuestions
                ? Icons24Solid.ChevronUpIcon
                : Icons24Solid.ChevronDownIcon
            }
            size={24}
          />
        </Button>
      </header>
      {showQuestions && !!questions && (
        <div className={styles.questions}>
          {questions.map((question) => (
            <Question
              key={question.id}
              question={question}
              onSelectQuestion={handleSelectQuestion}
            />
          ))}
        </div>
      )}
    </div>
  );
};
