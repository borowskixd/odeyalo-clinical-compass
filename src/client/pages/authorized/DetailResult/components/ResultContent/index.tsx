"use client";

import styles from "./styles.module.scss";
import { notFound, useParams } from "next/navigation";
import {
  DefaultError,
  LoadingLoop,
  ProgressBar,
  Subtitle,
} from "@/client/components";
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
      <Subtitle className={styles.subtitle}>{testResult.title}</Subtitle>
      <div className={styles.results}>
        {testResult.scales.map((el) => {
          const value =
            testResult.scaleResults.find((res) => res.id === el.id)?.score ?? 0;
          const color = el.borders.reduce((acc, el) => {
            if (value <= el.rightBorder && value >= el.leftBorder) {
              acc = el.color;
            }
            return acc;
          }, "");

          return (
            <div
              className={styles.result}
              key={el.id}
            >
              <h4
                className={styles.resultTitle}
                style={{ backgroundColor: color + "30" }}
              >
                {el.title}
              </h4>
              <ProgressBar
                value={value}
                max={el.max}
                min={el.min}
                color={color}
              />
            </div>
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
