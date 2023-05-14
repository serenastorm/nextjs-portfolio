import useTabNavigation from "infrastructure/hooks/useTabNavigation";
import SyntaxHighlighter from "react-syntax-highlighter";
import { CopyToClipboardButton } from "components/blog";
import type { CodeLanguageProps } from "../types";

import styles from "./CodeTabs.module.scss";

type Tab = { label: string; value: string };

type CodeTabsProps = {
  code: string[];
  language: CodeLanguageProps;
  tabs: Tab[];
};

const CodeTabs = ({ code, language, tabs }: CodeTabsProps) => {
  const { activeTabIndex, getTabProps } = useTabNavigation<HTMLButtonElement>(
    tabs.length
  );
  const currentTab: Tab = tabs[activeTabIndex];
  const currentTabContent = code[activeTabIndex];

  return (
    <div>
      <div className={styles.tabs} role="tablist">
        {tabs.map((tab, tabIndex) => (
          <button
            {...getTabProps(tabIndex)}
            role="tab"
            key={tab.value}
            aria-controls={`${tab.value}-tab`}
            id={tab.value}
            aria-selected={tabIndex === activeTabIndex ? "true" : "false"}
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
          <CopyToClipboardButton
            textToCopy={currentTabContent}
            className={styles.copyToClipboardButton}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeTabs;
