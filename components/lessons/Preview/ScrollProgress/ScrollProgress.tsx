import Link from "next/link";
import { useState, useEffect } from "react";

import styles from "./ScrollProgress.module.scss";

type ScrollProgressProps = {
  className?: string;
  onScrollComplete?: () => void;
};

const ScrollProgress = ({
  className = "",
  onScrollComplete,
}: ScrollProgressProps) => {
  const [scrollYPercentage, setScrollYPercentage] = useState<number>(0);
  const radius = 20;
  const stroke = 2;
  const progress = scrollYPercentage;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getScrollPosition = () => {
    const { pageYOffset, innerHeight } = window;
    const { scrollHeight } = document.body;
    const scrollPositionInPercentage =
      (pageYOffset / (scrollHeight - innerHeight)) * 100;
    return scrollPositionInPercentage >= 100 ? 100 : scrollPositionInPercentage;
  };

  useEffect(() => {
    const updatePosition = () => {
      setScrollYPercentage(getScrollPosition());
    };
    updatePosition();
    window.addEventListener("scroll", updatePosition);
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  useEffect(() => {
    if (scrollYPercentage >= 100 && onScrollComplete) {
      onScrollComplete();
    }
  }, [scrollYPercentage, onScrollComplete]);

  const progressCircleProps = {
    strokeWidth: stroke,
    style: { strokeDashoffset },
    r: normalizedRadius,
    cx: radius,
    cy: radius,
  };

  const progressCopy = `You have read ${Math.round(
    scrollYPercentage
  )}% of this section.`;

  return (
    <>
      <div
        role="progressbar"
        className="screenReaderText"
        aria-valuenow={Math.round(scrollYPercentage)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={progressCopy}
      >
        {progressCopy}
      </div>

      <a
        href="/"
        className={`${styles.progressIndicator} ${className}`}
        data-complete={progress >= 100 ? "true" : "false"}
      >
        <svg
          height={radius * 2}
          width={radius * 2}
          preserveAspectRatio="xMidYMid meet"
        >
          <circle
            className={styles.track}
            fill="transparent"
            {...progressCircleProps}
          />
          <circle
            className={styles.thumb}
            fill="transparent"
            strokeDasharray={circumference + " " + circumference}
            {...progressCircleProps}
          />
        </svg>
      </a>
    </>
  );
};

export default ScrollProgress;
