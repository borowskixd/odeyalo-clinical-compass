"use client";

import { ProfileContent } from "./components";
import { Container, ContentWrapper } from "@/client/components";
import { ImageBackground } from "@/client/components/backgrounds";
import { type FC } from "react";

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
