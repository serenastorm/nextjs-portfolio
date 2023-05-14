import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useWindowDimensions } from "infrastructure/hooks";
import { routes } from "infrastructure/routes/constants";
import { useScrollDirection } from "infrastructure/hooks";
import { NAV_ITEMS } from "./constants";

import styles from "./NavButtons.module.scss";
import useTabNavigation from "infrastructure/hooks/useTabNavigation";

export const NavButtons = () => {
  const [activeTooltipIndex, setActiveTooltipIndex] = useState<number>(-1);
  const { width: windowWidth } = useWindowDimensions();
  const { pathname } = useRouter();
  const scrollDirection = useScrollDirection();

  const isLessonPage = pathname.startsWith("/flexbox");

  // Breakpoint also in app.scss
  const isStacked = windowWidth && windowWidth > 999.99;
  const shouldForceLightMode =
    pathname.startsWith("/work/") || pathname.startsWith(routes.diary);

  const items = NAV_ITEMS.map((navItem) => {
    return {
      ...navItem,
      isCurrent:
        navItem.url === routes.home
          ? pathname === routes.home
          : pathname.startsWith(navItem.url),
    };
  }).filter((navItem) => {
    const isHiddenPage = pathname.startsWith(routes.diary);

    return isHiddenPage ? true : navItem.url !== routes.diary;
  });

  const { previousTabIndex, activeTabIndex, getTabProps } =
    useTabNavigation<HTMLAnchorElement>(items.length);

  const getAnimationDuration = () => {
    // Change the animation duration based on the distance between the two items
    const initialDiff = activeTabIndex - previousTabIndex;
    const diffIsNegative = initialDiff < 0;
    const diff = diffIsNegative ? initialDiff * -1 : initialDiff;

    return `${50 + (diff - 1) * 150}ms`;
  };

  const activeBtnIndex = items.findIndex((navItem) => navItem.isCurrent);

  useEffect(() => {
    const handleKeyPress = (event: globalThis.KeyboardEvent) => {
      const shouldCloseTooltip = event.key === "Escape";

      if (shouldCloseTooltip && activeTooltipIndex > -1) {
        setActiveTooltipIndex(-1);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [activeTooltipIndex]);

  if (isLessonPage) {
    return null;
  }

  return (
    <div
      className={`${styles.buttonsContainer} ${
        scrollDirection === "down" && !isStacked ? styles.hidden : ""
      } ${isStacked ? styles.stacked : styles.inline} ${
        shouldForceLightMode ? styles.light : ""
      }`}
      // TODO: replace with css :has selector once support is better
      data-active-btn-index={`${activeBtnIndex}`}
    >
      <ul
        className={styles.navButtons}
        // list-style-type: "none" removes list semantics so this is needed
        role="list"
      >
        <div
          className={styles.activeButtonIndicator}
          style={{ animationDuration: getAnimationDuration() }}
        />
        {items.map((navItem, navItemIndex) => (
          <li
            key={navItem.label}
            className={`${styles.listItem} ${
              navItem.label === "Blog" ? `${styles.blogListItem}` : ""
            }`}
          >
            <Link
              {...getTabProps(navItemIndex)}
              href={navItem.url}
              className={styles.link}
              aria-current={navItem.isCurrent ? "page" : "false"}
              aria-describedby={
                isStacked && activeTooltipIndex === navItemIndex
                  ? `nav-tooltip-${navItemIndex}`
                  : undefined
              }
              onMouseEnter={() => setActiveTooltipIndex(navItemIndex)}
              onMouseLeave={() => setActiveTooltipIndex(-1)}
              onFocus={() => setActiveTooltipIndex(navItemIndex)}
              onBlur={() => setActiveTooltipIndex(-1)}
            >
              {navItem.icon()}
              {!isStacked && <p className={styles.label}>{navItem.label}</p>}
            </Link>

            {isStacked && activeTooltipIndex === navItemIndex && (
              <div
                id={`nav-tooltip-${navItemIndex}`}
                className={styles.tooltip}
                role="tooltip"
              >
                <p>{navItem.label}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
