import {
  type GetPraiseApiResponse,
  type GetPraiseResponse,
} from "@/shared/types";

export const mapGetPraiseResponse = (
  data: GetPraiseApiResponse,
): GetPraiseResponse => {
  return {
    consecutiveDays: data.consecutive_days,
    title: data.title,
    subtitle: data.subtitle,
  };
};
