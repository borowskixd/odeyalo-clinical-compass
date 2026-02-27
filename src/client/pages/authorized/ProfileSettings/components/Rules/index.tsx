import { Button, Text } from "@odeyalo/uikit";
import { type FC, useState } from "react";
import { type SectionProps } from "../../types";
import { ProfileSection } from "../ProfileSection";
import { Modal, UserAgreement } from "@/client/components";

export const Rules: FC<SectionProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

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
        view="action"
        width="max"
        onClick={openModalHandler}
      >
        Политика конфиденциальности
      </Button>
      <Modal
        isOpen={isModalOpen}
        onCloseAction={closeModalHandler}
        title={
          "Пользовательское соглашение и политика конфиденциальности психологического приложения"
        }
        content={<UserAgreement />}
      />
    </ProfileSection>
  );
};
