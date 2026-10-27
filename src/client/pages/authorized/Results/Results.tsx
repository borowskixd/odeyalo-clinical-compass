"use client";

import { useParams, useSearchParams } from "next/navigation";
import { type ChangeEvent, type FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import {
  Container,
  ContentWrapper,
  DefaultError,
  ListItemWithSwitch,
  LoadingLoop,
  PageTitle,
  RadarChart,
  SimpleBarChart,
} from "@/client/components";
import { useGetTestQuery, useGetTestResultsQuery } from "@/client/redux";
import { useAnalytics } from "@/shared/analytics";
import { pages } from "@/shared/data";

export const ResultsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const [datesCheckboxes, setDatesCheckboxes] = useState<string[]>([]);
  const { logEvent } = useAnalytics();

  useEffect(() => {
    logEvent("test-results-page-opened", {
      test_id: id,
    });
  }, [id, logEvent]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = event.target.value;
    const set: Set<string> = new Set(datesCheckboxes);

    if (set.has(inputValue)) {
      set.delete(inputValue);
    } else {
      set.add(inputValue);
    }

    setDatesCheckboxes(Array.from(set.values()));
  };

  const { data: test, ...getTestResultsState } = useGetTestResultsQuery({
    testId: id,
    userId: searchParams.get("userId"),
  });

  const { data: testInfo } = useGetTestQuery(id);

  if (getTestResultsState.isLoading) return <LoadingLoop />;
  if (getTestResultsState.isError)
    return <DefaultError error={getTestResultsState.error} />;

  const displayTitle = testInfo?.title || test?.title;

  return (
    <Container>
      <ContentWrapper>
        {test && (
          <>
            <PageTitle className={styles.title}>
              История теста: {displayTitle}
            </PageTitle>
            {test.results.length ? (
              <>
                {test.scales.length > 2 ? (
                  <RadarChart
                    results={test.results}
                    scales={test.scales}
                    values={datesCheckboxes}
                    className={styles.radarChart}
                  />
                ) : (
                  <SimpleBarChart
                    results={test.results}
                    scales={test.scales}
                    values={datesCheckboxes}
                    className={styles.barChart}
                  />
                )}
                <ul>
                  {test.results.map((el) => {
                    return (
                      <ListItemWithSwitch
                        onChange={onChange}
                        className={styles.listItem}
                        value={el.id}
                        key={el.id}
                        label={el.datetime}
                        link={pages.detailResult.getLink({
                          params: { id: el.id },
                        })}
                      />
                    );
                  })}
                </ul>
              </>
            ) : (
              <div className={styles.errorLabel}>
                Отсутствует история прохождения теста
              </div>
            )}
          </>
        )}
      </ContentWrapper>
    </Container>
  );
};
