"use client";

import { SendResultButton } from "../SendResultButton";
import styles from "./styles.module.scss";
import { notFound, useParams } from "next/navigation";
import { ArrowIcon } from "@/client/assets/icons";
import {
  Button,
  DefaultError,
  LoadingLoop,
  PageTitle,
  Radio,
} from "@/client/components";
import { useGetTestQuestionsQuery } from "@/client/redux";
import { type SendTestResultRequestData } from "@/shared/types";
import { type FC, useState } from "react";

export const TestContent: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentQuestionNumber, setCurrentQuestion] = useState(0);
  const [sendButtonDisabled, setSendButtonDisabled] = useState<boolean>(true);
  const [answers, setAnswers] = useState<SendTestResultRequestData["answers"]>(
    [],
  );

  const { data: test, ...getTestState } = useGetTestQuestionsQuery(id);

  if (getTestState.isLoading) return <LoadingLoop />;
  if (getTestState.isError) return <DefaultError error={getTestState.error} />;
  if (!test) notFound();

  const selectAnswerHandler = (score: number) => {
    setAnswers((answers) => {
      answers[currentQuestionNumber] = score;

      setSendButtonDisabled(
        answers.length !== test.questions.length ||
          !answers.every((val) => typeof val === "number"),
      );

      return answers;
    });

    if (
      currentQuestionNumber >= answers.length &&
      currentQuestionNumber !== test.questions.length - 1
    )
      setTimeout(nextQuestion, 500);
  };

  const nextQuestion = () => {
    setCurrentQuestion((currentQuestionNumber) => currentQuestionNumber + 1);
  };

  const prevQuestion = () => {
    setCurrentQuestion((currentQuestionNumber) => currentQuestionNumber - 1);
  };

  const currentQuestion = test.questions[currentQuestionNumber];

  const nextButtonDisabled =
    currentQuestionNumber + 1 >= test.questions.length ||
    typeof answers[currentQuestionNumber] !== "number";

  return (
    <>
      <PageTitle className={styles.title}>{test.title}</PageTitle>
      <h4 className={styles.question}>{currentQuestion.title}</h4>
      <div className={styles.radioButtons}>
        {currentQuestion.answers.map((answer) => {
          return (
            <Radio
              key={answer.id}
              name="question"
              labelText={answer.text}
              onClick={() => selectAnswerHandler(answer.score)}
              defaultChecked={
                answers[currentQuestion.number - 1] === answer.score
              }
            />
          );
        })}
      </div>
      <div className={styles.buttons}>
        <Button
          className={styles.button}
          onClick={prevQuestion}
          disabled={currentQuestionNumber <= 0}
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
          className={styles.button}
          onClick={nextQuestion}
          disabled={nextButtonDisabled}
        >
          Далее
          <ArrowIcon />
        </Button>
      </div>
    </>
  );
};
