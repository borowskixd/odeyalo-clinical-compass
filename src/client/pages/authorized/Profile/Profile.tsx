"use client";

import { type FC } from "react";
import { ProfileContent } from "./components";
import { Container, ContentWrapper } from "@/client/components";
import { ImageBackground } from "@/client/components/backgrounds";

export const ProfilePage: FC = () => {
  return (
    <Container>
      <ImageBackground />
      <ContentWrapper>
        <ProfileContent />
      </ContentWrapper>
    </Container>
  );
};
