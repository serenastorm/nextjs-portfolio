import { useRef, useState } from "react";
import type {
  MouseEventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  Ref,
} from "react";

export default function useTabNavigation<
  TabElement extends HTMLAnchorElement | HTMLButtonElement | HTMLInputElement
>(
  totalTabs: number,
  direction: "horizontal" | "vertical" = "horizontal"
): {
  previousTabIndex: number;
  activeTabIndex: number;
  getTabProps: (tabIndex: number) => {
    tabIndex: number;
    ref: Ref<TabElement>;
    onKeyDown: KeyboardEventHandler<TabElement>;
    onClick: MouseEventHandler<TabElement>;
  };
} {
  const [previousTabIndex, setPreviousTabIndex] = useState<number>(0);
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const tabsRefs = useRef<Array<TabElement | null>>([]);

  const activateTab = (newTabIndex: number) => {
    tabsRefs?.current[newTabIndex]?.focus();

    setActiveTabIndex((currentIndex: number) => {
      setPreviousTabIndex(currentIndex);
      return newTabIndex;
    });
  };

  const onKeyPressed = (event: KeyboardEvent<TabElement>, tabIndex: number) => {
    const nextTabKey = direction === "vertical" ? "ArrowDown" : "ArrowRight";
    const previousTabKey = direction === "vertical" ? "ArrowUp" : "ArrowLeft";

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

  const getTabProps = (tabIndex: number) => {
    return {
      tabIndex: tabIndex === activeTabIndex ? 0 : -1,
      ref: (el: TabElement) => (tabsRefs.current[tabIndex] = el),
      onKeyDown: (event: KeyboardEvent<TabElement>) =>
        onKeyPressed(event, tabIndex),
      onClick: () => activateTab(tabIndex),
    };
  };

  return { previousTabIndex, activeTabIndex, getTabProps };
}
