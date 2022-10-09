import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  ReactNode,
  useRef,
  useState,
} from "react";

import { FlexboxIcon } from "assets/lessons/icons/Flexbox";
import {
  alignContentPossibleValues,
  alignItemsPossibleValues,
  flexDirectionPossibleValues,
  flexWrapPossibleValues,
  justifyContentPossibleValues,
  defaultDevToolsValues,
} from "lessons/Flexbox/constants";
import type { KeyboardEvent } from "react";
import type {
  AlignItemsPossibleValuesProps,
  AlignContentPossibleValuesProps,
  FlexDirectionPossibleValuesProps,
  FlexWrapPossibleValuesProps,
  JustifyContentPossibleValuesProps,
} from "lessons/Flexbox/types";
import styles from "./FlexboxDevTools.module.scss";

type FlexboxDevToolsProps = {
  value: CSSProperties;
  setValue: Dispatch<SetStateAction<CSSProperties>>;
};

type FlexboxDevTools =
  | AlignItemsPossibleValuesProps
  | AlignContentPossibleValuesProps
  | FlexDirectionPossibleValuesProps
  | FlexWrapPossibleValuesProps
  | JustifyContentPossibleValuesProps;

type Attribute =
  | "flexDirection"
  | "flexWrap"
  | "alignContent"
  | "justifyContent"
  | "alignItems";

type FlexboxDevToolsButtonProps = {
  attribute: Attribute;
  name: string;
  currentValue: string;
  initialValue?: string;
  possibleValues: Array<FlexboxDevTools>;
  renderIcon: (iconValue: FlexboxDevTools) => ReactNode;
};

type TabsRef = {
  [key in Attribute]: Array<HTMLButtonElement | null>;
};

type ActiveIndex = {
  [key in Attribute]: number;
};

const initialRefs = {
  flexDirection: [],
  flexWrap: [],
  alignContent: [],
  justifyContent: [],
  alignItems: [],
};

const initialActiveIndices = {
  flexDirection: 0,
  flexWrap: 0,
  alignContent: 0,
  justifyContent: 0,
  alignItems: 0,
};

const FlexboxDevTools = ({ value, setValue }: FlexboxDevToolsProps) => {
  const attributes: FlexboxDevToolsButtonProps[] = [
    {
      name: "flex-direction",
      attribute: "flexDirection",
      initialValue:
        defaultDevToolsValues.flexDirection as FlexDirectionPossibleValuesProps,
      currentValue: value.flexDirection as FlexDirectionPossibleValuesProps,
      possibleValues: flexDirectionPossibleValues,
      renderIcon: (iconValue) => (
        <FlexboxIcon.FlexDirection
          value={iconValue as FlexDirectionPossibleValuesProps}
          key={iconValue}
        />
      ),
    },
    {
      name: "flex-wrap",
      attribute: "flexWrap",
      initialValue:
        defaultDevToolsValues.flexWrap as FlexWrapPossibleValuesProps,
      currentValue: value.flexWrap as FlexWrapPossibleValuesProps,
      possibleValues: flexWrapPossibleValues,
      renderIcon: (iconValue) => (
        <FlexboxIcon.FlexWrap
          value={iconValue as FlexWrapPossibleValuesProps}
          key={iconValue}
        />
      ),
    },
    {
      name: "align-content",
      attribute: "alignContent",
      initialValue:
        defaultDevToolsValues.alignContent as AlignContentPossibleValuesProps,
      currentValue: value.alignContent as AlignContentPossibleValuesProps,
      possibleValues: alignContentPossibleValues,
      renderIcon: (iconValue) => (
        <FlexboxIcon.AlignContent
          value={iconValue as AlignContentPossibleValuesProps}
          key={iconValue}
        />
      ),
    },
    {
      name: "justify-content",
      attribute: "justifyContent",
      initialValue:
        defaultDevToolsValues.justifyContent as JustifyContentPossibleValuesProps,
      currentValue: value.justifyContent as JustifyContentPossibleValuesProps,
      possibleValues: justifyContentPossibleValues,
      renderIcon: (iconValue) => (
        <FlexboxIcon.JustifyContent
          value={iconValue as JustifyContentPossibleValuesProps}
          key={iconValue}
        />
      ),
    },
    {
      name: "align-items",
      attribute: "alignItems",
      initialValue:
        defaultDevToolsValues.alignItems as AlignItemsPossibleValuesProps,
      currentValue: value.alignItems as AlignItemsPossibleValuesProps,
      possibleValues: alignItemsPossibleValues,
      renderIcon: (iconValue) => (
        <FlexboxIcon.AlignItems
          value={iconValue as AlignItemsPossibleValuesProps}
          key={iconValue}
        />
      ),
    },
  ];

  const [activeTabIndices, setActiveTabIndices] =
    useState<ActiveIndex>(initialActiveIndices);
  const tabsRefs = useRef<TabsRef>(initialRefs);

  const activateTab = (
    attribute: Attribute,
    newTabIndex: number,
    isSelected?: boolean
  ) => {
    const attributeInList = attributes.find(
      (devToolsAttribute) => devToolsAttribute.attribute === attribute
    );

    const initialValueForAttribute = attributeInList?.initialValue;
    const initialValueIndex =
      attributeInList?.possibleValues.findIndex(
        (attribute) => attribute === initialValueForAttribute
      ) || 0;
    const itemValue = attributeInList?.possibleValues[newTabIndex];

    if (isSelected) {
      setValue({
        ...value,
        [`${attribute}`]: initialValueForAttribute,
      });

      /* Focus new tab button */
      tabsRefs?.current[attribute][initialValueIndex]?.focus();
      /* Set new tab as active */
      setActiveTabIndices((currentActiveTabs) => {
        return { ...currentActiveTabs, [`${attribute}`]: initialValueIndex };
      });
    } else {
      setValue({
        ...value,
        [`${attribute}`]: itemValue,
      });

      tabsRefs?.current[attribute][newTabIndex]?.focus();
      setActiveTabIndices((currentActiveTabs) => {
        return { ...currentActiveTabs, [`${attribute}`]: newTabIndex };
      });
    }
  };

  const onKeyPressed = (
    event: KeyboardEvent<HTMLButtonElement>,
    attribute: Attribute,
    itemIndex: number
  ) => {
    const shouldGoToNextTab = event.key === "ArrowRight";
    const shouldGoToPreviousTab = event.key === "ArrowLeft";
    const shouldGoToFirstTab = event.key === "Home";
    const shouldGoToLastTab = event.key === "End";

    const totalTabs = tabsRefs.current[attribute].length;

    const prevTab = itemIndex - 1;
    const nextTab = itemIndex + 1;
    const lastTab = totalTabs - 1;

    if (shouldGoToNextTab) {
      /* If the current active tab is the last, go the the first tab */
      if (itemIndex >= totalTabs - 1) {
        activateTab(attribute, 0);
      } else {
        activateTab(attribute, nextTab);
      }
    } else if (shouldGoToPreviousTab) {
      /* If the current active tab is the first, go the the last tab */
      if (itemIndex <= 0) {
        activateTab(attribute, lastTab);
      } else {
        activateTab(attribute, prevTab);
      }
    } else if (shouldGoToFirstTab) {
      activateTab(attribute, 0);
    } else if (shouldGoToLastTab) {
      activateTab(attribute, lastTab);
    } else {
      return null;
    }
  };

  return (
    <div className={styles.devTools}>
      {attributes.map((devToolsAttribute) => {
        const { attribute, currentValue, name, possibleValues, renderIcon } =
          devToolsAttribute;

        return (
          <div className={styles.attribute} key={`devTool-attribute-${name}`}>
            <p>
              {name}: {currentValue}
            </p>
            {possibleValues.map((itemValue, itemIndex) => {
              const isSelected = currentValue === itemValue;

              return (
                <button
                  className={styles.value}
                  data-selected={isSelected ? "true" : "false"}
                  key={`devTool-attribute-${name}-${itemValue}`}
                  ref={(el: HTMLButtonElement) =>
                    (tabsRefs.current[attribute][itemIndex] = el)
                  }
                  onKeyDown={(event: KeyboardEvent<HTMLButtonElement>) =>
                    onKeyPressed(event, attribute, itemIndex)
                  }
                  onClick={() => {
                    activateTab(attribute, itemIndex, isSelected);
                  }}
                  tabIndex={itemIndex === activeTabIndices[attribute] ? 0 : -1}
                  title={`${
                    isSelected ? "Remove" : "Add"
                  } ${name}: ${itemValue}`}
                >
                  {renderIcon(itemValue)}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default FlexboxDevTools;
