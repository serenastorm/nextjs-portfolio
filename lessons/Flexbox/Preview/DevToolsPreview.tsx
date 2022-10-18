import { Div } from "components/lessons/Preview/Div";
import { useWindowDimensions } from "infrastructure/hooks";
import { breakpoint } from "components/lessons/Preview/constants";
import type { CSSProperties, Dispatch, SetStateAction } from "react";
import type { FlexPreviewId } from "../types";

import styles from "./Preview.module.scss";

type DevToolsProps = {
  id: FlexPreviewId;
  value: CSSProperties;
  items: number;
  setItems: Dispatch<SetStateAction<number>>;
};

const DevToolsPreview = ({ id, value, items, setItems }: DevToolsProps) => {
  const { width: windowWidth } = useWindowDimensions();

  const parentMinHeight = windowWidth && windowWidth >= breakpoint ? 50 : 30;
  const devToolsValues = value;

  return (
    <>
      <Div.Parent
        style={{
          ...devToolsValues,
          width: "100%",
          minHeight: `${parentMinHeight}vh`,
          overflowX: "auto",
        }}
      >
        <Div.Axis opacity={0.3} />
        <Div.Axis axis="y" opacity={0.3} />
        {Array.from(Array(items).keys()).map((flexItem) => (
          <Div.Child
            color="blue"
            index={flexItem + 1}
            key={`devTools-${flexItem}`}
          />
        ))}
      </Div.Parent>
      <div className={styles.previewActions}>
        <button
          onClick={() => setItems((currentItems) => currentItems - 1)}
          disabled={items <= 1}
        >
          Remove item
        </button>
        <button
          onClick={() => setItems((currentItems) => currentItems + 1)}
          disabled={items >= 9}
        >
          Add item
        </button>
      </div>
    </>
  );
};

export default DevToolsPreview;
