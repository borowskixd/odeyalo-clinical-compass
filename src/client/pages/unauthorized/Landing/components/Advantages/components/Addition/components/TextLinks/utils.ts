export interface Reference {
  id: number;
  authors: string;
  title: string;
  journal: string;
  year: number;
  volume?: string;
  issue?: string;
  pages: string;
}

export const references: Reference[] = [
  {
    id: 1,
    authors: "Ехлаков Ю. П., Симонов Т. С., Тишаева А. Г.",
    title:
      "Нечеткая модель оценки возможности выгорания сотрудника на основании его личностных характеристик",
    journal: "Проблемы управления",
    year: 2025,
    volume: "Т. 5",
    issue: "№. 0",
    pages: "С. 57-68",
  },
  {
    id: 2,
    authors: "Ехлаков Ю. П., Симонов Т. С., Тишаева А. Г.",
    title:
      "Методика информационной поддержки управления личностным благополучием сотрудников ИТ-компании",
    journal:
      "Доклады Томского государственного университета систем управления и радиоэлектроники",
    year: 2026,
    volume: "Т. 29",
    issue: "№ 1",
    pages: "С. 102–113",
  },
  {
    id: 3,
    authors: "Kolenik, T., Schiepek, G., & Gams, M.",
    title:
      "Computational psychotherapy system for mental health prediction and behavior change with a conversational agent",
    journal: "Neuropsychiatric Disease and Treatment",
    year: 2024,
    pages: "2465-2498",
  },
  {
    id: 4,
    authors:
      "Nagamitsu, S., Kanie, A., Sakashita, K., Sakuta, R., Okada, A., Matsuura, K., ... & Horikoshi, M.",
    title:
      "Adolescent health promotion interventions using well-care visits and a smartphone cognitive behavioral therapy app: randomized controlled trial",
    journal: "JMIR mHealth and uHealth",
    year: 2022,
    volume: "10",
    issue: "5",
    pages: "e34154",
  },
  {
    id: 5,
    authors: "Kim, M. H., Moon, Y. K., & Chung, K. M.",
    title:
      "An app-based cognitive behavioral therapy program tailored for college students: randomized controlled trial",
    journal: "JMIR mHealth and uHealth",
    year: 2025,
    volume: "13",
    pages: "e50006",
  },
];
