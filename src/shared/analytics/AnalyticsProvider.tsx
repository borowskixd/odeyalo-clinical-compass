"use client";

import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import {
  type FC,
  type ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";

type AnalyticsProviderProps = {
  children: ReactNode;
};

type AnalyticsContextValue = {
  analytics: ReturnType<typeof getAnalytics> | null;
};

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_ANALYTICS_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_ANALYTICS_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_ANALYTICS_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_ANALYTICS_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_ANALYTICS_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_ANALYTICS_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_ANALYTICS_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const AnalyticsContext = createContext<AnalyticsContextValue>({
  analytics: null,
});

export const AnalyticsProvider: FC<AnalyticsProviderProps> = ({ children }) => {
  const [analytics, setAnalytics] = useState<ReturnType<
    typeof getAnalytics
  > | null>(null);

  useEffect(() => {
    isSupported().then((supported) => {
      if (supported && process.env.NEXT_PUBLIC_MODE === "production") {
        const analytics = getAnalytics(app);
        setAnalytics(analytics);
      }
    });
  }, []);

  return (
    <AnalyticsContext.Provider value={{ analytics }}>
      {children}
    </AnalyticsContext.Provider>
  );
};
