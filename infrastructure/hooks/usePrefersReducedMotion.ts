import { useState, useEffect } from "react";

const usePrefersReducedMotion = (): boolean => {
  const mediaQuery = "(prefers-reduced-motion: reduce)";

  if (typeof window !== "undefined") {
    const mediaQueryList = window.matchMedia(mediaQuery);
    const getInitialState = () => window.matchMedia(mediaQuery).matches;

    const [reducedNotion, setReducedNotion] =
      useState<boolean>(getInitialState);

    useEffect(() => {
      const listener = () => {
        setReducedNotion(window.matchMedia(mediaQuery).matches);
      };
      mediaQueryList.addEventListener("change", listener);
      return () => mediaQueryList.removeEventListener("change", listener);
    }, [mediaQueryList]);

    return reducedNotion;
  } else {
    return true;
  }
};

export default usePrefersReducedMotion;
