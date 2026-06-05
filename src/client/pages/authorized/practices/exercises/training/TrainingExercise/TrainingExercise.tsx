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
    if (currentAnswer?.correct) {
      setCurrentQuestionNumber((prev) => prev + 1);
    }
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
    const showNextQuestionButton =
      answerSelected && !(currentAnswer?.correct && isLastQuestion);
    const buttonDisabled =
      !currentAnswer ||
      (currentAnswer && showNextQuestionButton) ||
      completeTrainingExerciseMutation.isLoading;

    const handleClickButton = () => {
      if (!answerSelected) {
        setAnswerSelected(true);
      } else if (isLastQuestion && currentAnswer?.correct) {
        completeTrainingExercise(id);
      }
    };

    return (
      <section>
        <header className={styles.header}>
          {currentQuestion.formulation && (
            <PageTitle
              variant="body-m"
              as="p"
              className={styles.title}
            >
              {currentQuestion.formulation}
            </PageTitle>
          )}
          <Text
            variant="body-xl"
            as="h4"
            className={styles.question}
          >
            {currentQuestion.question}
          </Text>
        </header>
        <div className={styles.answerButtons}>
          {!answerSelected &&
            currentQuestion.answers.map((answer) => {
              const isSelected = answer.id === currentAnswer?.id;

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
          <>
            <Text
              variant="title-cygre"
              as="h4"
              className={styles.correct}
            >
              {currentAnswer.correct ? "Верно!" : "Неверно, попробуйте еще"}
            </Text>
            <div className={styles.explanation}>
              <Text variant="body-xl">{currentAnswer.explanation}</Text>
            </div>
          </>
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
              : isLastQuestion && currentAnswer?.correct
                ? "Завершить"
                : `${currentQuestionNumber + 1} из ${questionsCount}`}
          </Button>
          {showNextQuestionButton && (
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
      </section>
    );
  };

  return (
    <Container className={styles.container}>
      <ContentWrapper>{renderContent()}</ContentWrapper>
    </Container>
  );
};
