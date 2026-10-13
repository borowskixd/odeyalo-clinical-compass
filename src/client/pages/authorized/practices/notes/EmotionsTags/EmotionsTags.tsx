"use client";

import { Button } from "@odeyalo/uikit";
import { useRouter } from "next/navigation";
import { type FC } from "react";
import { OtherButton } from "./components";
import styles from "./styles.module.scss";
import {
  Container,
  ContentWrapper,
  LoadingLoop,
  PageTitle,
} from "@/client/components";
import { useAppDispatch, useAppSelector } from "@/client/hooks";
import {
  notesActions,
  selectMoodDraft,
  useGetEmotionsQuery,
} from "@/client/redux";
import { pages } from "@/shared/data";

export const EmotionsTagsPage: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const moodDraft = useAppSelector(selectMoodDraft);
  const { data, isLoading } = useGetEmotionsQuery();

  if (isLoading) {
    return <LoadingLoop />;
  }

  const additionalEmotions =
    data?.groups.find((group) => group.id === "additional")?.emotions ?? [];

  const customTitle = data?.customTitle ?? "Другое";
  const allowCustomText = data?.allowCustomText ?? false;

  const onSelectHandler = (emotion: string) => {
    const next = moodDraft.emotions.includes(emotion)
      ? moodDraft.emotions.filter((e) => e !== emotion)
      : [...moodDraft.emotions, emotion];

    dispatch(notesActions.setMoodDraftEmotions(next));
  };

  const onOtherChange = (isSelected: boolean, text: string) => {
    dispatch(notesActions.setMoodDraftOtherEmotion(isSelected ? text : ""));
  };

  const onNextHandler = () => {
    router.push(pages.tags.path);
  };

  return (
    <Container>
      <ContentWrapper>
        <PageTitle className={styles.title}>Дополнительные эмоции</PageTitle>

        <div className={styles.list}>
          <div className={styles.category}>
            <div className={styles.tags}>
              {additionalEmotions.map((emotion) => {
                const isActive = moodDraft.emotions.includes(emotion);
                return (
                  <Button
                    key={emotion}
                    type="button"
                    className={`${styles.tag} ${isActive ? styles.active : ""}`}
                    onClick={() => onSelectHandler(emotion)}
                  >
                    {emotion}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {allowCustomText && (
          <OtherButton
            title={customTitle}
            initialSelected={moodDraft.otherEmotion.trim().length > 0}
            initialText={moodDraft.otherEmotion}
            onChange={onOtherChange}
          />
        )}

        <Button
          width="max"
          view="secondary"
          type="button"
          onClick={onNextHandler}
        >
          Далее
        </Button>
      </ContentWrapper>
    </Container>
  );
};
