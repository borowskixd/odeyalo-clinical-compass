"use client";

import { ArticleCard } from "../Articles/components";
import styles from "./styles.module.scss";
import { useParams } from "next/navigation";
import {
  Container,
  DefaultError,
  LoadingLoop,
  PageTitle,
} from "@/client/components";
import {
  useGetArticleByIdQuery,
  useGetArticlesQuery,
  useReadArticleMutation,
} from "@/client/redux";
import { type FC, useEffect } from "react";

export const ArticlePage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: article, ...getArticleState } = useGetArticleByIdQuery(id);
  const { data: articles, ...getArticlesState } = useGetArticlesQuery();
  const [readArticle] = useReadArticleMutation();

  useEffect(() => {
    if (article?.content.length) {
      const id = article.content[0].id;
      readArticle(id);
    }
  }, [readArticle, article]);

  if (getArticleState.isLoading || getArticlesState.isLoading)
    return <LoadingLoop />;
  if (getArticleState.isError)
    return <DefaultError error={getArticleState.error} />;
  if (getArticlesState.isError)
    return <DefaultError error={getArticlesState.error} />;

  const filteredArticles = articles
    ? articles.filter((el) => el.id !== id)
    : [];

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
      {filteredArticles.length && (
        <div className={styles.recomendations}>
          <PageTitle className={styles.recomendationsTitle}>
            Смотрите также
          </PageTitle>
          <div className={styles.articlesList}>
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
              />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};
