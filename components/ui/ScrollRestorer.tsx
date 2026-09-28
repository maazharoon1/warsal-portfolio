"use client";

import { useEffect } from "react";

export function ScrollRestorer() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      const previousScrollRestoration = history.scrollRestoration;
      history.scrollRestoration = "manual";

      window.scrollTo(0, 0);

      return () => {
        history.scrollRestoration = previousScrollRestoration;
      };
    }

    window.scrollTo(0, 0);
  }, []);

  return null;
}
