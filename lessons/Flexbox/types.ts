import type { CSSProperties } from "react";

export type ScrollSection =
  | "intro"
  | "flexDirection"
  | "flexWrap"
  | "flexGrow"
  | "justifyContent"
  | "alignItems"
  | "alignContent"
  | "alignSelf"
  | "gap"
  | "order"
  | "devTools"
  | "displayFlex";

export type ScrollSectionRef = {
  [key in ScrollSection]: HTMLElement | HTMLDivElement | null;
};

export type AlignItemsPossibleValuesProps = NonNullable<
  CSSProperties["alignItems"]
>;

export type AlignContentPossibleValuesProps = NonNullable<
  CSSProperties["alignContent"]
>;

export type AlignSelfPossibleValuesProps = NonNullable<
  CSSProperties["alignSelf"]
>;

export type FlexDirectionDevToolsPossibleValuesProps = "row" | "column";

export type FlexDirectionPossibleValuesProps = NonNullable<
  CSSProperties["flexDirection"]
>;

export type FlexWrapDevToolsPossibleValuesProps = "nowrap" | "wrap";

export type FlexWrapPossibleValuesProps = NonNullable<
  CSSProperties["flexWrap"]
>;

export type JustifyContentPossibleValuesProps = NonNullable<
  CSSProperties["justifyContent"]
>;

export type FlexPreviewId =
  | "alignSelf"
  | "alignContent"
  | "alignItems"
  | "flexDirection"
  | "flexWrap"
  | "justifyContent"
  | "devTools";

export type FlexPreviewFieldId = `${FlexPreviewId}-${string}`;
