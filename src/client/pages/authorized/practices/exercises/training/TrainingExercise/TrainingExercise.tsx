"use client";

import { Button, Icon, Icons16, Text } from "@odeyalo/uikit";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import {
  Container,
  ContentWrapper,
  FormErrorLabel,
  LoadingLoop,
  PageTitle,
} from "@/client/components";
import {
  useCompleteTrainingExerciseMutation,
  useGetTrainingExerciseStructureQuery,
} from "@/client/redux";
import { mapApiErrorMessage } from "@/client/utils";
import { pages } from "@/shared/data";
import { GetTrainingExerciseStructureResponseData } from "@/shared/types";

type Answer =
  GetTrainingExerciseStructureResponseData["questions"][number]["answers"][number];

export const TrainingExercisePage = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const {
    data: trainingExerciseStructure,
    ...getTrainingExerciseStructureQuery
  } = useGetTrainingExerciseStructureQuery(id);
  const [completeTrainingExercise, completeTrainingExerciseMutation] =
    useCompleteTrainingExerciseMutation();
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(0);
  const [currentAnswer, setCurrentAnswer] = useState<Answer | null>(null);
  const [answerSelected, setAnswerSelected] = useState<boolean>(false);

  useEffect(() => {
    if (completeTrainingExerciseMutation.isSuccess) {
      router.push(pages.trainingExercisePreview.getLink({ params: { id } }));
    }
  }, [completeTrainingExerciseMutation.isSuccess, router, id]);

  const nextQuestion = () => {
    setCurrentQuestionNumber((prev) => prev + 1);
    setCurrentAnswer(null);
    setAnswerSelected(false);
  };

  const renderContent = () => {
    if (getTrainingExerciseStructureQuery.isLoading) return <LoadingLoop />;

    if (!trainingExerciseStructure || getTrainingExerciseStructureQuery.isError)
      return (
        <FormErrorLabel>
          {mapApiErrorMessage(getTrainingExerciseStructureQuery.error)}
        </FormErrorLabel>
      );

    const currentQuestion =
      trainingExerciseStructure.questions[currentQuestionNumber];

    const questionsCount = trainingExerciseStructure.questions.length;
    const isLastQuestion = currentQuestionNumber === questionsCount - 1;
    const buttonDisabled =
      !currentAnswer ||
      (currentAnswer && answerSelected && !isLastQuestion) ||
      completeTrainingExerciseMutation.isLoading;

    const handleClickButton = () => {
      if (!answerSelected) {
        setAnswerSelected(true);
      } else if (isLastQuestion) {
        completeTrainingExercise(id);
      }
    };

    return (
      <div>
        <PageTitle className={styles.title}>
          {trainingExerciseStructure.title}
        </PageTitle>
        <Text
          variant="body-xl"
          as="h4"
          className={styles.question}
        >
          {currentQuestionNumber + 1}. {currentQuestion.question}
        </Text>
        <div className={styles.answerButtons}>
          {currentQuestion.answers.map((answer) => {
            const isSelected = answer.id === currentAnswer?.id;

            if (answerSelected && !isSelected) return null;

            return (
              <Button
                readOnly={isSelected}
                key={answer.id}
                onClick={() => setCurrentAnswer(answer)}
                align="left"
                view={isSelected ? "primary" : "default"}
                width="max"
                ellipsis={false}
              >
                {answer.answer}
              </Button>
            );
          })}
        </div>
        {currentAnswer && answerSelected && (
          <div className={styles.explanation}>
            <Text variant="body-xl">{currentAnswer.explanation}</Text>
          </div>
        )}
        <div className={styles.buttons}>
          <Button
            shape="circle"
            width="max"
            onClick={handleClickButton}
            readOnly={buttonDisabled}
            view="inverse"
          >
            {currentAnswer && !answerSelected
              ? "Сохранить"
              : isLastQuestion
                ? "Завершить"
                : `${currentQuestionNumber + 1} из ${questionsCount}`}
          </Button>
          {answerSelected && !isLastQuestion && (
            <Button
              view="default"
              shape="circle"
              onClick={nextQuestion}
            >
              <Icon
                size={24}
                data={Icons16.ChevronRightIcon}
              />
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <Container className={styles.container}>
      <ContentWrapper>{renderContent()}</ContentWrapper>
    </Container>
  );
};
