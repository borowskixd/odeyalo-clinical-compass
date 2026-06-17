"use client";

import { useParams, useRouter } from "next/navigation";
import {
  type FC,
  type FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { ExerciseHeader } from "../../components";
import { ButtonsContainer, FormGenerator } from "./components";
import styles from "./styles.module.scss";
import { type FormValuesType, type ValueType } from "./types";
import {
  generateInitialValue,
  getPulledFieldReference,
  mapFormValueToText,
  validateExerciseData,
} from "./utils";
import {
  Container,
  ContentWrapper,
  FormErrorLabel,
  LoadingLoop,
  PageTitle,
} from "@/client/components";
import {
  useCompleteExerciseMutation,
  useGetExerciseQuery,
  useGetExerciseStructureQuery,
} from "@/client/redux";
import { mapApiErrorMessage } from "@/client/utils";
import { useAnalytics } from "@/shared/analytics";
import { pages } from "@/shared/data";
import { type CompleteExerciseRequestData } from "@/shared/types";

export const ExercisePage: FC = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { logEvent } = useAnalytics();

  const { data: exercise, ...getExerciseState } = useGetExerciseQuery(id);
  const { data: exerciseStructure, ...getExerciseStructureState } =
    useGetExerciseStructureQuery(id, {
      skip: !exercise || exercise.closed,
    });
  const [completeExercise, completeExerciseState] =
    useCompleteExerciseMutation();

  const [values, setValues] = useState<FormValuesType | null>(
    exerciseStructure ? generateInitialValue(exerciseStructure) : null,
  );
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    logEvent("exercise-page-opened", {
      exercise_id: id,
    });
  }, [id, logEvent]);

  useEffect(() => {
    if (completeExerciseState.isSuccess) {
      router.push(pages.exercisePreview.getLink({ params: { id } }));

      logEvent("exercise-completed", {
        exercise_id: id,
      });
    }
  }, [completeExerciseState.isSuccess, router, id, logEvent]);

  useEffect(() => {
    setValues(
      exerciseStructure ? generateInitialValue(exerciseStructure) : null,
    );
  }, [exerciseStructure]);

  const changeHandler = useCallback(
    (name: string, value: ValueType) => {
      setErrorMessage(validateExerciseData(values));

      setValues((values) => ({
        ...values,
        [name]: value,
      }));
    },
    [values],
  );

  const nextPageHandler = () => {
    if (exerciseStructure) {
      setPageNumber((pageNumber) => {
        if (pageNumber + 1 < exerciseStructure.pages.length) {
          return pageNumber + 1;
        }
        return exerciseStructure.pages.length - 1;
      });
    }
  };

  const prevPageHandler = () => {
    setPageNumber((pageNumber) => {
      if (pageNumber > 0) {
        return pageNumber - 1;
      }
      return 0;
    });
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const validationError = validateExerciseData(values);

    if (validationError === null) {
      const mappedValues: CompleteExerciseRequestData["values"] = [];
      const pulledReference = values ? getPulledFieldReference(values) : null;

      for (const key in values) {
        mappedValues.push({
          id: key,
          value: mapFormValueToText(values[key]),
          pulledCompletedExerciseId:
            pulledReference?.pulledCompletedExerciseId ?? null,
          pulledGroupKey: pulledReference?.pulledGroupKey ?? null,
        });
      }

      completeExercise({
        exerciseId: id,
        values: mappedValues,
      });
    } else {
      setErrorMessage(validationError);
      setShowError(true);
    }
  };

  if (
    getExerciseState.isLoading ||
    (!exercise?.closed && getExerciseStructureState.isLoading)
  ) {
    return <LoadingLoop />;
  }

  if (getExerciseState.isError) {
    return (
      <FormErrorLabel>
        {mapApiErrorMessage(getExerciseState.error)}
      </FormErrorLabel>
    );
  }

  if (getExerciseStructureState.isError) {
    return (
      <FormErrorLabel>
        {mapApiErrorMessage(getExerciseStructureState.error)}
      </FormErrorLabel>
    );
  }

  if (exercise?.closed) {
    return (
      <Container>
        <ContentWrapper>
          <div className={styles.lockedState}>
            <PageTitle>Упражнение пока недоступно</PageTitle>
            <p className={styles.lockedText}>
              Сначала выполните предыдущее упражнение.
            </p>
          </div>
        </ContentWrapper>
      </Container>
    );
  }

  return (
    <Container>
      {exerciseStructure && (
        <ContentWrapper>
          <ExerciseHeader
            title={exerciseStructure.title}
            description={exerciseStructure.description}
          />
          <form
            onSubmit={submitHandler}
            className={styles.form}
          >
            <FormGenerator
              exerciseStructure={exerciseStructure}
              pageNumber={pageNumber}
              values={values}
              changeHandler={changeHandler}
            />
            {showError && errorMessage && (
              <FormErrorLabel>{errorMessage}</FormErrorLabel>
            )}
            <ButtonsContainer
              prevPageHandler={prevPageHandler}
              nextPageHandler={nextPageHandler}
              disabled={
                completeExerciseState.isLoading || completeExerciseState.isError
              }
              isFirstPage={pageNumber === 0}
              isLastPage={pageNumber === exerciseStructure.pages.length - 1}
            />
          </form>
        </ContentWrapper>
      )}
    </Container>
  );
};
