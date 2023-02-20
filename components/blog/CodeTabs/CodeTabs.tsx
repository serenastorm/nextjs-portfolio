import { useRef, useState, KeyboardEvent } from "react";
import { CodeBlock } from "components/blog/CodeBlock";

import styles from "./CodeTabs.module.scss";
import codeBlockStyles from "components/blog/CodeBlock/CodeBlock.module.scss";

type CodeTabProps = {
  children: JSX.Element;
  label: string;
};

type CodeTabsProps = {
  children: JSX.Element;
  label: string;
  tabs: string[];
};

export const CodeTab = ({ children, label }: CodeTabProps) => {
  return (
    <div
      tabIndex={0}
      role="tabpanel"
      id={`${label}-tab`}
      key={`${label}-panel`}
      aria-labelledby={label}
      className={codeBlockStyles.codeWrapper}
    >
      <CodeBlock>{children}</CodeBlock>
    </div>
  );
};

export const CodeTabs = ({ children, label, tabs }: CodeTabsProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const tabsRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const totalTabs = tabs.length;

  const activateTab = (newTabIndex: number) => {
    /* Focus new tab button */
    tabsRefs?.current[newTabIndex]?.focus();
    /* Set new tab as active */
    setActiveTabIndex(newTabIndex);
  };

  const onKeyPressed = (
    event: KeyboardEvent<HTMLButtonElement>,
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
      if (tabIndex >= totalTabs - 1) {
        activateTab(0);
      } else {
        activateTab(nextTab);
      }
    } else if (shouldGoToPreviousTab) {
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
    <div
      className={styles.tabs}
      // TODO: replace with css :has selector once support is better
      data-active-tab-index={activeTabIndex + 1}
    >
      <ul
        role="tablist"
        aria-label={label}
        className={styles.codeTabs}
      >
        {tabs.map((tab, tabIndex) => {
          return (
            <li key={`label-${label}-${tab}`}>
              <button
                type="button"
                role="tab"
                aria-selected={tabIndex === activeTabIndex ? "true" : "false"}
                aria-controls={`${tab}-tab`}
                id={tab}
                tabIndex={tabIndex === activeTabIndex ? 0 : -1}
                ref={(el: HTMLButtonElement) =>
                  (tabsRefs.current[tabIndex] = el)
                }
                onKeyDown={(event: KeyboardEvent<HTMLButtonElement>) =>
                  onKeyPressed(event, tabIndex)
                }
                onClick={() => activateTab(tabIndex)}
              >
                {tab}
              </button>
            </li>
          );
        })}
      </ul>
      {children}
    </div>
  );
};
