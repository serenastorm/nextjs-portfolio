import { Div } from "components/lessons/Preview/Div";
import { PreviewCaption } from "components/lessons/Preview";
import { breakpoint } from "components/lessons/Preview/constants";
import { useWindowDimensions } from "infrastructure/hooks";
import type { AlignContentPossibleValuesProps } from "../types";
import type { CSSProperties } from "react";

const AlignContentPreview = ({
  value,
}: {
  value: AlignContentPossibleValuesProps;
}) => {
  const { width: windowWidth } = useWindowDimensions();

  const parentMinHeight =
    windowWidth && windowWidth >= breakpoint ? "40rem" : "30vh";

  const alignContent = value;

  return (
    <>
      <Div.Parent
        style={
          {
            alignContent,
            flexWrap: "wrap",
            minHeight: parentMinHeight,
          } as CSSProperties
        }
      >
        <Div.Axis axis="y" />
        <Div.Child
          color="blue"
          content="Placeholer text from catipsum"
          style={{ maxWidth: "24rem" }}
        />
        <Div.Child
          color="blue"
          content="Cats go for world domination stare out the window if human is on laptop sit on the keyboard."
          style={{ maxWidth: "24rem" }}
        />
        <Div.Child
          color="blue"
          content="Pretend you want to go out but then don't stare out cat door then go back inside carefully drink from water glass and then spill it everywhere"
          style={{ maxWidth: "24rem" }}
        />
      </Div.Parent>

      <PreviewCaption copy={`align-content: ${alignContent};`} />
    </>
  );
};

export default AlignContentPreview;
