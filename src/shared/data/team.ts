import { type StaticImageData } from "next/image";
import AlexanderPak from "@/client/assets/webp/team/AlexanderPak.webp";
import AlinaTisheva from "@/client/assets/webp/team/AlinaTishaeva.webp";
import DaniilKostin from "@/client/assets/webp/team/DaniilKostin.webp";
import DmitryBespalov from "@/client/assets/webp/team/DmitryBespalov.webp";
import IlyaFomin from "@/client/assets/webp/team/IlyaFomin.webp";
import IslambekMaratov from "@/client/assets/webp/team/IslambekMaratov.webp";
import KamillaSaskeneva from "@/client/assets/webp/team/KamillaSaskeneva.webp";
import MaksimBazhenov from "@/client/assets/webp/team/MaksimBazhenov.webp";
import SofyaKhrabrova from "@/client/assets/webp/team/SofyaKhrabrova.webp";
import SofyaSkripnikova from "@/client/assets/webp/team/SofyaSkripnikova.webp";
import TimofeySimonov from "@/client/assets/webp/team/TimofeySimonov.webp";
import VladAldoshin from "@/client/assets/webp/team/VladAldoshin.webp";

export interface TeamMember {
  name: string;
  image: StaticImageData;
  role: string;
}

export const team: TeamMember[] = [
  {
    name: "Тимофей Симонов",
    image: TimofeySimonov,
    role: "руководитель,\nandroid-разработчик",
  },
  {
    name: "Илья Фомин",
    image: IlyaFomin,
    role: "android-разработчик",
  },
  {
    name: "Алина Тишаева",
    image: AlinaTisheva,
    role: "психолог",
  },
  {
    name: "Камилла Саскенева",
    image: KamillaSaskeneva,
    role: "психолог",
  },
  {
    name: "Софья Скрипникова",
    image: SofyaSkripnikova,
    role: "психолог",
  },
  {
    name: "Даниил Костин",
    image: DaniilKostin,
    role: "дизайнер",
  },
  {
    name: "Влад Алдошин",
    image: VladAldoshin,
    role: "ios-разработчик",
  },
  {
    name: "Максим Баженов",
    image: MaksimBazhenov,
    role: "frontend-разработчик",
  },
  {
    name: "Софья Храброва",
    image: SofyaKhrabrova,
    role: "frontend-разработчик",
  },
  {
    name: "Дмитрий Беспалов",
    image: DmitryBespalov,
    role: "backend-разработчик",
  },
  {
    name: "Александр Пак",
    image: AlexanderPak,
    role: "backend-разработчик",
  },
  {
    name: "Исламбек Маратов",
    image: IslambekMaratov,
    role: "backend-разработчик",
  },
];
