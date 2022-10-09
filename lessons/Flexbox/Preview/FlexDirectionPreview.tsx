import { Div } from "components/lessons/Preview/Div";
import { PreviewCaption } from "components/lessons/Preview";
import type { CSSProperties } from "react";
import type { FlexDirectionPossibleValuesProps } from "../types";

const FlexDirectionPreview = ({
  value,
}: {
  value: FlexDirectionPossibleValuesProps;
}) => {
  const flexDirection = value;

  return (
    <>
      <Div.Parent
        layout={false}
        style={{ flexDirection } as CSSProperties}
      >
        <Div.Child color="blue" index={1} />
        <Div.Child color="blue" index={2} />
        <Div.Child color="blue" index={3} />
      </Div.Parent>
      <PreviewCaption copy={`flex-direction: ${flexDirection};`} />
    </>
  );
};

export default FlexDirectionPreview;
