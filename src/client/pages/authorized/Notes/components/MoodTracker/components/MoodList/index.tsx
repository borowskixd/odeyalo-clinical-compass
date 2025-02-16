import { Mood } from "../Mood";
import styles from "./styles.module.scss";
import { type GetMoodsResponseData } from "@/shared/types";
import { type FC } from "react";

interface Props {
  moods: GetMoodsResponseData;
}

export const MoodList: FC<Props> = ({ moods }) => {
  return (
    <div className={styles.list}>
      {moods.map((mood, index) => {
        return (
          <Mood
            key={index}
            score={mood.score}
            date={new Date(mood.date)}
          />
        );
      })}
    </div>
  );
};
