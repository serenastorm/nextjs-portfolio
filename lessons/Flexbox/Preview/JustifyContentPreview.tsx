import { Div } from "components/lessons/Preview/Div";
import { PreviewCaption } from "components/lessons/Preview";
import type { CSSProperties } from "react";
import type { JustifyContentPossibleValuesProps } from "../types";

import styles from "./Preview.module.scss";

const JustifyContentPreview = ({
  value,
}: {
  value: JustifyContentPossibleValuesProps;
}) => {
  const justifyContent = value;

  return (
    <>
      <Div.Parent
        style={{ justifyContent, width: "100%" } as CSSProperties}
        className={styles.justifyContent}
      >
        <Div.Axis opacity={0.3} />
        {["space-around", "space-evenly", "center", "flex-end"].includes(
          justifyContent
        ) && (
          <Div.Spacing animated color="pink" key="justifyContentSpacing1">
            x
          </Div.Spacing>
        )}
        <Div.Child color="blue" />
        {["space-between", "space-around", "space-evenly"].includes(
          justifyContent
        ) && (
          <Div.Spacing animated color="pink" key="justifyContentSpacing2">
            x
          </Div.Spacing>
        )}
        {justifyContent === "space-around" && (
          <Div.Spacing animated color="pink" key="justifyContentSpacing3">
            x
          </Div.Spacing>
        )}
        <Div.Child color="blue" />
        {["space-between", "space-around", "space-evenly"].includes(
          justifyContent
        ) && (
          <Div.Spacing animated color="pink" key="justifyContentSpacing4">
            x
          </Div.Spacing>
        )}
        {justifyContent === "space-around" && (
          <Div.Spacing animated color="pink" key="justifyContentSpacing5">
            x
          </Div.Spacing>
        )}
        <Div.Child color="blue" />

        {["space-around", "space-evenly", "center", "flex-start"].includes(
          justifyContent
        ) && (
          <Div.Spacing animated color="pink" key="justifyContentSpacing6">
            x
          </Div.Spacing>
        )}
      </Div.Parent>
      <PreviewCaption copy={`justify-content: ${justifyContent};`} />
    </>
  );
};

export default JustifyContentPreview;
