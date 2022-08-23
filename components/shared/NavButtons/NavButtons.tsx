import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { routes } from "infrastructure/routes/constants";
import { useAnimatedCursor, useScrollDirection } from "infrastructure/hooks";
import { navItems } from "./constants";
import type { KeyboardEvent } from "react";

import styles from "./NavButtons.module.scss";
import cursorStyles from "styles/diary/DiaryCursor.module.scss";

const NavButtons = () => {
  const [previousTabIndex, setPreviousTabIndex] = useState<number>(0);
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const tabsRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const activeCursorIndex = useAnimatedCursor();
  const { pathname } = useRouter();
  const scrollDirection = useScrollDirection();

  const items = navItems.map((navItem) => {
    return {
      ...navItem,
      isCurrent:
        navItem.url === routes.home
          ? pathname === routes.home
          : pathname.startsWith(navItem.url),
    };
  });

  const totalTabs = items.length;

  const updateActiveTabIndex = (newIndex: number) => {
    setActiveTabIndex((currentIndex: number) => {
      setPreviousTabIndex(currentIndex);
      return newIndex;
    });
  };

  const getAnimationDuration = () => {
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
    const shouldGoToNextTab = event.key === "ArrowRight";
    const shouldGoToPreviousTab = event.key === "ArrowLeft";
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

  return (
    <ul
      className={`${styles.navButtons} ${
        scrollDirection === "down"
          ? styles.navButtonsHidden
          : styles.navButtonsVisible
      }`}
      // list-style-type: "none" removes list semantics so this is needed
      role="list"
    >
      <div
        className={styles.navButtonIndicator}
        data-active-btn-index={`${activeBtnIndex}`}
        style={{ animationDuration: getAnimationDuration() }}
      />
      {items.map((navItem, navItemIndex) => (
        <li
          key={navItem.label}
          className={`${styles.navButton} ${
            navItem.label === "Blog" ? cursorStyles.cursorContainer : ""
          }`}
          data-cursor-index={
            navItem.label === "Blog" ? activeCursorIndex + 1 : null
          }
        >
          <Link href={navItem.url} passHref>
            <a
              className={styles.navButtonLink}
              aria-label={navItem.label}
              aria-current={navItem.isCurrent ? "page" : "false"}
              tabIndex={navItemIndex === activeTabIndex ? 0 : -1}
              ref={(el: HTMLAnchorElement) =>
                (tabsRefs.current[navItemIndex] = el)
              }
              onKeyDown={(event: KeyboardEvent<HTMLAnchorElement>) =>
                onKeyPressed(event, navItemIndex)
              }
              onClick={() => activateTab(navItemIndex)}
            >
              {navItem.icon()}
              <p aria-hidden="true" className={styles.navButtonLabel}>
                {navItem.label}
              </p>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavButtons;
