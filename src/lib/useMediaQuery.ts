"use client";

import { useCallback, useSyncExternalStore } from "react";

/*
  Media queries as an external store rather than state-set-from-an-effect,
  which avoids the cascading render the compiler lint (correctly) rejects.
  Server snapshot is always false, so nothing depends on it during prerender.
*/
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query]
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
