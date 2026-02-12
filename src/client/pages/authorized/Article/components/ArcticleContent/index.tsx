"use client";

import { Recommendation, Subtopics } from "./components";
import styles from "./styles.module.scss";
import { useParams, useRouter } from "next/navigation";
import { DefaultError, LoadingLoop, PageTitle } from "@/client/components";
import { useGetArticleByIdQuery, useReadArticleMutation } from "@/client/redux";
import { useAnalytics } from "@/shared/analytics";
import { pages } from "@/shared/data";
import { Button } from "@odeyalo/uikit";
import { type FC, useEffect } from "react";

export const ArticleContent: FC = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { logEvent } = useAnalytics();

  const { data: article, ...getArticleState } = useGetArticleByIdQuery(id);
  const [readArticle, { isLoading, isSuccess }] = useReadArticleMutation();

  useEffect(() => {
    logEvent("theory-page-opened", {
      theory_id: id,
    });
  }, [id, logEvent]);

  useEffect(() => {
    if (isSuccess) {
      router.push(pages.articles.path);
      logEvent("theory-read", {
        theory_id: id,
      });
    }
  }, [isSuccess, router, id, logEvent]);

  const readArticleHandler = () => {
    if (article) {
      readArticle(id);
    }
  };

  if (getArticleState.isLoading) return <LoadingLoop />;
  if (getArticleState.isError)
    return <DefaultError error={getArticleState.error} />;

  if (!article) return <div>Статья не найдена</div>;

  const isRead = article.subtopics.findIndex((el) => el.read) !== -1;

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
        <div>
          <Subtopics subtopics={article.subtopics} />
          <Button
            width="max"
            view={isRead ? "normal" : "action"}
            onClick={readArticleHandler}
            disabled={isLoading || isRead}
          >
            {isRead ? "Прочитано" : "Все понял!"}
          </Button>
        </div>
        <Recommendation recommendations={article.recommendations} />
      </div>
    </>
  );
};
