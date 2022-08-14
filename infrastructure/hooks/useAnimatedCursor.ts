import { useEffect, useState } from "react";

const useAnimatedCursor = (): number => {
  const [activeCursorIndex, setActiveCursorIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCursorIndex((active) => active + 1);
    }, 300);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (activeCursorIndex === 8) {
      setActiveCursorIndex(0);
    }
  }, [activeCursorIndex]);

  return activeCursorIndex;
};

export default useAnimatedCursor;
