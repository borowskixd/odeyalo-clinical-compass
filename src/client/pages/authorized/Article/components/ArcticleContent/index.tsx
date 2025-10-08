"use client";

import { Recommendation, Subtopics } from "./components";
import styles from "./styles.module.scss";
import { useParams } from "next/navigation";
import { DefaultError, LoadingLoop, PageTitle } from "@/client/components";
import { useGetArticleByIdQuery, useReadArticleMutation } from "@/client/redux";
import { type FC, useEffect } from "react";

export const ArticleContent: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: article, ...getArticleState } = useGetArticleByIdQuery(id);
  const [readArticle] = useReadArticleMutation();

  useEffect(() => {
    if (article) {
      readArticle(id);
    }
  }, [readArticle, article, id]);

  if (getArticleState.isLoading) return <LoadingLoop />;
  if (getArticleState.isError)
    return <DefaultError error={getArticleState.error} />;

  if (!article) return <div>Статья не найдена</div>;

  return (
    <>
      <div className={styles.imageContainer}>
        <img
          src={article?.linkToPicture}
          className={styles.image}
        />
      </div>
      <PageTitle>{article?.title}</PageTitle>
      <div className={styles.main}>
        <Subtopics subtopics={article.subtopics} />
        <Recommendation recommendations={article.recommendations} />
      </div>
    </>
  );
};
