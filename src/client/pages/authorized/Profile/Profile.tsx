"use client";

import { ProfileContent } from "./components";
import { Container, ContentWrapper } from "@/client/components";
import { type FC } from "react";

export const ProfilePage: FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <ProfileContent />
      </ContentWrapper>
    </Container>
  );
};
