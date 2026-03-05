"use client";

import { Button, Icon, Icons24Solid } from "@odeyalo/uikit";
import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { Container } from "@/client/components";
import { Chat } from "@/client/components/UI/ChatBot/components";

export const ChatBot: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);

  const handleToggleOpen = () => {
    setOpen((open) => !open);
  };

  return (
    <div className={styles.main}>
      <Container className={styles.container}>
        <Button
          ref={setButtonRef}
          view="action"
          size="xl"
          className={styles.button}
          onClick={handleToggleOpen}
        >
          <Icon
            data={Icons24Solid.ChatBubbleLeftIcon}
            size={32}
          />
        </Button>
        <Chat
          open={open}
          onOpenChange={setOpen}
          anchorElement={buttonRef}
        />
      </Container>
    </div>
  );
};
