export type ExerciseStructureData = {
  id: string;
  title: string;
  link_to_image: string;
  description: string;
  closed: false;
  pages: {
    page_number: number;
    sections: {
      id: string;
      title: string;
      view: "default" | "primary";
      type: "input" | "addable_list";
      placeholder: string;
      prompt: string | null;
    }[];
  }[];
};

export type ValueType = string | string[];

export type FormValuesType = Record<string, ValueType>;
