"use client";

import { Button } from "@odeyalo/uikit";
import { useRouter } from "next/navigation";
import { type FC, useEffect, useState } from "react";
import * as Yup from "yup";
import styles from "./styles.module.scss";
import {
  DefaultError,
  FormErrorLabel,
  FormikForm,
  LoadingLoop,
} from "@/client/components";
import {
  useGetInquiriesQuery,
  useSendPsychologistSurveyMutation,
} from "@/client/redux";
import { mapApiErrorMessage } from "@/client/utils";
import { pages } from "@/shared/data";

interface PsychologistSurveyFormFields {
  username: string;
  birth_date: Date | null;
  higher_education_university: string;
  higher_education_specialization: string;
  academic_degree: string;
  association: string;
  courses: string;
  work_format: string;
}

const initialValues: PsychologistSurveyFormFields = {
  username: "",
  birth_date: null,
  higher_education_university: "",
  higher_education_specialization: "",
  academic_degree: "",
  association: "",
  courses: "",
  work_format: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Данное поле обязательно"),
  birth_date: Yup.string().required("Дата обязательна"),
  higher_education_university: Yup.string().required("Данное поле обязательно"),
  higher_education_specialization: Yup.string().required(
    "Данное поле обязательно",
  ),
  academic_degree: Yup.string().required("Данное поле обязательно"),
  association: Yup.string().required("Данное поле обязательно"),
  courses: Yup.string().required("Данное поле обязательно"),
  work_format: Yup.string().required("Данное поле обязательно"),
});

export const PsychologistSurveyForm: FC = () => {
  const router = useRouter();
  const { data: inquiries, isLoading, isError, error } = useGetInquiriesQuery();
  const [sendSurvey, sendState] = useSendPsychologistSurveyMutation();
  const [inquiryIds, setInquiryIds] = useState<number[]>([]);

  useEffect(() => {
    if (sendState.isSuccess) router.push(pages.cabinet.path);
  }, [sendState.isSuccess, router]);

  if (isLoading) return <LoadingLoop />;
  if (isError || !inquiries) return <DefaultError error={error} />;

  const handleClick = (id: number) => {
    setInquiryIds((ids) => {
      const newIds = [...ids];
      const index = newIds.indexOf(id);
      if (index !== -1) newIds.splice(index, 1);
      else newIds.push(id);

      return newIds;
    });
  };

  const onSubmit = (values: PsychologistSurveyFormFields) => {
    sendSurvey({
      ...values,
      birth_date: values.birth_date!.toString(),
      inquiry_ids: inquiryIds,
    });
  };

  const disabled = sendState.isLoading;

  return (
    <FormikForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      className={styles.form}
    >
      <FormikForm.Input
        name="username"
        type="text"
        placeholder="Введите Ваше имя"
        labelText="Ваши Фамилия Имя Отчество"
        required
        disabled={disabled}
      />
      <FormikForm.DatePicker
        name="birth_date"
        type="text"
        placeholder="Введите ответ"
        labelText="Ваша дата рождения?"
        required
        disabled={disabled}
      />
      <FormikForm.TextArea
        name="higher_education_university"
        type="text"
        placeholder="Введите ответ"
        labelText={`Какое у вас высшее образование?\n1. Год окончания 2. Название ВУЗа`}
        exampleText={`Например,\n2003 - МГУ, клиническая психология.\n2010 - ВШЭ - психоанализ.`}
        required
        disabled={disabled}
      />
      <FormikForm.TextArea
        name="higher_education_specialization"
        type="text"
        placeholder="Введите ответ"
        labelText="Напишите название факультета и специалитета"
        exampleText={`Например,\nФакультет психологии, клиническая психология.\nПсихоанализ.`}
        required
        disabled={disabled}
      />
      <FormikForm.TextArea
        name="academic_degree"
        type="text"
        placeholder="Введите ответ"
        labelText="Укажите академическую степень (бакалавриат, магистратура) или ученую степень (если есть)."
        required
        disabled={disabled}
      />
      <FormikForm.TextArea
        name="courses"
        type="text"
        placeholder="Введите ответ"
        labelText="Напишите, какое у вас дополнительное образование, если есть (зависимости, РПП, ПТСР или другое)."
        required
        disabled={disabled}
      />
      <FormikForm.Input
        name="work_format"
        type="text"
        placeholder="Введите ответ"
        labelText="Выберите формат работы"
        required
        disabled={disabled}
      />
      <FormikForm.Input
        name="association"
        type="text"
        placeholder="Введите ответ"
        labelText="Ассоциация"
        required
        disabled={disabled}
      />
      <div className={styles.inquiries}>
        {inquiries.map((inquiry) => (
          <Button
            size="xs"
            onClick={() => handleClick(inquiry.id)}
            key={inquiry.id}
            view={inquiryIds.includes(inquiry.id) ? "primary" : "default"}
          >
            {inquiry.text}
          </Button>
        ))}
      </div>
      {sendState.isError && (
        <FormErrorLabel>{mapApiErrorMessage(sendState.error)}</FormErrorLabel>
      )}
      <Button
        type="submit"
        className={styles.button}
        view="primary"
        width="max"
        disabled={disabled}
      >
        Сохранить
      </Button>
    </FormikForm>
  );
};
