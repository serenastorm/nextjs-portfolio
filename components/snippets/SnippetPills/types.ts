import { LegacyRef, KeyboardEvent } from "react";

export type SnippetColor =
  | "tomato"
  | "red"
  | "crimson"
  | "pink"
  | "plum"
  | "purple"
  | "violet"
  | "indigo"
  | "blue"
  | "sky"
  | "cyan"
  | "teal"
  | "mint"
  | "green"
  | "grass"
  | "lime"
  | "yellow"
  | "amber"
  | "orange";

export type SnippetPillProps = {
  animationDelay?: number;
  as?: "div" | "li";
  className?: string;
  type: string;
  linkRef: LegacyRef<HTMLAnchorElement>;
  onKeyDown: (event: KeyboardEvent<HTMLAnchorElement>) => void;
  tabIndex: 0 | -1;
};

export type SnippetPillsProps = {
  asLinks?: boolean;
  types: string[];
};
