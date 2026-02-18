"use client";

import { Icon, Icons24Solid } from "@odeyalo/uikit";
import Link from "next/link";
import { type FC, type ReactNode } from "react";
import styles from "./styles.module.scss";
import { Container, ContentWrapper, PageTitle } from "@/client/components";
import { FormBackground } from "@/client/components/backgrounds";

interface FormPageLayoutProps {
  title: ReactNode;
  children: ReactNode;
  comeBackLink?: string;
}

export const FormPageLayout: FC<FormPageLayoutProps> = ({
  title,
  children,
  comeBackLink,
}) => {
  return (
    <Container className={styles.container}>
      <div
        className={`${styles.content} ${comeBackLink ? styles.hasComeBackButton : ""}`}
      >
        <FormBackground />
        {comeBackLink && (
          <div className={styles.comeBackButtonWrapper}>
            <Link
              href={comeBackLink}
              className={styles.comeBackButton}
            >
              <Icon data={Icons24Solid.ChevronRightIcon} />
            </Link>
          </div>
        )}
        <ContentWrapper className={styles.formContainer}>
          <PageTitle className={styles.title}>{title}</PageTitle>
          {children}
        </ContentWrapper>
      </div>
    </Container>
  );
};
