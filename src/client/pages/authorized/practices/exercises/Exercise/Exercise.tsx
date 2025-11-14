"use client";

import { ExerciseHeader } from "../../components";
import { ButtonsContainer, FormGenerator } from "./components";
import styles from "./styles.module.scss";
import { type FormValuesType, type ValueType } from "./types";
import { generateInitialValue, validateExerciseData } from "./utils";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  ContentWrapper,
  FormErrorLabel,
  LoadingLoop,
} from "@/client/components";
import {
  useCompleteExerciseMutation,
  useGetExerciseStructureQuery,
} from "@/client/redux";
import { pages } from "@/shared/data";
import { type CompleteExerciseRequestData } from "@/shared/types";
import {
  type FC,
  type FormEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";

export const ExercisePage: FC = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { data: exerciseStructure, ...getExerciseStructureState } =
    useGetExerciseStructureQuery(id);
  const [completeExercise, completeExerciseState] =
    useCompleteExerciseMutation();

  const [values, setValues] = useState<FormValuesType | null>(
    exerciseStructure ? generateInitialValue(exerciseStructure) : null,
  );
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    if (completeExerciseState.isSuccess) {
      router.push(pages.exercisePreview.getLink({ params: { id } }));
    }
  }, [completeExerciseState.isSuccess, router, id]);

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

      for (const key in values) {
        mappedValues.push({
          id: key,
          value: values[key],
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

  if (getExerciseStructureState.isLoading) return <LoadingLoop />;

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
