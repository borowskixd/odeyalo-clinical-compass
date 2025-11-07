import styles from "./styles.module.scss";
import { Container, ContentWrapper, PageTitle } from "@/client/components";
import { ImageBackground } from "@/client/components/backgrounds";
import { type FC } from "react";

export const ProfilePage: FC = () => {
  return (
    <Container>
      <ImageBackground />
      <ContentWrapper className={styles.profile}>
        <PageTitle className={styles.title}>Профиль</PageTitle>
      </ContentWrapper>
    </Container>
  );
};
