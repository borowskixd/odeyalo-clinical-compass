"use client";

import { type FC, useState } from "react";
import styles from "./styles.module.scss";

interface OtherButtonProps {
  title?: string;
  onChange?: (selected: boolean, customText: string) => void;
  initialSelected?: boolean;
  initialText?: string;
}

export const OtherButton: FC<OtherButtonProps> = ({
  title = "Другое",
  onChange,
  initialSelected = false,
  initialText = "",
}) => {
  const [selected, setSelected] = useState<boolean>(initialSelected);
  const [customText, setCustomText] = useState<string>(initialText);

  const handleToggle = () => {
    const next = !selected;
    setSelected(next);
    onChange?.(next, customText);
  };

  const handleTextChange = (value: string) => {
    setCustomText(value);
    onChange?.(selected, value);
  };

  return (
    <div className={styles.block}>
      {selected && (
        <input
          type="text"
          className={styles.customInput}
          placeholder="Введите свой вариант"
          value={customText}
          onChange={(e) => handleTextChange(e.target.value)}
          autoFocus
        />
      )}

      <button
        type="button"
        className={`${styles.button} ${selected ? styles.active : ""}`}
        onClick={handleToggle}
      >
        <span className={styles.plus}>+</span>
        <span>{title}</span>
      </button>
    </div>
  );
};
