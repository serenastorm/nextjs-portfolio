import { createElement } from "react";
import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

type PageContainerType = "div" | "article";

type PageProps = {
  as?: PageContainerType;
  children: ReactNode;
  className?: string;
};

const Page = ({
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

export default Page;
