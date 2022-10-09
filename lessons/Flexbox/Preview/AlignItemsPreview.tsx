import { Div } from "components/lessons/Preview/Div";
import { PreviewCaption } from "components/lessons/Preview";
import type { CSSProperties } from "react";
import type { AlignItemsPossibleValuesProps } from "../types";

const AlignItemsPreview = ({
  value,
}: {
  value: AlignItemsPossibleValuesProps;
}) => {
  const alignItems = value;

  return (
    <>
      <Div.Parent style={{ alignItems } as CSSProperties}>
        <Div.Axis axis="y" />
        <Div.Child
          color="blue"
          content="Placeholer text from catipsum"
          style={{ flex: 1 }}
        />
        <Div.Child
          color="blue"
          content="Cats go for world domination stare out the window if human is on laptop sit on the keyboard."
          style={{ flex: 1 }}
        />
        <Div.Child
          color="blue"
          content="Pretend you want to go out but then don't stare out cat door then go back inside carefully drink from water glass and then spill it everywhere"
          style={{ flex: 1 }}
        />
      </Div.Parent>

      <PreviewCaption copy={`align-items: ${alignItems};`} />
    </>
  );
};

export default AlignItemsPreview;
