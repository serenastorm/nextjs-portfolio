import { Div } from "components/lessons/Preview/Div";
import { PreviewCaption } from "components/lessons/Preview";
import type { CSSProperties } from "react";
import type {
  FlexWrapPossibleValuesProps,
  FlexPreviewId,
  FlexPreviewFieldId,
} from "../types";

const FlexWrapPreview = ({
  id,
  value,
  options,
}: {
  id: FlexPreviewId;
  value: FlexWrapPossibleValuesProps;
  options: FlexWrapPossibleValuesProps[];
}) => {
  const flexWrap = value;

  const fieldIds = options.map(
    (option) => `${id}-${option}` as FlexPreviewFieldId
  );

  return (
    <output form={id} htmlFor={fieldIds.join(" ")}>
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
    </output>
  );
};

export default FlexWrapPreview;
