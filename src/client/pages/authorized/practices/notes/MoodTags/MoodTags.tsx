"use client";

import { Button } from "@odeyalo/uikit";
import { type FC, useEffect, useState } from "react";
import { OtherButton, TagsForm } from "./components";
import styles from "./styles.module.scss";
import {
  Container,
  ContentWrapper,
  FormErrorLabel,
  LoadingLoop,
  PageTitle,
} from "@/client/components";
import { useAppDispatch, useAppSelector } from "@/client/hooks";
import {
  notesActions,
  selectMoodDraft,
  selectNotesCalendarDate,
  useGetMoodTagsQuery,
  useSaveMoodMutation,
} from "@/client/redux";
import { mapApiErrorMessage } from "@/client/utils";
import { useAnalytics } from "@/shared/analytics";
import { type MoodInfluenceFactorDraft } from "@/shared/types";
import { compareDates, mapDateToApiDateFormat } from "@/shared/utils";

export const MoodTagsPage: FC = () => {
  const dispatch = useAppDispatch();
  const moodDraft = useAppSelector(selectMoodDraft);
  const notesCalendarDate = useAppSelector(selectNotesCalendarDate);
  const { data, isLoading, isError, error } = useGetMoodTagsQuery();
  const [saveMood, { isLoading: isSaving, isSuccess, error: saveError }] =
    useSaveMoodMutation();
  const { logEvent } = useAnalytics();

  const [factors, setFactors] = useState<
    Record<string, { optionIds: string[]; customText: string }>
  >({});

  useEffect(() => {
    if (isSuccess) {
      logEvent("mood-added");
      dispatch(notesActions.resetMoodDraft());
    }
  }, [isSuccess, logEvent, dispatch]);

  if (isLoading) {
    return <LoadingLoop />;
  }

  if (isError) {
    return <FormErrorLabel>{mapApiErrorMessage(error)}</FormErrorLabel>;
  }

  const categories = (data ?? []).filter((c) => !c.allowCustomText);
  const other = (data ?? []).find((c) => c.allowCustomText);

  const setCategoryOptions = (categoryId: string, optionIds: string[]) => {
    setFactors((prev) => ({
      ...prev,
      [categoryId]: {
        optionIds,
        customText: prev[categoryId]?.customText ?? "",
      },
    }));
  };

  const setCategoryCustomText = (categoryId: string, customText: string) => {
    setFactors((prev) => ({
      ...prev,
      [categoryId]: {
        optionIds: prev[categoryId]?.optionIds ?? [],
        customText,
      },
    }));
  };

  const collectInfluenceFactors = (): MoodInfluenceFactorDraft[] => {
    return Object.entries(factors)
      .filter(([, value]) => value.optionIds.length > 0 || value.customText)
      .map(([categoryId, value]) => ({
        categoryId,
        optionIds: value.optionIds,
        customText: value.customText,
      }));
  };

  const onSaveHandler = () => {
    const influenceFactors = collectInfluenceFactors();

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
        <PageTitle className={styles.title}>Что повлияло?</PageTitle>

        <div className={styles.grid}>
          {categories.map((category) => (
            <TagsForm
              key={category.id}
              data={category}
              onChange={(optionIds) =>
                setCategoryOptions(category.id, optionIds)
              }
            />
          ))}
        </div>

        {other && (
          <OtherButton
            onChange={(isSelected, text) =>
              setCategoryCustomText(other.id, isSelected ? text : "")
            }
          />
        )}

        {saveError && (
          <FormErrorLabel>{mapApiErrorMessage(saveError)}</FormErrorLabel>
        )}

        <Button
          type="button"
          width="max"
          view="primary"
          disabled={isSaving}
          onClick={onSaveHandler}
          className={styles.saveButton}
        >
          Сохранить
        </Button>
      </ContentWrapper>
    </Container>
  );
};
