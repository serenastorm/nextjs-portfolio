import { Div } from "components/lessons/Preview/Div";
import { PreviewCaption } from "components/lessons/Preview";
import type { CSSProperties } from "react";
import type {
  FlexDirectionPossibleValuesProps,
  FlexPreviewId,
  FlexPreviewFieldId,
} from "../types";

const FlexDirectionPreview = ({
  id,
  value,
  options,
}: {
  id: FlexPreviewId;
  value: FlexDirectionPossibleValuesProps;
  options: FlexDirectionPossibleValuesProps[];
}) => {
  const flexDirection = value;

  const fieldIds = options.map(
    (option) => `${id}-${option}` as FlexPreviewFieldId
  );

  return (
    <output form={id} htmlFor={fieldIds.join(" ")}>
      <Div.Parent layout={false} style={{ flexDirection } as CSSProperties}>
        <Div.Child color="blue" index={1} />
        <Div.Child color="blue" index={2} />
        <Div.Child color="blue" index={3} />
      </Div.Parent>
      <PreviewCaption copy={`flex-direction: ${flexDirection};`} />
    </output>
  );
};

export default FlexDirectionPreview;
