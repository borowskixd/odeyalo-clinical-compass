import { AppLink, Container, ContentWrapper } from "@/client/components";
import { pages } from "@/shared/data";
import { type FC } from "react";

export const ProfilePage: FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <AppLink href={pages.profileSettings.path}>Настройки</AppLink>
      </ContentWrapper>
    </Container>
  );
};
