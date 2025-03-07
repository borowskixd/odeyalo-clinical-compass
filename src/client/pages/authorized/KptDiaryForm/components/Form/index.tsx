"use client";

import {
  Header,
  MoodRangeInput,
  SubmitButton,
  TextareaWithHint,
} from "./components";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { FormErrorLabel, FormikForm } from "@/client/components";
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

const createFieldSchema = () => {
  return Yup.string()
    .required("Данное поле обязательно")
    .test(
      "not-only-spaces",
      "Поле не может состоять только из пробелов",
      (value) => {
        return value.trim() !== "";
      },
    )
    .test(
      "not-only-digits",
      "Поле не может состоять только из цифр",
      (value) => {
        return !/^\d+$/.test(value);
      },
    );
};

const validationSchema = Yup.object().shape({
  situation: createFieldSchema(),
  mood: createFieldSchema(),
  thoughts: createFieldSchema(),
  confirmThoughts: createFieldSchema(),
  refuteThoughts: createFieldSchema(),
  newMood: createFieldSchema(),
  newThoughts: createFieldSchema(),
  behavior: createFieldSchema(),
});

export const Form: FC = () => {
  const [hint, setHint] = useState(false);
  const router = useRouter();
  const [createKptDiary, { isLoading, isSuccess, isError, error }] =
    useSendKptDiaryMutation();

  useEffect(() => {
    if (isSuccess) {
      router.push(pages.kptDiaries.path);
    }
  }, [isSuccess, router]);

  const toggleHint = () => {
    setHint(!hint);
  };

  const onSubmitHandler = (values: InitialValues) => {
    createKptDiary({ ...values });
  };

  const disabled = isLoading || isSuccess;

  return (
    <section className={styles.formContainer}>
      <Header
        hint={hint}
        toggleHintAction={toggleHint}
      />
      <FormikForm<InitialValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
        className={styles.form}
      >
        <TextareaWithHint
          name="situation"
          placeholder="Опиши ситуацию..."
          disabled={disabled}
          hint={hint}
          hintText={"Запишите факты, без мыслей и эмоций"}
        />
        <TextareaWithHint
          name="behavior"
          placeholder="Как ты себя повел?..."
          disabled={disabled}
          hint={hint}
          hintText={"Запишите сами действия"}
        />
        <TextareaWithHint
          name="mood"
          placeholder="Какие чувства вызвала эта ситуация?..."
          disabled={disabled}
          hint={hint}
          hintText={
            "Опишите все чувства, которые возникли. Не забывай про настроение"
          }
        />
        <MoodRangeInput name="moodLevel" />
        <TextareaWithHint
          name="thoughts"
          placeholder="Какие были мысли в этот момент?..."
          disabled={disabled}
          hint={hint}
          hintText={
            "Опишите все чувства, которые возникли. Не забывай про настроение"
          }
        />
        <TextareaWithHint
          name="confirmThoughts"
          placeholder="Как ты подтверждаешь эту мысль?..."
          disabled={disabled}
          hint={hint}
          hintText={"Запишите аргументы, почему эти мысли имеют место"}
        />
        <TextareaWithHint
          name="refuteThoughts"
          placeholder="Как ты опровергаешь эту мысль?..."
          disabled={disabled}
          hint={hint}
          hintText={
            "Запишите контраргументы, почему эти мысли потенциально опасны"
          }
        />
        <TextareaWithHint
          name="newThoughts"
          placeholder="Что ты думаешь об этой ситуации сейчас?..."
          disabled={disabled}
          hint={hint}
          hintText={"Напишите, как бы вы поступили сейчас и что бы изменили"}
        />
        <TextareaWithHint
          name="newMood"
          placeholder="Какое у тебя сейчас настроение?..."
          disabled={disabled}
          hint={hint}
          hintText={"Опишите, как чувствуете себя после заполнения дневника"}
        />
        <MoodRangeInput name="newMoodLevel" />
        {isError && !!error && (
          <FormErrorLabel>{mapApiErrorMessage(error)}</FormErrorLabel>
        )}
        <SubmitButton disabled={disabled} />
      </FormikForm>
    </section>
  );
};
