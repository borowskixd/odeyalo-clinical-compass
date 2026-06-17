import { SEVER_API_URL } from "@/shared/config/api";
import {
  type GetExerciseStructureApiResponseData,
  type GetExerciseStructureResponseData,
} from "@/shared/types";

export const mapGetExerciseStructureResponse = (
  data: GetExerciseStructureApiResponseData,
): GetExerciseStructureResponseData => {
  const {
    id,
    title,
    picture_link,
    open,
    description,
    time_to_read,
    questions_count,
    pulled_fields,
    pages,
  } = data;

  return {
    id,
    title,
    description,
    image: `${SEVER_API_URL}${picture_link}`,
    closed: !open,
    questionsCount: questions_count,
    timeToRead: time_to_read,
    pulledFields: (pulled_fields ?? []).map((group) => ({
      sourceCompletedExerciseId: group.source_completed_exercise_id,
      sourceExerciseId: group.source_exercise_id,
      sourceGroupKey: group.source_group_key,
      fields: group.fields.map((field) => ({
        sourceFilledFieldId: field.source_filled_field_id,
        fieldId: field.field_id,
        title: field.title,
        text: field.text,
        sourceGroupKey: field.source_group_key,
      })),
    })),
    pages: (pages ?? []).map((page) => ({
      number: page.page_number,
      sections: (page.sections ?? []).map((section) => {
        const { id, title, type, view, prompt, placeholder, variants } =
          section;

        return {
          id,
          label: title,
          type,
          view,
          placeholder,
          prompt,
          variants: (variants ?? []).map((variant) => ({
            id: variant.id,
            title: variant.title,
            fieldId: variant.field_id,
          })),
        };
      }),
    })),
  };
};
