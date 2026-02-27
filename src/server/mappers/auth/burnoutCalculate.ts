import {
  type GetBurnoutCalculateApiResponseData,
  type GetBurnoutCalculateResponseData,
} from "@/shared/types";

export const mapBurnoutCalculateResponse = (
  data: GetBurnoutCalculateApiResponseData,
): GetBurnoutCalculateResponseData => {
  const { result } = data;
  return {
    result,
  };
};
