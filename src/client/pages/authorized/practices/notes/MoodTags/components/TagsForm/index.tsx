"use client";

import { type FC, useState } from "react";
import styles from "./styles.module.scss";
import type { GetMoodTagResponseData } from "@/shared/types";

interface TagsFormProps {
  data: GetMoodTagResponseData;
  onChange?: (selected: string[]) => void;
  initialSelected?: string[];
}

export const TagsForm: FC<TagsFormProps> = ({
  data,
  onChange,
  initialSelected = [],
}) => {
  const [selected, setSelected] = useState<string[]>(initialSelected);

  const handleToggle = (optionId: string) => {
    const next = selected.includes(optionId)
      ? selected.filter((id) => id !== optionId)
      : [...selected, optionId];

    setSelected(next);
    onChange?.(next);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{data.title}</h3>

      <div className={styles.grid}>
        {data.options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`${styles.tag} ${
              selected.includes(option.id) ? styles.active : ""
            }`}
            onClick={() => handleToggle(option.id)}
          >
            {option.title}
          </button>
        ))}
      </div>
    </div>
  );
};
