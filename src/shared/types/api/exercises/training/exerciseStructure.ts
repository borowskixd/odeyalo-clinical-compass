import type {
  GetTrainingExerciseApiResponseData,
  GetTrainingExerciseResponseData,
} from "./exercise";

export type GetTrainingExerciseStructureApiResponseData = Omit<
  GetTrainingExerciseApiResponseData,
  "is_completed"
> & {
  questions: {
    training_exercise_id: string;
    id: string;
    text: string;
    formulation: string;
    variants: {
      question_id: string;
      title: string;
      correct: boolean;
      id: string;
      explanation: string;
    }[];
  }[];
};

export type GetTrainingExerciseStructureResponseData = Omit<
  GetTrainingExerciseResponseData,
  "completed"
> & {
  questions: {
    id: string;
    question: string;
    formulation: string;
    answers: {
      id: string;
      answer: string;
      explanation: string;
      correct: boolean;
    }[];
  }[];
};
