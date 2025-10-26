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
    pages,
  } = data;

  return {
    id,
    title,
    description,
    image: picture_link,
    closed: !open,
    questionsCount: questions_count,
    timeToRead: time_to_read,
    pages: pages.map((page) => ({
      number: page.page_number,
      sections: page.sections.map((section) => {
        const { id, title, type, view, prompt, placeholder } = section;

        return {
          id,
          label: title,
          type,
          view,
          placeholder,
          prompt,
        };
      }),
    })),
  };
};
