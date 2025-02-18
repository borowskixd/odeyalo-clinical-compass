"use client";

import styles from "./styles.module.scss";
import { useSearchParams } from "next/navigation";
import { PageTitle } from "@/client/components";
import { days, months } from "@/shared/utils";
import { type FC } from "react";

export const NoteDate: FC = () => {
  const searchParams = useSearchParams();

  const dateParam = searchParams.get("date");

  let date: Date = new Date();

  if (dateParam && !isNaN(new Date(dateParam).valueOf())) {
    date = new Date(dateParam);
  }

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
