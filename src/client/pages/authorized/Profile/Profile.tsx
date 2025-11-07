"use client";

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
import { Icons20 } from "@odeyalo/uikit";
import { type FC, useState } from "react";

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

export const ProfilePage: FC = () => {
  const [activeButtonKey, setActiveButtonKey] = useState<string | null>(null);

  const changeComponentHandler = (key: string) => {
    setActiveButtonKey(key);
  };

  const deleteActiveButtonKey = () => {
    setActiveButtonKey(null);
  };

  const RenderComponent = () => {
    const el = buttons.find((el) => el.key === activeButtonKey);

    if (!el) return null;

    const Component = el.component;

    return <Component onBack={deleteActiveButtonKey} />;
  };

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
      <RenderComponent />
    </Container>
  );
};
