import { Div } from "components/lessons/Preview/Div";
import { useWindowDimensions } from "infrastructure/hooks";
import { breakpoint } from "components/lessons/Preview/constants";
import type { CSSProperties } from "react";

const FlexGrowPreview = () => {
  const { width: windowWidth } = useWindowDimensions();
  const isDesktop = windowWidth && windowWidth >= breakpoint;

  const baseChildWidth = "20%";
  const baseChildStyles = {
    padding: "1.2rem 0.8rem",
  };

  return (
    <>
      <Div.Parent
        style={
          {
            width: "100%",
            gap: "1.6rem",
            // width: `calc(50vw - (var(--preview-padding) * 2))`,
            "--min-child-width": baseChildWidth,
          } as CSSProperties
        }
      >
        <Div.Child color="blue" index={1} style={{ ...baseChildStyles }} />
        <Div.Child
          color="blue"
          caption="flex-grow: 1;"
          style={{
            ...baseChildStyles,
            flexGrow: 1,
            backgroundColor: "var(--blue-bg)",
          }}
        />
        <Div.Child color="blue" index={3} style={{ ...baseChildStyles }} />
        {isDesktop && (
          <Div.Child color="blue" index={4} style={{ ...baseChildStyles }} />
        )}
      </Div.Parent>
      <Div.Parent
        style={
          {
            width: "100%",
            gap: "1.6rem",
            "--min-child-width": isDesktop ? "16rem" : "35%",
          } as CSSProperties
        }
      >
        <Div.Child color="blue" index={1} style={{ ...baseChildStyles }} />
        <Div.Child color="blue" index={2} style={{ ...baseChildStyles }} />

        <Div.Child
          color="blue"
          caption="flex-shrink: 2;"
          style={{
            ...baseChildStyles,
            flexShrink: 2,
            minWidth: "initial",
            backgroundColor: "var(--blue-bg)",
          }}
        />
        {isDesktop && (
          <Div.Child color="blue" index={4} style={{ ...baseChildStyles }} />
        )}
      </Div.Parent>
    </>
  );
};

export default FlexGrowPreview;
