"use client";

import {
  Button,
  Icon,
  Icons24Solid,
  Popup,
  PopupProps,
  Text,
} from "@odeyalo/uikit";
import { FC, useEffect, useRef } from "react";
import { Message } from "../Message";
import { Nav } from "../Nav";
import styles from "./styles.module.scss";
import { ContentWrapper } from "@/client/components";
import { useAppSelector } from "@/client/hooks";
import {
  selectChatBotHideMessages,
  selectChatBotMessages,
  selectIsMobile,
} from "@/client/redux";

type ChatProps = Pick<PopupProps, "anchorElement" | "onOpenChange" | "open">;

export const Chat: FC<ChatProps> = ({ onOpenChange, open, anchorElement }) => {
  const chatRef = useRef<HTMLDivElement>(null);
  const lastUserMessageRef = useRef<HTMLDivElement>(null);
  const messages = useAppSelector(selectChatBotMessages);
  const hideMessages = useAppSelector(selectChatBotHideMessages);
  const isMobile = useAppSelector(selectIsMobile);

  useEffect(() => {
    const container = chatRef.current;
    const message = lastUserMessageRef.current;

    if (!container || !message) return;

    const top =
      message.offsetTop - container.offsetTop - container.clientTop - 10;

    container.scrollTo({
      top,
      behavior: "smooth",
    });
  }, [messages, hideMessages]);

  useEffect(() => {
    if (!open) return;

    const timeout = setTimeout(() => {
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [open]);

  const lastUserMessageIndex = messages.findLastIndex(
    (message) => message.author === "user",
  );

  const handleCloseChat = () => onOpenChange?.(false);

  return (
    <Popup
      open={open}
      onOpenChange={onOpenChange}
      anchorElement={anchorElement}
      placement={isMobile ? "top-end" : "left-end"}
      className={styles.popup}
      offset={8}
      zIndex={1000}
    >
      <ContentWrapper>
        <header className={styles.header}>
          <Text variant="title-xs">Чем могу помочь?</Text>
          <Button
            view="unstyled"
            className={styles.closeButton}
            onClick={handleCloseChat}
          >
            <Icon data={Icons24Solid.XMarkIcon} />
          </Button>
        </header>
        <div
          ref={chatRef}
          className={styles.chat}
        >
          {!hideMessages &&
            messages.map(({ message, author }, index) => (
              <Message
                ref={
                  index === lastUserMessageIndex
                    ? lastUserMessageRef
                    : undefined
                }
                key={index}
                message={message}
                author={author}
              />
            ))}
          <Nav />
        </div>
      </ContentWrapper>
    </Popup>
  );
};
