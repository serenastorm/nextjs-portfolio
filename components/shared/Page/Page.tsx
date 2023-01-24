import {
  createElement,
  type DetailedHTMLProps,
  type HTMLAttributes,
  type ReactNode,
} from "react";

type PageContainerType = "div" | "article" | "main";

type PageProps = {
  as?: PageContainerType;
  children: ReactNode;
  className?: string;
};

export const Page = ({
  as = "div",
  children,
  className = "",
  ...props
}: PageProps & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
  return createElement(
    as,
    {
      className,
      ...props,
    },
    children
  );
};
