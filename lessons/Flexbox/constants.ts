import type { CSSProperties } from "react";
import type {
  AlignContentPossibleValuesProps,
  AlignItemsPossibleValuesProps,
  AlignSelfPossibleValuesProps,
  FlexDirectionPossibleValuesProps,
  FlexWrapPossibleValuesProps,
  JustifyContentPossibleValuesProps,
} from "./types";

export const scrollSections = [];

export const alignContentPossibleValues: AlignContentPossibleValuesProps[] = [
  "center",
  "flex-start",
  "flex-end",
  "space-around",
  "space-between",
  "stretch",
];

export const alignItemsPossibleValues: AlignItemsPossibleValuesProps[] = [
  "center",
  "flex-start",
  "flex-end",
  "stretch",
  "baseline",
];

export const alignSelfPossibleValues: AlignSelfPossibleValuesProps[] = [
  "auto",
  "flex-start",
  "flex-end",
  "center",
  "baseline",
  "stretch",
];

export const flexDirectionPossibleValues: FlexDirectionPossibleValuesProps[] = [
  "row",
  "column",
];

export const flexWrapPossibleValues: FlexWrapPossibleValuesProps[] = [
  "nowrap",
  "wrap",
];

export const justifyContentPossibleValues: JustifyContentPossibleValuesProps[] =
  [
    "center",
    "flex-start",
    "flex-end",
    "space-between",
    "space-around",
    "space-evenly",
  ];

export const defaultDevToolsValues: CSSProperties = {
  flexDirection: "row",
  flexWrap: "nowrap",
  alignContent: "normal",
  alignItems: "normal",
  justifyContent: "normal",
};
