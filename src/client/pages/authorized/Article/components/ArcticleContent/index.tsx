"use client";

import { Recomendation, Subtopic } from "./components";
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
    if (article?.subtopics.length) {
      readArticle(id);
    }
  }, [readArticle, article, id]);

  if (getArticleState.isLoading) return <LoadingLoop />;
  if (getArticleState.isError)
    return <DefaultError error={getArticleState.error} />;

  return (
    <>
      <div className={styles.imageContainer}>
        <img
          src={article.linkToPicture}
          className={styles.image}
        />
      </div>
      <PageTitle>{article?.title}</PageTitle>
      <div className={styles.main}>
        <Subtopic />
        <Recomendation />
      </div>
    </>
  );
};
