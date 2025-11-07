import { type SectionProps } from "../../types";
import { ProfileSection } from "../ProfileSection";
import { Button, Text } from "@odeyalo/uikit";
import { type FC } from "react";

export const Rules: FC<SectionProps> = (props) => {
  return (
    <ProfileSection
      title="Правила"
      {...props}
    >
      <Text variant="body-l">
        {`Это приложение для людей, готовых столкнуться со своими страхами и
побороть их. В этом могут помочь психологи, использующие приложение.

Перед началом работы психологи проходят отбор. Это необходимо для лучшей
работы сервиса.

Гарантируем конфиденциальность и неразглашение персональной информации.`}
      </Text>
      <Button
        view="action"
        width="max"
      >
        Политика конфиденциальности
      </Button>
      <Button
        view="action"
        width="max"
      >
        Оферта
      </Button>
    </ProfileSection>
  );
};
