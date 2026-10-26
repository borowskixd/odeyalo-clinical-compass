export type SchemeNode =
  | {
      id: string;
      type: "question";
      text: string;
      options: { label: string; next: string }[];
    }
  | {
      id: string;
      type: "number-input";
      text: string;
      placeholder?: string;
      min?: number;
      max?: number;
      getNext: (value: number) => string;
    }
  | {
      id: string;
      type: "result";
      text: string;
    };

export const START_NODE_ID = "q_taken";

export const schemeNodes: Record<string, SchemeNode> = {
  q_taken: {
    id: "q_taken",
    type: "question",
    text: "Какие препараты принимал пациент?",
    options: [
      { label: "Только антидепрессант", next: "q_weeks" },
      { label: "Не принимал", next: "r_ssri" },
      { label: "Антидепрессант и Прегабалин", next: "q_effect_pre" },
    ],
  },

  q_weeks: {
    id: "q_weeks",
    type: "number-input",
    text: "Сколько недель проводилась монотерапия антидепрессантом?",
    placeholder: "Введите количество недель",
    min: 0,
    max: 104,
    getNext: (weeks) => {
      if (weeks < 6) return "r_continue";
      if (weeks < 12) return "q_partial_effect";
      return "q_effect";
    },
  },

  q_partial_effect: {
    id: "q_partial_effect",
    type: "question",
    text: "Наблюдается ли частичный эффект от терапии?",
    options: [
      { label: "Да", next: "r_increase_dose" },
      { label: "Нет", next: "r_add_antipsychotic" },
    ],
  },

  q_effect_pre: {
    id: "q_effect_pre",
    type: "question",
    text: "Наблюдается ли эффект от терапии?",
    options: [
      { label: "Да", next: "r_continue" },
      { label: "Нет", next: "r_aviandr" },
    ],
  },

  q_effect: {
    id: "q_effect",
    type: "question",
    text: "Наблюдается ли эффект от терапии?",
    options: [
      { label: "Да", next: "r_continue" },
      { label: "Нет", next: "r_add_antipsychotic" },
    ],
  },

  r_ssri: {
    id: "r_ssri",
    type: "result",
    text: "Рекомендуется монотерапия СИОЗС или СИОЗСН в течение 4–6 недель (сертралин*, пароксетин*, венлафаксин, эсциталопрам, дулоксетин, агомелатин). * — если нет злоупотребления ПАВ в анамнезе.",
  },

  r_continue: {
    id: "r_continue",
    type: "result",
    text: "Рекомендуется продолжать монотерапию 6–12 месяцев",
  },

  r_increase_dose: {
    id: "r_increase_dose",
    type: "result",
    text: "Рекомендуется увеличение дозы до максимальной, контроль комплаентности (до 12 недель)",
  },

  r_add_antipsychotic: {
    id: "r_add_antipsychotic",
    type: "result",
    text: "Рекомендуется добавить антипсихотические средства",
  },

  r_aviandr: {
    id: "r_aviandr",
    type: "result",
    text: "Рекомендуется Авиандр",
  },
};
