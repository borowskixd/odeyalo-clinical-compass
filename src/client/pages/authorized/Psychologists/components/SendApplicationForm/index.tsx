import { Button, Text } from "@odeyalo/uikit";
import { type FC, useEffect, useState } from "react";
import * as Yup from "yup";
import styles from "./styles.module.scss";
import {
  DefaultError,
  FormErrorLabel,
  FormikForm,
  LoadingLoop,
} from "@/client/components";
import { useAppDispatch } from "@/client/hooks";
import {
  PopupsService,
  useGetInquiriesQuery,
  useSendApplicationMutation,
} from "@/client/redux";
import { mapApiErrorMessage } from "@/client/utils";

interface Props {
  psychologistId: string;
  closeModal: () => void;
}

interface SendApplicationFormFields {
  request: string;
}

const validationSchema = Yup.object().shape({
  request: Yup.string().trim().required("Опишите запрос"),
});

export const SendApplicationForm: FC<Props> = ({
  psychologistId,
  closeModal,
}) => {
  const dispatch = useAppDispatch();
  const [inquiryIds, setInquiryIds] = useState<number[]>([]);

  const { data: inquiries, ...getInquiriesQuery } = useGetInquiriesQuery();
  const [sendApplication, { isLoading, isSuccess, isError, error, reset }] =
    useSendApplicationMutation();

  useEffect(() => {
    if (isSuccess) {
      closeModal();
      dispatch(PopupsService.openSnackbarWithDelay("Заявка отправлена!"));
      reset();
    }
  }, [isSuccess, dispatch, closeModal, reset]);

  const onSubmit = (values: SendApplicationFormFields) => {
    sendApplication({
      psychologistId,
      inquiry: inquiryIds,
      ...values,
    });
  };

  const handleClick = (id: number) => {
    setInquiryIds((ids) => {
      const newIds = [...ids];
      const index = newIds.indexOf(id);
      if (index !== -1) newIds.splice(index, 1);
      else newIds.push(id);

      return newIds;
    });
  };

  const renderContent = () => {
    if (getInquiriesQuery.isLoading) return <LoadingLoop />;
    if (getInquiriesQuery.isError || !inquiries)
      return <DefaultError error={getInquiriesQuery.error} />;

    return (
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
    );
  };

  return (
    <FormikForm
      initialValues={{
        request: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      className={styles.form}
    >
      <FormikForm.Input
        name="request"
        type="text"
        placeholder="Введите запрос"
        labelText="Ваше обращение"
        disabled={isLoading}
      />
      <Text
        variant="body-l"
        className={styles.label}
      >
        Что вас беспокоит?
      </Text>
      {renderContent()}
      {isError && !!error && (
        <FormErrorLabel>{mapApiErrorMessage(error)}</FormErrorLabel>
      )}
      <Button
        type="submit"
        view="primary"
        width="max"
        className={styles.formButton}
      >
        Отправить
      </Button>
    </FormikForm>
  );
};
