import type { LinkProps as NextLinkProps } from "next/link";

type HTMLAnchorProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof NextLinkProps
>;

export type LinkProps = {
  className?: string;
  hidden?: boolean;
  type?: "email" | "link";
  shouldOpenInNewTab?: boolean;
  underline?: boolean;
} & HTMLAnchorProps &
  NextLinkProps;
