import { Button } from "@odeyalo/uikit";
import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { Group } from "@/client/components/UI/ChatBot/components/Group";
import { useAppDispatch } from "@/client/hooks";
import {
  chatBotActions,
  useGetChatBotEmergencyQuery,
  useGetChatBotGroupsQuery,
} from "@/client/redux";

export const Nav: FC = () => {
  const { data: groups, ...getGroupsQuery } = useGetChatBotGroupsQuery();
  const { data: emergency, ...getEmergencyQuery } =
    useGetChatBotEmergencyQuery();
  const dispatch = useAppDispatch();
  const [showGroups, setShowGroups] = useState<boolean>(false);
  const [activeGroup, setActiveGroup] = useState<number | null>(null);

  const handleToggleActiveGroup = (id: number) => {
    setActiveGroup((activeGroup) => {
      if (activeGroup === id) return null;
      return id;
    });
  };

  const handleEmergency = () => {
    if (emergency) {
      dispatch(
        chatBotActions.addMessage({
          author: "user",
          message: "Контакты срочной помощи",
        }),
      );
      for (const el of emergency) {
        dispatch(
          chatBotActions.addMessage({
            author: "bot",
            message: (
              <>
                <a href={`tel:${el.phone}`}>{el.phone}</a> — {el.description}
              </>
            ),
          }),
        );
      }
    }
  };

  const handleShowGroups = () => {
    setShowGroups(true);
    dispatch(chatBotActions.hideMessages());
  };

  const handleHideGroups = () => {
    setShowGroups(false);
    dispatch(chatBotActions.showMessages());
  };

  const handleSelectQuestion = () => {
    handleHideGroups();
    setActiveGroup(null);
  };

  return (
    <div className={styles.nav}>
      {showGroups ? (
        <>
          {groups &&
            groups.map(({ id, name }) => (
              <Group
                key={id}
                id={id}
                name={name}
                showQuestions={activeGroup === id}
                handleToggleQuestions={() => handleToggleActiveGroup(id)}
                handleSelectQuestion={handleSelectQuestion}
              />
            ))}
          <Button
            view="secondary"
            width="max"
            className={styles.blackButton}
            onClick={handleHideGroups}
          >
            Назад
          </Button>
        </>
      ) : (
        <>
          <Button
            view="action"
            width="max"
            onClick={handleEmergency}
            disabled={getEmergencyQuery.isLoading}
          >
            Срочная помощь
          </Button>
          <Button
            view="secondary"
            width="max"
            className={styles.blackButton}
            onClick={handleShowGroups}
            disabled={getGroupsQuery.isLoading}
          >
            Вопрос
          </Button>
        </>
      )}
    </div>
  );
};
