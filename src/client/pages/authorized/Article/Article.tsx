"use client";

import styles from "./styles.module.scss";
import { useParams } from "next/navigation";
import {
  Container,
  ContentWrapper,
  DefaultError,
  LoadingLoop,
  PageTitle,
} from "@/client/components";
import { useGetArticleByIdQuery, useReadArticleMutation } from "@/client/redux";
import { type FC, useEffect } from "react";

export const ArticlePage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: article, ...getArticleState } = useGetArticleByIdQuery(id);
  const [readArticle] = useReadArticleMutation();

  useEffect(() => {
    if (article?.content.length) {
      const id = article.content[0].id;
      readArticle(id);
    }
  }, [readArticle, article]);

  if (getArticleState.isLoading) return <LoadingLoop />;
  if (getArticleState.isError)
    return <DefaultError error={getArticleState.error} />;

  return (
    <Container>
      <ContentWrapper>
        {article && (
          <>
            <PageTitle>{article?.title}</PageTitle>
            <div className={styles.content}>
              {article?.content.map((el) => <p key={el.id}>{el.content}</p>)}
            </div>
          </>
        )}
      </ContentWrapper>
    </Container>
  );
};
