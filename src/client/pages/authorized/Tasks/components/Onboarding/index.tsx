"use client";

import { Text } from "@odeyalo/uikit";
import { type FC } from "react";
import styles from "./styles.module.scss";

export const Onboarding: FC = () => {
  return (
    <div className={styles.content}>
      <Text as="p">
        <Text variant="body-m-bold">Каждая задача</Text> — это шаг к внутреннему
        балансу. Список помогает структурировать день и мягко вернуть ощущение
        контроля. Иногда действие приходит раньше мотивации — и это нормально.
        Просто начните с маленького шага - это уже меняет состояние
      </Text>
      <Text
        as="h4"
        className={styles.subtitle}
        variant="body-xl-bold"
      >
        Что можно добавить:
      </Text>
      <ul>
        <Text as="li">
          ▫️ <Text variant="body-m-bold">Маленькая забота о себе</Text> — кружка
          вкусного чая, 5 минут на свежем воздухе
        </Text>
        <Text as="li">
          ▫️ <Text variant="body-m-bold">Дела, которые откладывались</Text> —
          даже по 5 минут в день
        </Text>
        <Text as="li">
          ▫️ <Text variant="body-m-bold">Поведенческие эксперименты</Text> —
          например: «Сделаю комплименты коллегам»
        </Text>
      </ul>
    </div>
  );
};
