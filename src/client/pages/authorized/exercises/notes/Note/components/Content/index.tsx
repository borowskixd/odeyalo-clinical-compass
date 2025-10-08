"use client";

import styles from "./styles.module.scss";
import { useParams } from "next/navigation";
import { DefaultError, LoadingLoop, PageTitle } from "@/client/components";
import { useGetNoteQuery } from "@/client/redux";
import { days, months } from "@/shared/utils";
import { type FC } from "react";

export const Content: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: note, isLoading, isError, error } = useGetNoteQuery(id);

  if (isLoading) return <LoadingLoop />;
  if (isError || !note) return <DefaultError error={error} />;

  const date = new Date(note.date);

  const hours = date.getHours() - new Date().getTimezoneOffset() / 60;
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

  return (
    <>
      <PageTitle>{`${date.getDate()}, ${months[date.getMonth()]}`}</PageTitle>
      <h3
        className={styles.date}
      >{`${days[date.getDay()]}, ${hours}:${minutes}`}</h3>
      <p className={styles.note}>{note.note}</p>
    </>
  );
};
