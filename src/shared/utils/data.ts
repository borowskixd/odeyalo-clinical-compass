export const months = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];

export const days = [
  "воскресенье",
  "понедельник",
  "вторник",
  "среда",
  "четверг",
  "пятница",
  "суббота",
];

export const calculateAge = (date: string): number => {
  if (isNaN(Date.parse(date))) {
    return 0;
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const birthday = new Date(date);
  const birthdayInThisYear = new Date(
    today.getFullYear(),
    birthday.getMonth(),
    birthday.getDate(),
  );

  let age = today.getFullYear() - birthday.getFullYear();

  if (today < birthdayInThisYear) {
    age -= 1;
  }

  return age;
};

export const mapAgeToText = (age: number): string => {
  const ageStr = String(age);
  if (age < 1 || age % 1 !== 0) return ageStr;
  const lastNumber: number = Number(ageStr.at(-1));

  const l = "лет";
  const g = "год";
  const ga = "года";

  if (age === 11 || age === 12 || age == 13 || age === 14)
    return ageStr + " " + l;
  else if (lastNumber === 1) return ageStr + " " + g;
  else if (lastNumber === 2 || lastNumber === 3 || lastNumber === 4)
    return ageStr + " " + ga;

  return ageStr + " " + l;
};

export const mapDatetimeToText = (datetime: string): string => {
  const offset = -(new Date().getTimezoneOffset() / 60);
  const date = new Date(datetime);

  const hours = String(date.getHours() + offset).padStart(2, "0");

  const minutes = String(date.getMinutes()).padStart(2, "0");

  const result = `${date.getDate().toString().padStart(2, "0")}.${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}.${date.getFullYear()} ${hours}:${minutes}`;

  return result;
};

export const getCurrentDay = (): string => {
  const date = new Date();

  const day = days[date.getDay()];
  const mappedDay = day.charAt(0).toUpperCase() + day.slice(1);

  const result = `${mappedDay}, ${date.getDate()} ${months[date.getMonth()]}`;
  return result;
};

export const mapDateToApiDateFormat = (date: Date) => {
  const month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const dateDay = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return `${date.getFullYear()}-${month}-${dateDay}`;
};

export const compareDates = (
  date1: Date,
  date2: Date | "current",
  config?: {
    date?: boolean;
    day?: boolean;
    month?: boolean;
    fullYear?: boolean;
    hours?: boolean;
    minutes?: boolean;
    seconds?: boolean;
    milliseconds?: boolean;
    time?: boolean;
    timezoneOffset?: boolean;
  },
) => {
  let hasConfig = false;
  let result = true;

  if (!config) return date1 === date2;

  if (date2 === "current") date2 = new Date();

  if (config.date) {
    result = result && date1.getDate() === date2.getDate();
    hasConfig = true;
  }
  if (config.day) {
    result = result && date1.getDay() === date2.getDay();
    hasConfig = true;
  }
  if (config.month) {
    result = result && date1.getMonth() === date2.getMonth();
    hasConfig = true;
  }
  if (config.fullYear) {
    result = result && date1.getFullYear() === date2.getFullYear();
    hasConfig = true;
  }
  if (config.hours) {
    result = result && date1.getHours() === date2.getHours();
    hasConfig = true;
  }
  if (config.minutes) {
    result = result && date1.getMinutes() === date2.getMinutes();
    hasConfig = true;
  }
  if (config.seconds) {
    result = result && date1.getSeconds() === date2.getSeconds();
    hasConfig = true;
  }
  if (config.milliseconds) {
    result = result && date1.getMilliseconds() === date2.getMilliseconds();
    hasConfig = true;
  }
  if (config.time) {
    result = result && date1.getTime() === date2.getTime();
    hasConfig = true;
  }
  if (config.timezoneOffset) {
    result = result && date1.getTimezoneOffset() === date2.getTimezoneOffset();
    hasConfig = true;
  }

  if (!hasConfig) return date1 === date2;
  return result;
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const currentYear = now.getFullYear();
  if (year === currentYear) {
    return `${day}.${month} ${hours}:${minutes}`;
  } else {
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }
}
