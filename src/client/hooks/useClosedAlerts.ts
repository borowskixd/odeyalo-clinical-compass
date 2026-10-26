"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "closed-alert-ids";

const readClosedIds = (): Set<string> => {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? new Set(parsed) : new Set();
  } catch {
    return new Set();
  }
};

const writeClosedIds = (ids: Set<string>) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    // localStorage может быть недоступен
  }
};

export const useClosedAlerts = () => {
  const [closedIds, setClosedIds] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    setClosedIds(readClosedIds());
  }, []);

  const closeAlert = useCallback((testResultId: string) => {
    setClosedIds((prev) => {
      const next = new Set(prev);
      next.add(testResultId);
      writeClosedIds(next);
      return next;
    });
  }, []);

  return { closedIds, closeAlert };
};
