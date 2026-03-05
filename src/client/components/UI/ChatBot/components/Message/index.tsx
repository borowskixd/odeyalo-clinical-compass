import { Text } from "@odeyalo/uikit";
import cl from "classnames";
import { forwardRef } from "react";
import styles from "./styles.module.scss";
import { type Message as MessageType } from "@/shared/types";

type MessageProps = MessageType;

export const Message = forwardRef<HTMLDivElement, MessageProps>(
  ({ message, author }, ref) => {
    return (
      <div
        className={cl(styles.container, author === "user" ? styles.user : null)}
      >
        <div
          ref={ref}
          className={styles.message}
        >
          <Text>{message}</Text>
        </div>
      </div>
    );
  },
);

Message.displayName = "Message";
