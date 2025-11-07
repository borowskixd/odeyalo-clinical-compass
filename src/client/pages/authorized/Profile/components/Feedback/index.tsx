import { type SectionProps } from "../../types";
import { ProfileSection } from "../ProfileSection";
import { Button, Text } from "@odeyalo/uikit";
import { type FC } from "react";

export const Feedback: FC<SectionProps> = (props) => {
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
      >
        Написать в Telegram
      </Button>
      <Button
        view="action"
        width="max"
      >
        Написать письмо
      </Button>
    </ProfileSection>
  );
};
