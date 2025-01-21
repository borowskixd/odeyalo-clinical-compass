"use server";

import { MOBILE_DEVICE_TYPES } from "../data";
import { headers } from "next/headers";
import { userAgent } from "next/server";

export const getIsMobile = async (): Promise<boolean> => {
  const headersList = await headers();
  const ua = userAgent({ headers: headersList });

  const deviceType = ua.device.type;

  const isMobile = !!deviceType && MOBILE_DEVICE_TYPES.includes(deviceType);

  return isMobile;
};
