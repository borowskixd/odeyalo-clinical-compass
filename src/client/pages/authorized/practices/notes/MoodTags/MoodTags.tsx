"use client";

import { useRouter } from "next/navigation";
import { type FC, useEffect, useRef } from "react";
import { MoodInfluenceForm } from "./components";
import styles from "./styles.module.scss";
import { POPUP_TEXTS } from "./utils";
import {
  Container,
  ContentWrapper,
  FormErrorLabel,
  InfoButton,
  LoadingLoop,
  PageTitle,
} from "@/client/components";
import { useAppDispatch, useAppSelector } from "@/client/hooks";
import {
  notesActions,
  selectMoodDraft,
  selectNotesCalendarDate,
  useGetMoodsQuery,
  useGetMoodTagsQuery,
  useSaveMoodMutation,
} from "@/client/redux";
import { mapApiErrorMessage } from "@/client/utils";
import { useAnalytics } from "@/shared/analytics";
import { pages } from "@/shared/data";
import { type MoodInfluenceFactorDraft } from "@/shared/types";
import { compareDates, mapDateToApiDateFormat } from "@/shared/utils";

export const MoodTagsPage: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const moodDraft = useAppSelector(selectMoodDraft);
  const notesCalendarDate = useAppSelector(selectNotesCalendarDate);
  const { data, isLoading, isError, error } = useGetMoodTagsQuery();
  const { refetch: refetchMoods } = useGetMoodsQuery(notesCalendarDate);
  const [saveMood, { isLoading: isSaving, isSuccess, error: saveError }] =
    useSaveMoodMutation();
  const { logEvent } = useAnalytics();

  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!isSuccess || hasRedirected.current) return;
    hasRedirected.current = true;

    refetchMoods().then(({ data: moods }) => {
      const list = moods ?? [];
      const lastMood = list.reduce<(typeof list)[number] | undefined>(
        (latest, current) => {
          if (!latest) return current;
          return new Date(current.date) > new Date(latest.date)
            ? current
            : latest;
        },
        undefined,
      );

      logEvent("mood-added");
      dispatch(notesActions.resetMoodDraft());

      if (lastMood) {
        const isCurrentDate = compareDates(notesCalendarDate, "current", {
          fullYear: true,
          month: true,
          date: true,
        });

        const dateQuery = isCurrentDate
          ? ""
          : `&date=${mapDateToApiDateFormat(notesCalendarDate)}`;

        router.replace(
          `${pages.createNote.path}?trackerId=${lastMood.id}${dateQuery}`,
        );
      }
    });
  }, [isSuccess, refetchMoods, logEvent, dispatch, router, notesCalendarDate]);

  if (isLoading) {
    return <LoadingLoop />;
  }

  if (isError) {
    return <FormErrorLabel>{mapApiErrorMessage(error)}</FormErrorLabel>;
  }

  const onSaveHandler = (influenceFactors: MoodInfluenceFactorDraft[]) => {
    const isCurrentDate = compareDates(notesCalendarDate, "current", {
      fullYear: true,
      month: true,
      date: true,
    });

    saveMood({
      score: moodDraft.score,
      emojiIds: [],
      emotions: moodDraft.emotions,
      otherEmotion: moodDraft.otherEmotion,
      influenceFactors,
      date: isCurrentDate ? null : mapDateToApiDateFormat(notesCalendarDate),
    });
  };

  return (
    <Container>
      <ContentWrapper>
        <div className={styles.header}>
          <PageTitle className={styles.title}>Что повлияло?</PageTitle>
          <InfoButton
            title={POPUP_TEXTS.EXPLANATION_TITLE}
            popupText={POPUP_TEXTS.EXPLANATION}
          />
        </div>

        <MoodInfluenceForm
          categories={data ?? []}
          isLoading={isSaving}
          error={saveError}
          onSubmit={onSaveHandler}
        />
      </ContentWrapper>
    </Container>
  );
};
