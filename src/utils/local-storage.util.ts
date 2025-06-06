// utils/localStorageMap.ts

import { TTableOrder } from "@/shared/types/dashboard.types";

const LOCAL_STORAGE_KEY = "tableOrder";

export const saveNestedMapToStorage = (map: TTableOrder): void => {
  const serialized = JSON.stringify(
    Array.from(map.entries()).map(([outerKey, innerMap]) => [
      outerKey,
      Array.from(innerMap.entries()),
    ])
  );
  localStorage.setItem(LOCAL_STORAGE_KEY, serialized);
};

export const loadNestedMapFromStorage = (): TTableOrder => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) return new Map();

  try {
    const parsed: [number, [string, number][]][] = JSON.parse(stored);
    const restored = new Map<number, Map<string, number>>(
      parsed.map(([outerKey, innerEntries]) => [
        outerKey,
        new Map(innerEntries),
      ])
    );
    return restored;
  } catch (err) {
    console.error("Failed to parse nested map from localStorage:", err);
    return new Map();
  }
};

export const clearNestedMapStorage = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};
