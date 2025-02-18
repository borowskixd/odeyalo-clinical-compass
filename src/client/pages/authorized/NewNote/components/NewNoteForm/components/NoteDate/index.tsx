"use client";

import styles from "./styles.module.scss";
import { PageTitle } from "@/client/components";
import { days, months } from "@/shared/utils";
import { type FC } from "react";

interface Props {
  date: Date;
}

export const NoteDate: FC<Props> = ({ date }) => {
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

  return (
    <>
      <PageTitle>{`${date.getDate()}, ${months[date.getMonth()]}`}</PageTitle>
      <h3
        className={styles.date}
      >{`${days[date.getDay()]}, ${date.getHours()}:${minutes}`}</h3>
    </>
  );
};
