"use client";

import { Button } from "@odeyalo/uikit";
import { type FC, useState } from "react";
import { OtherButton, TagsForm } from "../";
import styles from "./styles.module.scss";
import { FormErrorLabel } from "@/client/components";
import { mapApiErrorMessage } from "@/client/utils";
import {
  type GetMoodTagsResponseData,
  type MoodInfluenceFactorDraft,
} from "@/shared/types";

interface Props {
  categories: GetMoodTagsResponseData;
  isLoading: boolean;
  error?: unknown;
  onSubmit: (factors: MoodInfluenceFactorDraft[]) => void;
}

export const MoodInfluenceForm: FC<Props> = ({
  categories,
  isLoading,
  error,
  onSubmit,
}) => {
  const [factors, setFactors] = useState<
    Record<string, { optionIds: string[]; customText: string }>
  >({});

  const regularCategories = categories.filter((c) => !c.allowCustomText);
  const other = categories.find((c) => c.allowCustomText);

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

  return (
    <>
      <div className={styles.grid}>
        {regularCategories.map((category) => (
          <TagsForm
            key={category.id}
            data={category}
            onChange={(optionIds) => setCategoryOptions(category.id, optionIds)}
          />
        ))}
      </div>

      {!!error && <FormErrorLabel>{mapApiErrorMessage(error)}</FormErrorLabel>}

      <div className={styles.actions}>
        {other && (
          <OtherButton
            onChange={(isSelected, text) =>
              setCategoryCustomText(other.id, isSelected ? text : "")
            }
          />
        )}

        <Button
          type="button"
          width="max"
          view="primary"
          disabled={isLoading}
          onClick={() => onSubmit(collectInfluenceFactors())}
          className={styles.saveButton}
        >
          Сохранить и продолжить
        </Button>
      </div>
    </>
  );
};
