"use client";

import { SubmitButton } from "./components";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { FormErrorLabel, FormikForm } from "@/client/components";
import {
  ExerciseMoodRangeInput,
  ExerciseTextarea,
} from "@/client/pages/authorized/exercises/components";
import { useSendKptDiaryMutation } from "@/client/redux";
import { mapApiErrorMessage } from "@/client/utils";
import { pages } from "@/shared/data";
import { type FC, useEffect } from "react";

interface Props {
  hint: boolean;
}

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
  moodLevel: 50,
  thoughts: "",
  confirmThoughts: "",
  refuteThoughts: "",
  newMood: "",
  newThoughts: "",
  newMoodLevel: 50,
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

export const Form: FC<Props> = ({ hint }) => {
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

  const disabled = isLoading || isSuccess;

  return (
    <FormikForm<InitialValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmitHandler}
      className={styles.form}
    >
      <ExerciseTextarea
        name="situation"
        placeholder="Опиши ситуацию..."
        disabled={disabled}
        hint={hint}
        hintText={"Запишите факты, без мыслей и эмоций"}
      />
      <ExerciseTextarea
        name="behavior"
        placeholder="Как ты себя повел?..."
        disabled={disabled}
        hint={hint}
        hintText={"Запишите сами действия"}
      />
      <ExerciseTextarea
        name="mood"
        placeholder="Какие чувства вызвала эта ситуация?..."
        disabled={disabled}
        hint={hint}
        hintText={
          "Опишите все чувства, которые возникли. Не забывай про настроение"
        }
      />
      <ExerciseMoodRangeInput name="moodLevel" />
      <ExerciseTextarea
        name="thoughts"
        placeholder="Какие были мысли в этот момент?..."
        disabled={disabled}
        hint={hint}
        hintText={
          "Опишите все чувства, которые возникли. Не забывай про настроение"
        }
      />
      <ExerciseTextarea
        name="confirmThoughts"
        placeholder="Как ты подтверждаешь эту мысль?..."
        disabled={disabled}
        hint={hint}
        hintText={"Запишите аргументы, почему эти мысли имеют место"}
      />
      <ExerciseTextarea
        name="refuteThoughts"
        placeholder="Как ты опровергаешь эту мысль?..."
        disabled={disabled}
        hint={hint}
        hintText={
          "Запишите контраргументы, почему эти мысли потенциально опасны"
        }
      />
      <ExerciseTextarea
        name="newThoughts"
        placeholder="Что ты думаешь об этой ситуации сейчас?..."
        disabled={disabled}
        hint={hint}
        hintText={"Напишите, как бы вы поступили сейчас и что бы изменили"}
      />
      <ExerciseTextarea
        name="newMood"
        placeholder="Какое у тебя сейчас настроение?..."
        disabled={disabled}
        hint={hint}
        hintText={"Опишите, как чувствуете себя после заполнения дневника"}
      />
      <ExerciseMoodRangeInput name="newMoodLevel" />
      {isError && !!error && (
        <FormErrorLabel>{mapApiErrorMessage(error)}</FormErrorLabel>
      )}
      <SubmitButton disabled={disabled} />
    </FormikForm>
  );
};
