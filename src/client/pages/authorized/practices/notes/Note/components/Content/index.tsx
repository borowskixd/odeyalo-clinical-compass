"use client";

import { useParams } from "next/navigation";
import { type FC } from "react";
import styles from "./styles.module.scss";
import { DefaultError, LoadingLoop, PageTitle } from "@/client/components";
import {
  useGetMoodQuery,
  useGetMoodTagsQuery,
  useGetNoteByMoodTrackerQuery,
} from "@/client/redux";
import { days, months } from "@/shared/utils";

export const Content: FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: mood,
    isLoading: isMoodLoading,
    isError,
    error,
  } = useGetMoodQuery(id);

  const { data: note, isLoading: isNoteLoading } =
    useGetNoteByMoodTrackerQuery(id);

  const { data: categories } = useGetMoodTagsQuery();

  if (isMoodLoading) return <LoadingLoop />;
  if (isError || !mood) return <DefaultError error={error} />;

  const date = new Date(mood.date);
  const hours = date.getHours() - new Date().getTimezoneOffset() / 60;
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

  const hasNote = !isNoteLoading && note?.note?.trim();

  return (
    <>
      <PageTitle>{`${date.getDate()}, ${months[date.getMonth()]}`}</PageTitle>
      <h3 className={styles.date}>
        {`${days[date.getDay()]}, ${hours}:${minutes}`}
      </h3>

      {hasNote && note && <p className={styles.note}>{note.note}</p>}

      <div className={styles.moodDetails}>
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Эмоции</h4>
          <div className={styles.tags}>
            {mood.emotions.map((emotion) => (
              <span
                key={emotion}
                className={styles.tag}
              >
                {emotion}
              </span>
            ))}
          </div>
        </div>

        {mood.influenceFactors && mood.influenceFactors.length > 0 && (
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Причины</h4>
            <div className={styles.tags}>
              {mood.influenceFactors.map((factor) => {
                const category = categories?.find(
                  (c) => c.id === factor.categoryId,
                );

                if (factor.customText) {
                  return (
                    <span
                      key={factor.categoryId}
                      className={styles.tag}
                    >
                      {factor.customText}
                    </span>
                  );
                }

                const optionTitles = factor.optionIds.map(
                  (id) =>
                    category?.options.find((o) => o.id === id)?.title ?? id,
                );

                return optionTitles.map((optionTitle) => (
                  <span
                    key={optionTitle}
                    className={styles.tag}
                  >
                    {optionTitle}
                  </span>
                ));
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
