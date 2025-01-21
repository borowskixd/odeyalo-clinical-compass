"use client";

import { ArticleCard } from "../ArticleCard";
import styles from "./styles.module.scss";
import { DefaultError, LoadingLoop, Subtitle } from "@/client/components";
import { useGetArticlesQuery } from "@/client/redux";
import { type FC } from "react";

export const ArticlesList: FC = () => {
  const { data, isError, isLoading, error } = useGetArticlesQuery();

  if (isLoading) return <LoadingLoop />;
  if (isError) return <DefaultError error={error} />;

  if (!data || !data.length) return <Subtitle>Статей пока нет</Subtitle>;

  return (
    <div className={styles.list}>
      {data.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
        />
      ))}
    </div>
  );
};
