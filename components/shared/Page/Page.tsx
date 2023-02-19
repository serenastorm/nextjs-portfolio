import {
  createElement,
  type DetailedHTMLProps,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import styles from "./Page.module.scss";

type PageContainerType = "div" | "article" | "main";

type PageProps = {
  as?: PageContainerType;
  children: ReactNode;
  className?: string;
  type?: "blog" | "error";
};

export const Page = ({
  as = "div",
  children,
  className = "",
  type,
  ...props
}: PageProps & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
  return createElement(
    as,
    {
      className: `${className} ${type ? styles[`page-${type}`] : ""}`,
      ...props,
    },
    children
  );
};
