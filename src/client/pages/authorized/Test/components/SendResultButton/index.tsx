"use client";

import { useParams, useRouter } from "next/navigation";
import { type FC, useEffect } from "react";
import styles from "./styles.module.scss";
import { DefaultError, PrimaryButton } from "@/client/components";
import { useAppDispatch } from "@/client/hooks";
import { PopupsService, useSendTestResultMutation } from "@/client/redux";
import { useAnalytics } from "@/shared/analytics";
import { pages } from "@/shared/data";
import { type SendTestResultRequestData } from "@/shared/types";

interface SendResultButtonProps {
  disabled: boolean;
  currentQuestion: number;
  questionsCount: number;
  answers: SendTestResultRequestData["answers"];
}

export const SendResultButton: FC<SendResultButtonProps> = ({
  disabled,
  currentQuestion,
  questionsCount,
  answers,
}) => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { logEvent } = useAnalytics();

  const [sendTestResult, sendTestResultState] = useSendTestResultMutation();

  useEffect(() => {
    if (sendTestResultState.isSuccess) {
      const { testResultId } = sendTestResultState.data;
      router.push(pages.detailResult.getLink({ params: { id: testResultId } }));
      dispatch(PopupsService.openSnackbarWithDelay("Тест успешно пройден!"));
      logEvent("test-passed", {
        test_id: id,
      });
    }
  }, [
    id,
    sendTestResultState.isSuccess,
    sendTestResultState.data,
    dispatch,
    router,
    logEvent,
  ]);

  if (sendTestResultState.isError)
    return <DefaultError error={sendTestResultState.error} />;

  const sendTestResultHandler = () => {
    sendTestResult({
      testId: id,
      answers,
    });
  };

  return (
    <PrimaryButton
      disabled={
        disabled ||
        sendTestResultState.isLoading ||
        sendTestResultState.isSuccess
      }
      onClick={sendTestResultHandler}
      className={styles.button}
    >
      {disabled ? `${currentQuestion} из ${questionsCount}` : "Закончить тест"}
    </PrimaryButton>
  );
};
