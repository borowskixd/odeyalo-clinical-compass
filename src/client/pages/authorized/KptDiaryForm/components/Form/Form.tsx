"use client";

import { SubmitButton } from "./components";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { QuestionMark } from "@/client/assets/icons";
import {
  Container,
  FormErrorLabel,
  FormikForm,
  PageTitle,
  SecondaryButton,
} from "@/client/components";
import { useSendKptDiaryMutation } from "@/client/redux";
import { mapApiErrorMessage } from "@/client/utils";
import { pages } from "@/shared/data";
import { type FC, useEffect, useState } from "react";

interface InitialValues {
  situation: string;
  mood: string;
  moodLevel: number;
  thoughts: string;
  confirmThoughts: string;
  refuteThoughts: string;
  newMood: string;
  newThoughts: string;
  newMoodLevel: number;
  behavior: string;
}

const initialValues: InitialValues = {
  situation: "",
  mood: "",
  moodLevel: 0,
  thoughts: "",
  confirmThoughts: "",
  refuteThoughts: "",
  newMood: "",
  newThoughts: "",
  newMoodLevel: 0,
  behavior: "",
};

export const Form: FC = () => {
  const router = useRouter();
  const [createKptDiary, { isLoading, isSuccess, isError, error }] =
    useSendKptDiaryMutation();

  useEffect(() => {
    if (isSuccess) {
      router.push(pages.kptDiary.path);
    }
  }, [isSuccess, router]);

  const onSubmitHandler = (values: InitialValues) => {
    createKptDiary({ ...values });
  };

  const [hint, setHint] = useState(false);

  const changeState = () => {
    setHint(!hint);
  };

  return (
    <section>
      <Container className={styles.textContainer}>
        <div className={styles.gridForTitle}>
          <section>
            <PageTitle className={styles.title}>КПТ-Дневник</PageTitle>
          </section>
          <section>
            <SecondaryButton
              className={
                hint ? `${styles.button} ${styles.active}` : styles.button
              }
              onClick={changeState}
            >
              <QuestionMark className={hint ? `${styles.iconActive}` : ""} />
              Подсказки
            </SecondaryButton>
          </section>
        </div>
        <p className={styles.text}>
          Это способ самоанализа, который позволяет отслеживать эмоции и
          чувства, выявлять взаимосвязи между ситуациями и мыслями.
        </p>
      </Container>
      <FormikForm<InitialValues>
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        className={styles.form}
      >
        <FormikForm.Textarea
          name="situation"
          className={styles.noteInput}
          placeholder="Опиши ситуацию..."
          disabled={isLoading || isSuccess}
        />
        {hint && (
          <p className={styles.Text}>Запишите факты, без мыслей и эмоций</p>
        )}
        <FormikForm.Textarea
          name="behavior"
          className={styles.noteInput}
          placeholder="Как ты себя повел?..."
          disabled={isLoading || isSuccess}
        />
        {hint && <p className={styles.Text}>Запишите сами действия</p>}
        <FormikForm.Textarea
          name="mood"
          className={styles.noteInput}
          placeholder="Как ты себя повел?..."
          disabled={isLoading || isSuccess}
        />
        {hint && (
          <p className={styles.Text}>
            Опишите все чувства, которые возникли. Не забывай про настроение
          </p>
        )}
        <Container>
          <p className={styles.altText}>Уровень настроения</p>
          <FormikForm.RangeInput
            name="moodLevel"
            min="0"
            max="100"
          />
          <div className={styles.grid}>
            <p className={styles.leftText}>Ужасно</p>
            <p className={styles.rightText}>Потрясающе</p>
          </div>
        </Container>
        <FormikForm.Textarea
          name="thoughts"
          className={styles.noteInput}
          placeholder="Какие чувства вызвала эта ситуация?..."
          disabled={isLoading || isSuccess}
        />
        {hint && (
          <p className={styles.Text}>
            Опишите все чувства, которые возникли. Не забывай про настроение
          </p>
        )}
        <FormikForm.Textarea
          name="confirmThoughts"
          className={styles.noteInput}
          placeholder="Как ты подтверждаешь эту мысль?..."
          disabled={isLoading || isSuccess}
        />
        {hint && (
          <p className={styles.Text}>
            Запишите аргументы, почему эти мысли имеют место
          </p>
        )}
        <FormikForm.Textarea
          name="refuteThoughts"
          className={styles.noteInput}
          placeholder="Как ты опровергаешь эту мысль?..."
          disabled={isLoading || isSuccess}
        />
        {hint && (
          <p className={styles.Text}>
            Запишите контраргументы, почему эти мысли потенциально опасны
          </p>
        )}
        <FormikForm.Textarea
          name="newThoughts"
          className={styles.noteInput}
          placeholder="Что ты думаешь об этой ситуации сейчас?..."
          disabled={isLoading || isSuccess}
        />
        {hint && (
          <p className={styles.Text}>
            Напишите, как бы вы поступили сейчас и что бы изменили
          </p>
        )}
        <FormikForm.Textarea
          name="newMood"
          className={styles.noteInput}
          placeholder="Какое у тебя сейчас настроение?..."
          disabled={isLoading || isSuccess}
        />
        {hint && (
          <p className={styles.Text}>
            Опишите, как чувствуете себя после заполнения дневника
          </p>
        )}
        <Container>
          <p className={styles.altText}>Уровень настроения</p>
          <FormikForm.RangeInput
            name="newMoodLevel"
            min="0"
            max="100"
          />
          <div className={styles.grid}>
            <p className={styles.leftText}>Ужасно</p>
            <p className={styles.rightText}>Потрясающе</p>
          </div>
        </Container>
        {isError && !!error && (
          <FormErrorLabel>{mapApiErrorMessage(error)}</FormErrorLabel>
        )}
        <SubmitButton disabled={isLoading || isSuccess} />
      </FormikForm>
    </section>
  );
};
