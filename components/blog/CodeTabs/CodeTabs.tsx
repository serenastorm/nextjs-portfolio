import useTabNavigation from "infrastructure/hooks/useTabNavigation";

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
      {children}
    </div>
  );
};

export const CodeTabs = ({ children, label, tabs }: CodeTabsProps) => {
  const { activeTabIndex, getTabProps } = useTabNavigation<HTMLButtonElement>(
    tabs.length
  );

  return (
    <div
      className={styles.tabs}
      // TODO: replace with css :has selector once support is better
      data-active-tab-index={activeTabIndex + 1}
    >
      <ul role="tablist" aria-label={label} className={styles.codeTabs}>
        {tabs.map((tab, tabIndex) => {
          return (
            <li key={`label-${label}-${tab}`}>
              <button
                {...getTabProps(tabIndex)}
                type="button"
                role="tab"
                aria-selected={tabIndex === activeTabIndex ? "true" : "false"}
                aria-controls={`${tab}-tab`}
                id={tab}
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
