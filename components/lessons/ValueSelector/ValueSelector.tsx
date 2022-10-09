import { Dispatch, SetStateAction, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import styles from "./ValueSelector.module.scss";

type ValueSelectorProps = {
  options: string[];
  value: string;
  setValue: Dispatch<SetStateAction<any>>;
};

const ValueSelector = ({ options, value, setValue }: ValueSelectorProps) => {
  const buttonsRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const activateTab = (newTabIndex: number) => {
    /* Focus new tab button */
    buttonsRefs?.current[newTabIndex]?.focus();
    /* Set new tab as active */
    setActiveTabIndex(newTabIndex);
    setValue(options[newTabIndex]);
  };

  const onKeyPressed = (
    event: KeyboardEvent<HTMLButtonElement>,
    tabIndex: number
  ) => {
    const shouldGoToNextTab = event.key === "ArrowRight";
    const shouldGoToPreviousTab = event.key === "ArrowLeft";
    const shouldGoToFirstTab = event.key === "Home";
    const shouldGoToLastTab = event.key === "End";

    const totalTabs = options.length;

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
    <div className={styles.selector}>
      {options.map((option, optionIndex) => (
        <button
          key={option}
          onClick={() => activateTab(optionIndex)}
          data-selected={value === option ? "true" : "false"}
          className={styles.value}
          ref={(el: HTMLButtonElement) =>
            (buttonsRefs.current[optionIndex] = el)
          }
          onKeyDown={(event: KeyboardEvent<HTMLButtonElement>) =>
            onKeyPressed(event, optionIndex)
          }
          tabIndex={optionIndex === activeTabIndex ? 0 : -1}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ValueSelector;
