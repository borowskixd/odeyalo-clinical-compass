import cl from "classnames";
import { type FC, type ReactNode } from "react";
import styles from "./styles.module.scss";

export interface SelectablePillOption {
  value: string;
  title: string;
  description?: ReactNode;
}

interface Props {
  name?: string;
  emptyMessage?: string;
  options: SelectablePillOption[];
  placeholder?: string;
  value?: string;
  onUpdate?: (value: string) => void;
  disabled?: boolean;
}

export const SelectablePills: FC<Props> = ({
  emptyMessage = "Нет доступных вариантов",
  options,
  value,
  onUpdate,
  disabled = false,
}) => {
  if (options.length === 0) {
    return <div className={styles.empty}>{emptyMessage}</div>;
  }

  return (
    <div className={styles.options}>
      {options.map((option) => {
        const selected = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            className={cl(styles.option, selected && styles.selected)}
            onClick={() => onUpdate?.(option.value)}
            disabled={disabled}
          >
            <span className={styles.title}>{option.title}</span>
            {option.description && (
              <span className={styles.description}>{option.description}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};
