"use client";

import { type FC } from "react";
import styles from "./styles.module.scss";
import { PageTitle } from "@/client/components";
import { days, months } from "@/shared/utils";

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
