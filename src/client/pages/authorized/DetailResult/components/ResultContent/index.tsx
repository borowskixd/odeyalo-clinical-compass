"use client";

import { notFound, useParams } from "next/navigation";
import { type FC, useEffect } from "react";
import { ProgressBar } from "../ProgressBar";
import styles from "./styles.module.scss";
import { DefaultError, LoadingLoop } from "@/client/components";
import { useGetTestQuery, useGetTestResultQuery } from "@/client/redux";
import { useAnalytics } from "@/shared/analytics";

export const ResultContent: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { logEvent } = useAnalytics();

  const { data: testResult, ...getTestResultState } = useGetTestResultQuery(id);

  const { data: testInfo } = useGetTestQuery(testResult?.testId || "", {
    skip: !testResult?.testId,
  });

  useEffect(() => {
    logEvent("test-detail-result-page-opened");
  }, [logEvent]);

  if (getTestResultState.isLoading) return <LoadingLoop />;
  if (getTestResultState.isError)
    return <DefaultError error={getTestResultState.error} />;
  if (!testResult) notFound();

  const pageTitle = testInfo?.title || testResult.title;

  return (
    <>
      <h2 className={styles.subtitle}>{pageTitle}</h2>
      <div className={styles.results}>
        {testResult.scales.map((scale) => {
          const scaleResult = testResult.scaleResults.find(
            (res) => res.id === scale.id,
          );
          const score = scaleResult?.score ?? 0;

          return (
            <div
              key={scale.id}
              className={styles.resultItemWrapper}
            >
              <ProgressBar
                scale={scale}
                result={score}
                description={scaleResult?.description}
              />
              <div className={styles.resultDescription}>
                <h2 className={styles.subtitle2}>Что делать дальше?</h2>
                <p className={styles.recommendations}>
                  {scaleResult?.recommendations}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
