"use client";

import { Button } from "@odeyalo/uikit";
import { type FC, useState } from "react";
import { HelpCategoryModal } from "./components";
import styles from "./styles.module.scss";
import {
  Container,
  ContentWrapper,
  LoadingLoop,
  PageTitle,
} from "@/client/components";
import { useGetHelpCategoriesQuery } from "@/client/redux";

const CARD_DESCRIPTIONS: Record<string, string> = {
  reflect: "Выяснить причины своего состояния",
  relax: "Вдох, выдох...",
  focus: "Настроиться на нужный лад",
};

export const AdvicesPage: FC = () => {
  const { data: categories, isLoading } = useGetHelpCategoriesQuery();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );

  if (isLoading) return <LoadingLoop />;

  return (
    <Container>
      <ContentWrapper>
        <PageTitle className={styles.title}>Что может помочь?</PageTitle>

        <div className={styles.grid}>
          {categories?.map((category) => (
            <div
              key={category.id}
              className={`${styles.card} ${styles[category.id] || ""}`}
            >
              <div className={styles.cardContent}>
                <div className={styles.textWrapper}>
                  <span className={styles.cardTitle}>{category.title}</span>
                  {CARD_DESCRIPTIONS[category.id] && (
                    <span className={styles.cardDescription}>
                      {CARD_DESCRIPTIONS[category.id]}
                    </span>
                  )}
                </div>
              </div>
              <Button
                type="button"
                width="max"
                view="primary"
                className={`${styles.cardButton} ${styles[`${category.id}Button`] || ""}`}
                onClick={() => setSelectedCategoryId(category.id)}
              >
                Приступить
              </Button>
            </div>
          ))}
        </div>

        {selectedCategoryId && (
          <HelpCategoryModal
            categoryId={selectedCategoryId}
            onClose={() => setSelectedCategoryId(null)}
          />
        )}
      </ContentWrapper>
    </Container>
  );
};
