import { KeyboardEvent, Ref } from "react";

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
  className?: string;
  isLink: boolean;
  inList: boolean;
  type: string;
  linkRef: Ref<HTMLAnchorElement>;
  onKeyDown: (event: KeyboardEvent<HTMLAnchorElement>) => void;
  tabIndex: 0 | -1;
};

export type SnippetTagsProps = {
  asLinks?: boolean;
  types: string[];
};
