"use client";

import { SendResultButton } from "../SendResultButton";
import styles from "./styles.module.scss";
import { notFound, useParams } from "next/navigation";
import { ArrowIcon } from "@/client/assets/icons";
import { DefaultError, LoadingLoop, PageTitle } from "@/client/components";
import { useGetTestQuestionsQuery } from "@/client/redux";
import { type SendTestResultRequestData } from "@/shared/types";
import { Button } from "@odeyalo/uikit";
import { type FC, useEffect, useRef, useState } from "react";

export const TestContent: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentQuestionNumber, setCurrentQuestion] = useState(0);
  const [sendButtonDisabled, setSendButtonDisabled] = useState<boolean>(true);
  const [answers, setAnswers] = useState<SendTestResultRequestData["answers"]>(
    [],
  );

  const { data: test, ...getTestState } = useGetTestQuestionsQuery(id);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (test) {
      setAnswers(new Array(test.questions.length).fill(undefined));
    }
  }, [test]);

  useEffect(() => {
    const allAnswersSelected = answers.every((val) => typeof val === "number");
    setSendButtonDisabled(!allAnswersSelected);
  }, [answers]);

  useEffect(() => {
    if (!test) return;

    const currentQuestion = test.questions[currentQuestionNumber];
    const currentSavedAnswer = answers[currentQuestionNumber];

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    if (currentSavedAnswer !== undefined) {
      const selectedIndex = currentQuestion.answerChoices.findIndex(
        (answer) => answer.score === currentSavedAnswer,
      );

      if (selectedIndex !== -1 && buttonRefs.current[selectedIndex]) {
        buttonRefs.current[selectedIndex]?.focus();
      }
    }
  }, [currentQuestionNumber, answers, test]);

  if (getTestState.isLoading) return <LoadingLoop />;
  if (getTestState.isError) return <DefaultError error={getTestState.error} />;
  if (!test) notFound();

  const currentQuestion = test.questions[currentQuestionNumber];
  const currentSavedAnswer = answers[currentQuestionNumber];

  buttonRefs.current = buttonRefs.current.slice(
    0,
    currentQuestion.answerChoices.length,
  );

  const selectAnswerHandler = (score: number) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestionNumber] = score;
      return newAnswers;
    });

    if (currentQuestionNumber !== test.questions.length - 1) {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }

      requestAnimationFrame(() => {
        setTimeout(() => {
          setCurrentQuestion(currentQuestionNumber + 1);
        }, 50);
      });
    }
  };

  const nextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
  };

  const prevQuestion = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  const nextButtonDisabled =
    currentQuestionNumber + 1 >= test.questions.length ||
    typeof answers[currentQuestionNumber] !== "number";

  return (
    <>
      <PageTitle className={styles.title}>{test.title}</PageTitle>
      <h4 className={styles.question}>{currentQuestion.text}</h4>
      <div className={styles.answerButtons}>
        {currentQuestion.answerChoices.map((answer, index) => {
          const isSelected = currentSavedAnswer === answer.score;

          return (
            <Button
              key={answer.id}
              ref={(el: HTMLButtonElement | null) => {
                buttonRefs.current[index] = el;
              }}
              className={`${styles.answerButton} ${isSelected ? styles.selected : ""}`}
              onClick={() => selectAnswerHandler(answer.score)}
              view="normal"
              variant={isSelected ? "primary" : "secondary"}
            >
              {answer.text}
            </Button>
          );
        })}
      </div>
      <h4 className={styles.question}>{currentQuestion.oppositeText}</h4>
      <div className={styles.buttons}>
        <Button
          className={styles.navButton}
          onClick={prevQuestion}
          disabled={currentQuestionNumber <= 0}
          view="normal"
          variant="text"
        >
          <ArrowIcon className={styles.backIcon} />
          Назад
        </Button>
        <SendResultButton
          disabled={sendButtonDisabled}
          currentQuestion={currentQuestionNumber + 1}
          questionsCount={test.questions.length}
          answers={answers}
        />
        <Button
          className={styles.navButton}
          onClick={nextQuestion}
          disabled={nextButtonDisabled}
          view="normal"
          variant="text"
        >
          Далее
          <ArrowIcon />
        </Button>
      </div>
    </>
  );
};
