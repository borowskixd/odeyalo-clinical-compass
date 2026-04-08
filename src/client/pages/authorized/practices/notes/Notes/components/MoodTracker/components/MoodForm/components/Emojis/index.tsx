import { type FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Button } from "@/client/components";
import { useGetEmojisQuery } from "@/client/redux";

interface Props {
  onUpdate: (emojiIds: number[]) => void;
  defaultEmojis: number[];
}

export const Emojis: FC<Props> = ({ onUpdate, defaultEmojis = [] }) => {
  const [emojiIds, setEmojiIds] = useState<number[]>(defaultEmojis);
  const { data: emojis, isLoading } = useGetEmojisQuery();

  useEffect(() => {
    setEmojiIds(defaultEmojis);
  }, [defaultEmojis]);

  const onSelectHandler = (emojiId: number) => {
    const newEmojiIds: number[] = [];

    for (const currEmojiId of emojiIds) {
      if (currEmojiId === emojiId) continue;
      newEmojiIds.push(currEmojiId);
    }

    if (newEmojiIds.length === emojiIds.length) newEmojiIds.push(emojiId);

    setEmojiIds(newEmojiIds);
    onUpdate(newEmojiIds);
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Эмоции</h4>
      <div className={styles.list}>
        {isLoading &&
          new Array(10).fill("").map((el, index) => (
            <Button
              key={index}
              className={styles.emoji}
              type="button"
            >
              {el}
            </Button>
          ))}
        {emojis &&
          emojis.map((emoji) => (
            <Button
              key={emoji.id}
              className={`${styles.emoji} ${emojiIds.includes(emoji.id) ? styles.active : ""}`}
              type="button"
              onClick={() => onSelectHandler(emoji.id)}
            >
              {emoji.emoji}
            </Button>
          ))}
      </div>
    </div>
  );
};
