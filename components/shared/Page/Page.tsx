import { createElement, ReactNode } from "react";

type PageContainerType = "div" | "article";

type PageProps = {
  as?: PageContainerType;
  children: ReactNode;
  className?: string;
};

const Page = ({ as = "div", children, className = "" }: PageProps) => {
  return createElement(
    as,
    {
      className,
    },
    children
  );
};

export default Page;
