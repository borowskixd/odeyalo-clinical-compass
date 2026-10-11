// =======================
// Пример данных с бэкенда
// =======================

export const tagsCategories = [
  {
    id: "contacts",
    title: "Контакты",
    allow_custom_text: false,
    options: [
      { id: "family", title: "Семья" },
      { id: "friends", title: "Друзья" },
      { id: "partner", title: "Партнер" },
      { id: "colleagues", title: "Коллеги" },
      { id: "pets", title: "Питомцы" },
      { id: "clients", title: "Клиенты" },
    ],
  },
  {
    id: "activities",
    title: "Занятия",
    allow_custom_text: false,
    options: [
      { id: "study", title: "Учеба" },
      { id: "sex", title: "Секс" },
      { id: "work", title: "Работа" },
      { id: "hobby", title: "Хобби" },
      { id: "household", title: "Быт" },
      { id: "walk", title: "Прогулка" },
      { id: "reading", title: "Чтение" },
      { id: "cinema", title: "Кино" },
    ],
  },
  {
    id: "general_health",
    title: "Общее здоровье",
    allow_custom_text: false,
    options: [
      { id: "bad_sleep", title: "Плохой сон" },
      { id: "sport", title: "Спорт" },
      { id: "illness", title: "Болезнь" },
      { id: "good_sleep", title: "Хороший сон" },
      { id: "hunger", title: "Голод" },
      { id: "overeating", title: "Переедание" },
      { id: "balanced_food", title: "Сбалансированная еда" },
      { id: "smoking", title: "Курение" },
      { id: "alcohol", title: "Алкоголь" },
    ],
  },
  {
    id: "female_health",
    title: "Женское здоровье",
    allow_custom_text: false,
    options: [
      { id: "menstrual_phase", title: "Менструальная фаза" },
      { id: "follicular_phase", title: "Фолликулярная фаза" },
      { id: "ovulatory_phase", title: "Овуляторная фаза" },
      { id: "luteal_phase", title: "Лютеиновая фаза" },
    ],
  },
  {
    id: "other",
    title: "Другое",
    allow_custom_text: true,
    options: [],
  },
];
