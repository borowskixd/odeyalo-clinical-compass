import { Button, Text } from "@odeyalo/uikit";
import { type FC } from "react";
import { type SectionProps } from "../../types";
import { ProfileSection } from "../ProfileSection";
import { pages } from "@/shared/data";

export const Rules: FC<SectionProps> = (props) => {
  return (
    <ProfileSection
      title="Правила"
      {...props}
    >
      <Text variant="body-l">
        {`Это приложение для людей, готовых столкнуться со своими страхами и побороть их. В этом могут помочь психологи, использующие приложение.

Перед началом работы психологи проходят отбор. Это необходимо для лучшей работы сервиса.

Гарантируем конфиденциальность и неразглашение персональной информации.`}
      </Text>
      <Button
        view="primary"
        width="max"
        href={pages.policy.path}
        target="_blank"
      >
        Политика конфиденциальности
      </Button>
    </ProfileSection>
  );
};
