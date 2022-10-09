import { Div } from "components/lessons/Preview/Div";
import { PreviewCaption } from "components/lessons/Preview";
import { breakpoint } from "components/lessons/Preview/constants";
import { useWindowDimensions } from "infrastructure/hooks";
import type { CSSProperties } from "react";
import type { AlignSelfPossibleValuesProps } from "../types";

const AlignSelfPreview = ({
  value,
}: {
  value: AlignSelfPossibleValuesProps;
}) => {
  const { width: windowWidth } = useWindowDimensions();

  const parentMinHeight =
    windowWidth && windowWidth >= breakpoint ? "40rem" : "25vh";
  const alignSelf = value;

  return (
    <>
      <Div.Parent
        style={{ minHeight: parentMinHeight, alignItems: "flex-start" }}
      >
        <Div.Axis axis="y" />
        <Div.Child color="blue" index={1} />
        <Div.Child
          color="blue"
          index={2}
          style={
            { alignSelf, backgroundColor: "var(--blue-bg)" } as CSSProperties
          }
        />
        <Div.Child color="blue" index={3} />
      </Div.Parent>

      <PreviewCaption copy={`align-self: ${alignSelf};`} />
    </>
  );
};

export default AlignSelfPreview;
