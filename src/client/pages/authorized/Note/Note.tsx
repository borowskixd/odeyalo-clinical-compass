import styles from "./styles.module.scss";
import { Container, ContentWrapper, PageTitle } from "@/client/components";
import { type FC } from "react";

export const NotePage: FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <PageTitle>26 ноября</PageTitle>
        <h3 className={styles.date}>Вторник, 9:30</h3>
        <p className={styles.note}>
          Заполненная заметка будет такой.
          <br />
          <br />
          Но по смыслу они связаны. Сначала надо выделить проблему, потом
          провести анализ проблемы. Анализ проблемы - это 3 пары полей.
          <br />
          <br />В каждом поле пользователь формулирует убеждение, потом каждое
          это убеждение проверяет в Проверке убеждений и в Анализе убеждений
          (это еще 2 упражнения). Для закрепления этого есть еще
          рационально-иррациональный диалог, но это можно отложить
        </p>
      </ContentWrapper>
    </Container>
  );
};
