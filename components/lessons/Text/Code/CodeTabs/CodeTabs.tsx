import { useState, useRef } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { SnippetCopyToClipboardButton } from "components/snippets";
import type { CodeLanguageProps } from "../types";
import type { KeyboardEvent } from "react";
import styles from "./CodeTabs.module.scss";

type Tab = { label: string; value: string };

type CodeTabsProps = {
  code: string[];
  language: CodeLanguageProps;
  tabs: Tab[];
};

const CodeTabs = ({ code, language, tabs }: CodeTabsProps) => {
  const tabsRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const activateTab = (newTabIndex: number) => {
    /* Focus new tab button */
    tabsRefs?.current[newTabIndex]?.focus();
    /* Set new tab as active */
    setActiveTabIndex(newTabIndex);
  };

  const currentTab: Tab = tabs[activeTabIndex];
  const currentTabContent = code[activeTabIndex];

  const onKeyPressed = (
    event: KeyboardEvent<HTMLButtonElement>,
    tabIndex: number
  ) => {
    const shouldGoToNextTab = event.key === "ArrowRight";
    const shouldGoToPreviousTab = event.key === "ArrowLeft";
    const shouldGoToFirstTab = event.key === "Home";
    const shouldGoToLastTab = event.key === "End";

    const totalTabs = tabs.length;

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
    <div>
      <div className={styles.tabs} role="tablist">
        {tabs.map((tab, tabIndex) => (
          <button
            role="tab"
            key={tab.value}
            aria-controls={`${tab.value}-tab`}
            id={tab.value}
            aria-selected={tabIndex === activeTabIndex ? "true" : "false"}
            onClick={() => activateTab(tabIndex)}
            ref={(el: HTMLButtonElement) => (tabsRefs.current[tabIndex] = el)}
            onKeyDown={(event: KeyboardEvent<HTMLButtonElement>) =>
              onKeyPressed(event, tabIndex)
            }
            tabIndex={tabIndex === activeTabIndex ? 0 : -1}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`${currentTab.value}-tab`}
        aria-labelledby={currentTab.value}
      >
        <div className={styles.wrapper}>
          <SyntaxHighlighter
            language={language}
            codeTagProps={{
              className: `${styles.codeBlock} language-${language} hljs`,
            }}
            useInlineStyles={false}
          >
            {currentTabContent}
          </SyntaxHighlighter>
          <SnippetCopyToClipboardButton
            textToCopy={currentTabContent}
            className={styles.copyToClipboardButton}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeTabs;
