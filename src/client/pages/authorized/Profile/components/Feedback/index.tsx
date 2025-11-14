"use client";

import { FEEDBACK_EMAIL } from "../../constants";
import { type SectionProps } from "../../types";
import { ProfileSection } from "../ProfileSection";
import { useAppDispatch } from "@/client/hooks";
import { PopupsService } from "@/client/redux";
import { Button, Text } from "@odeyalo/uikit";
import { type FC } from "react";

export const Feedback: FC<SectionProps> = (props) => {
  const dispatch = useAppDispatch();

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(FEEDBACK_EMAIL);

    dispatch(
      PopupsService.openSnackbarWithDelay("Почта скопирована в буфер обмена"),
    );
  };

  return (
    <ProfileSection
      title="Обратная связь"
      {...props}
    >
      <Text variant="body-l">
        Если вы обнаружили ошибку в приложении или у вас есть предложения для
        создателей, пожалуйста, свяжитесь с нами!
      </Text>
      <Button
        view="action"
        width="max"
        href="https://t.me/desman4"
        target="_blank"
      >
        Написать в Telegram
      </Button>
      <Button
        view="action"
        width="max"
        href={`mailto:${FEEDBACK_EMAIL}`}
        onClick={copyToClipboard}
      >
        Написать письмо
      </Button>
    </ProfileSection>
  );
};
