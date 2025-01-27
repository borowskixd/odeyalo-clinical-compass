"use client";

import { ProgressBar } from "../ProgressBar";
import styles from "./styles.module.scss";
import { notFound, useParams } from "next/navigation";
import { DefaultError, LoadingLoop } from "@/client/components";
import { useGetTestResultQuery } from "@/client/redux";
import { type FC } from "react";

export const ResultContent: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: testResult, ...getTestResultState } = useGetTestResultQuery(id);

  if (getTestResultState.isLoading) return <LoadingLoop />;
  if (getTestResultState.isError)
    return <DefaultError error={getTestResultState.error} />;
  if (!testResult) notFound();

  return (
    <>
      <h2 className={styles.subtitle}>{testResult.title}</h2>
      <div className={styles.results}>
        {testResult.scales.map((scale) => {
          const { id } = scale;
          const result =
            testResult.scaleResults.find((res) => res.id === id)?.score ?? 0;

          return (
            <ProgressBar
              key={id}
              scale={scale}
              result={result}
            />
          );
        })}
      </div>
      <div className={styles.resultsDescription}>
        {testResult.scales.map((el) => {
          const scale = testResult.scaleResults.find((res) => res.id === el.id);
          const score = scale?.score ?? 0;

          const border = el.borders.find(
            (el) => score >= el.leftBorder && score <= el.rightBorder,
          );

          return (
            <div
              className={styles.resultItem}
              key={el.id}
            >
              <h3 className={styles.resultItemTitle}>{el.title}</h3>
              <div className={styles.resultItemContent}>
                <h5 className={styles.resultItemScore}>
                  {score}, {border?.title}
                </h5>
                <p className={styles.resultItemDescription}>
                  {scale?.recomendations}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
