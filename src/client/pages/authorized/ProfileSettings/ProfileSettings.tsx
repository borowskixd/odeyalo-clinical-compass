"use client";

import { Icons20 } from "@odeyalo/uikit";
import { type FC, useState } from "react";
import {
  EditProfile,
  Feedback,
  LogoutButtons,
  NavButtons,
  ProfileImage,
  Rules,
} from "./components";
import styles from "./styles.module.scss";
import { Container, ContentWrapper, PageTitle } from "@/client/components";
import { ImageBackground } from "@/client/components/backgrounds";

const buttons = [
  {
    key: "edit",
    title: "Редактирование данных",
    icon: Icons20.PencilIcon,
    component: EditProfile,
  },
  {
    key: "rules",
    title: "Правила",
    icon: Icons20.InformationCircleIcon,
    component: Rules,
  },
  {
    key: "feedback",
    title: "Обратная связь",
    icon: Icons20.ChatBubbleLeftRightIcon,
    component: Feedback,
  },
];

export const ProfileSettingsPage: FC = () => {
  const [activeButtonKey, setActiveButtonKey] = useState<string | null>(null);

  const changeComponentHandler = (key: string) => {
    setActiveButtonKey(key);
  };

  const deleteActiveButtonKey = () => {
    setActiveButtonKey(null);
  };

  const activeButton = buttons.find((el) => el.key === activeButtonKey);

  const ActiveComponent = activeButton?.component;

  return (
    <Container className={styles.container}>
      <ImageBackground />
      <ContentWrapper className={styles.profile}>
        <PageTitle className={styles.title}>Профиль</PageTitle>
        <ProfileImage />
        <NavButtons
          buttons={buttons.map((button) => ({
            ...button,
            active: activeButtonKey === button.key,
          }))}
          onClick={changeComponentHandler}
        />
        <LogoutButtons />
      </ContentWrapper>
      {ActiveComponent && <ActiveComponent onBack={deleteActiveButtonKey} />}
    </Container>
  );
};
