import { type FC, useState } from "react";
import styles from "./styles.module.scss";
import { Button } from "@/client/components";
import { useGetEmotionsQuery } from "@/client/redux";

interface Props {
  onUpdate: (emotions: string[]) => void;
  onOtherClick?: () => void;
  defaultEmotions?: string[];
}

export const Emojis: FC<Props> = ({
  onUpdate,
  onOtherClick,
  defaultEmotions = [],
}) => {
  const [emotions, setEmotions] = useState<string[]>(defaultEmotions);
  const { data, isLoading } = useGetEmotionsQuery();

  const primaryEmotions =
    data?.groups.find((group) => group.id === "primary")?.emotions ?? [];

  const onSelectHandler = (emotion: string) => {
    const next = emotions.includes(emotion)
      ? emotions.filter((e) => e !== emotion)
      : [...emotions, emotion];

    setEmotions(next);
    onUpdate(next);
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Эмоции</h4>
      <div className={styles.list}>
        {isLoading &&
          new Array(7).fill("").map((_, index) => (
            <Button
              key={index}
              className={styles.emoji}
              type="button"
            >
              {""}
            </Button>
          ))}
        {!isLoading &&
          primaryEmotions.map((emotion) => {
            const isActive = emotions.includes(emotion);
            const classNames = [styles.emoji, isActive ? styles.active : ""]
              .filter(Boolean)
              .join(" ");

            return (
              <Button
                key={emotion}
                className={classNames}
                type="button"
                onClick={() => onSelectHandler(emotion)}
              >
                {emotion}
              </Button>
            );
          })}
        <Button
          type="button"
          width="max"
          view="secondary"
          className={styles.redirectButton}
          onClick={onOtherClick}
        >
          Другое
        </Button>
      </div>
    </div>
  );
};
