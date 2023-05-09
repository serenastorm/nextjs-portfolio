import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useWindowDimensions } from "infrastructure/hooks";
import { routes } from "infrastructure/routes/constants";
import { useScrollDirection } from "infrastructure/hooks";
import { NAV_ITEMS } from "./constants";

import styles from "./NavButtons.module.scss";

export const NavButtons = () => {
  const { width: windowWidth } = useWindowDimensions();

  const [previousTabIndex, setPreviousTabIndex] = useState<number>(0);
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [activeTooltipIndex, setActiveTooltipIndex] = useState<number>(-1);
  const tabsRefs = useRef<Array<HTMLAnchorElement | null>>([]);

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

  const totalTabs = items.length;

  const updateActiveTabIndex = (newIndex: number) => {
    setActiveTabIndex((currentIndex: number) => {
      setPreviousTabIndex(currentIndex);
      return newIndex;
    });
  };

  const getAnimationDuration = () => {
    // Change the animation duration based on the distance between the two items
    const initialDiff = activeTabIndex - previousTabIndex;
    const diffIsNegative = initialDiff < 0;
    const diff = diffIsNegative ? initialDiff * -1 : initialDiff;

    return `${50 + (diff - 1) * 150}ms`;
  };

  const activeBtnIndex = items.findIndex((navItem) => navItem.isCurrent);

  const activateTab = (newTabIndex: number) => {
    tabsRefs?.current[newTabIndex]?.focus();
    updateActiveTabIndex(newTabIndex);
  };

  const onKeyPressed = (
    event: KeyboardEvent<HTMLAnchorElement>,
    tabIndex: number
  ) => {
    const nextTabKey = isStacked ? "ArrowDown" : "ArrowRight";
    const previousTabKey = isStacked ? "ArrowUp" : "ArrowLeft";

    const shouldGoToNextTab = event.key === nextTabKey;
    const shouldGoToPreviousTab = event.key === previousTabKey;
    const shouldGoToFirstTab = event.key === "Home";
    const shouldGoToLastTab = event.key === "End";

    const prevTab = tabIndex - 1;
    const nextTab = tabIndex + 1;
    const lastTab = totalTabs - 1;

    if (shouldGoToNextTab) {
      /* If the current active tab is the last, go the the first tab */
      if (tabIndex >= totalTabs - 1) {
        activateTab(0);
      } else {
        activateTab(nextTab);
      }
    } else if (shouldGoToPreviousTab) {
      /* If the current active tab is the first, go the the last tab */
      if (tabIndex <= 0) {
        activateTab(lastTab);
      } else {
        activateTab(prevTab);
      }
    } else if (shouldGoToFirstTab) {
      activateTab(0);
    } else if (shouldGoToLastTab) {
      activateTab(lastTab);
    } else {
      return null;
    }
  };

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
              href={navItem.url}
              className={styles.link}
              aria-current={navItem.isCurrent ? "page" : "false"}
              tabIndex={navItemIndex === activeTabIndex ? 0 : -1}
              ref={(el: HTMLAnchorElement) =>
                (tabsRefs.current[navItemIndex] = el)
              }
              onKeyDown={(event: KeyboardEvent<HTMLAnchorElement>) =>
                onKeyPressed(event, navItemIndex)
              }
              onClick={() => activateTab(navItemIndex)}
              title={isStacked ? navItem.label : undefined}
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
