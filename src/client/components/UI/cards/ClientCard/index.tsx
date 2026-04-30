"use client";

import { Button } from "@odeyalo/uikit";
import { type FC } from "react";
import { UserCard } from "../UserCard";
import styles from "./styles.module.scss";
import { DefaultError, LoadingLoop } from "@/client/components";
import { useGetInquiriesQuery } from "@/client/redux";
import { pages } from "@/shared/data";
import { type GetClientsResponseData } from "@/shared/types";

interface Props {
  client: GetClientsResponseData[number];
}

export const ClientCard: FC<Props> = ({ client }) => {
  const { data: inquiries, ...getInquiriesQuery } = useGetInquiriesQuery();

  const renderContent = () => {
    if (getInquiriesQuery.isLoading) return <LoadingLoop />;
    if (getInquiriesQuery.isError || !inquiries)
      return <DefaultError error={getInquiriesQuery.error} />;

    return (
      <div className={styles.inquiries}>
        {client.problems.map((inquiry) => {
          const el = inquiries.find((el) => el.id === inquiry);

          if (!el) return null;
          return (
            <Button
              size="xs"
              key={inquiry}
              readOnly
              className={styles.inquiry}
            >
              {el.text}
            </Button>
          );
        })}
      </div>
    );
  };

  return (
    <UserCard
      userData={{
        username: client.username,
        profileImage: client.profileImage,
      }}
      subtitle="Клиент"
      className={styles.card}
    >
      {renderContent()}
      <div className={styles.actions}>
        <Button
          href={pages.client.getLink({ params: { id: client.userId } })}
          width="max"
          view="primary"
        >
          Профиль
        </Button>
      </div>
    </UserCard>
  );
};
