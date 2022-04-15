import {
  useRef,
  useState,
  KeyboardEvent,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { CodeTabsProps } from "./types";

import styles from "../SnippetMarkdown.module.scss";

const CodeTabs = ({
  children,
  tabs,
  label,
  activeTabIndex,
  setActiveTabIndex,
}: CodeTabsProps & {
  activeTabIndex: number;
  setActiveTabIndex: Dispatch<SetStateAction<number>>;
}) => {
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
    <>
      <ul
        role="tablist"
        aria-label={`${label}`}
        className={styles.codeBlockNav}
      >
        {tabs.map((tab, tabIndex) => {
          return (
            <li key={`${label}-${tab}-tab`}>
              <button
                type="button"
                role="tab"
                aria-selected={tabIndex === activeTabIndex ? "true" : "false"}
                aria-controls={`${label}-${tab}-tab`}
                id={`${label}-${tab}-label`}
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
      <div
        role="tabpanel"
        id={`${label}-${tabs[activeTabIndex]}-tab`}
        key={`${label}-${tabs[activeTabIndex]}-panel`}
        aria-labelledby={`${label}-${tabs[activeTabIndex]}-label`}
      >
        {children}
      </div>
    </>
  );
};

const SnippetCodeTabs = ({
  renderWrapper,
  ...props
}: CodeTabsProps & {
  renderWrapper: (
    activeTabIndex: number,
    wrapperChildren: ReactNode
  ) => ReactNode;
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  return (
    <>
      {renderWrapper(
        activeTabIndex,
        <CodeTabs
          activeTabIndex={activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
          {...props}
        />
      )}
    </>
  );
};

export default SnippetCodeTabs;
