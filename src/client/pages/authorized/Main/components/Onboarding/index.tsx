"use client";

import { Icon, Icons24Solid, Text } from "@odeyalo/uikit";
import { type FC, useState } from "react";
import styles from "./styles.module.scss";
import { Button } from "@/client/components";

export const Onboarding: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen((open) => !open);

  return (
    <div className={styles.content}>
      <header className={styles.header}>
        <Text
          as="h3"
          variant="title-xs"
        >
          🌟 Добро пожаловать в Одеяло — ваше пространство для заботы о себе
        </Text>
        <Button
          onClick={handleOpen}
          className={styles.button}
        >
          <Icon
            data={
              open ? Icons24Solid.ChevronUpIcon : Icons24Solid.ChevronDownIcon
            }
            size={32}
          />
        </Button>
      </header>
      {open && (
        <div>
          <Text as="p">
            Здесь вы найдёте проверенные инструменты, которые помогут лучше
            понимать свои эмоции, мягко работать с тревогой или стрессом и
            замечать маленькие шаги к внутреннему балансу.
          </Text>
          <Text as="p">
            Всё основано на методах когнитивно-поведенческой терапии — с научной
            поддержкой, но без сложных терминов.
          </Text>
          <Text
            as="h4"
            className={styles.subtitle}
            variant="body-xl-bold"
          >
            ✨ Что вас ждёт:
          </Text>
          <ul className={styles.list}>
            <Text as="li">
              ▫️ <Text variant="body-m-bold">Тесты</Text> — чтобы осознанно
              отслеживать состояние
            </Text>
            <Text as="li">
              ▫️ <Text variant="body-m-bold">Практики</Text> — трекер
              настроения, КПТ-дневник, дыхательные упражнения
            </Text>
            <Text as="li">
              ▫️ <Text variant="body-m-bold">Теория</Text> — короткие материалы,
              когда захочется глубже разобраться
            </Text>
            <Text as="li">
              ▫️ <Text variant="body-m-bold">Ежедневный план</Text> — ваш мягкий
              гид: подскажет, с чего начать сегодня
            </Text>
          </ul>
          <Text as="p">
            🌱 Начните с 5–10 минут в день. Не нужно «всё и сразу» — каждый
            маленький шаг важен.
          </Text>
          <Text as="p">
            Ваш первый шаг уже здесь: приступите к ежедневному плану на главной
            странице.
          </Text>
        </div>
      )}
    </div>
  );
};
