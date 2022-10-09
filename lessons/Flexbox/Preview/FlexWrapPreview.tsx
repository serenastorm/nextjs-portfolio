import { Div } from "components/lessons/Preview/Div";
import { PreviewCaption } from "components/lessons/Preview";
import type { CSSProperties } from "react";
import type { FlexWrapPossibleValuesProps } from "../types";

const FlexWrapPreview = ({ value }: { value: FlexWrapPossibleValuesProps }) => {
  const flexWrap = value;

  return (
    <>
      <Div.Parent
        style={
          {
            flexWrap,
            maxWidth: "calc(var(--min-child-width) * 2.5)",
          } as CSSProperties
        }
      >
        <Div.Child color="blue" index={1} />
        <Div.Child color="blue" index={2} />
        <Div.Child color="blue" index={3} />
      </Div.Parent>
      <PreviewCaption copy={`flex-wrap: ${flexWrap};`} />
    </>
  );
};

export default FlexWrapPreview;
