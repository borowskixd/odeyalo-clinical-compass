"use client";

import {
  type AnalyticsCallOptions,
  type CustomEventName,
  logEvent,
  setUserId,
} from "@firebase/analytics";
import { useContext, useEffect } from "react";
import { AnalyticsContext } from "./AnalyticsProvider";
import { type AnalyticsEventName } from "./types";
import { useAppSelector } from "@/client/hooks";
import { selectProfile } from "@/client/redux";

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  const { id, role } = useAppSelector(selectProfile);

  if (context === undefined) {
    throw new Error("useAnalytics must be used within AnalyticsProvider");
  }

  useEffect(() => {
    if (context.analytics && id) {
      setUserId(context.analytics, id);
    }
  }, [context.analytics, id]);

  const newLogEvent = (
    eventName: CustomEventName<AnalyticsEventName>,
    eventParams?: {
      [key: string]: any;
    },
    options?: AnalyticsCallOptions,
  ) => {
    if (context.analytics && process.env.NEXT_PUBLIC_MODE === "production") {
      logEvent(
        context.analytics,
        eventName,
        {
          user_role: role,
          timestamp: Date.now(),
          ...eventParams,
        },
        options,
      );
    }
  };

  return {
    analytics: context.analytics,
    logEvent: newLogEvent,
  };
};
