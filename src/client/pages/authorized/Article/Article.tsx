"use client";

import styles from "./styles.module.scss";
import { useParams } from "next/navigation";
import {
  Container,
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
    <Container className={styles.container}>
      {article && (
        <div className={styles.main}>
          <PageTitle className={styles.title}>{article?.title}</PageTitle>
          <div className={styles.content}>
            {article?.content.map((el) => (
              <div
                className={styles.contentItem}
                key={el.id}
              >
                {el.content}
              </div>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};
