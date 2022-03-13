import { createElement } from "react";
import Link from "next/link";
import { CategoryLabels, CategoryUrls } from "helpers/blog/types";
import { routes } from "infrastructure/routes/constants";

import styles from "./Pills.module.scss";

type Color =
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

type PillProps = {
  animationDelay?: number;
  as?: "div" | "li";
  className?: string;
  type: string;
};

export const Pill = ({ as = "div", className = "", type }: PillProps) => {
  const getPillColor = (): {
    color: Color;
    label: CategoryLabels | string;
    url: CategoryUrls | "";
  } => {
    switch (type) {
      case "accessibility":
        return { color: "red", label: "Accessibility", url: "accessibility" };
      case "tsx":
        return { color: "pink", label: "TypeScript", url: "typescript" };
      case "jsx":
        return { color: "plum", label: "JavaScript", url: "javascript" };
      case "react":
        return { color: "purple", label: "React", url: "react" };
      case "html":
        return { color: "violet", label: "HTML", url: "html" };
      case "css":
        return { color: "sky", label: "CSS", url: "css" };
      case "scss":
        return { color: "cyan", label: "SCSS", url: "scss" };
      default:
        return { color: "lime", label: type, url: "" };
    }
  };

  const { color, label, url } = getPillColor();

  const shouldPillBeLink = as === "li";
  const pillClassName = `${styles.pill} ${styles[`pill${color}`]} ${className}`;

  const renderChildren = () =>
    shouldPillBeLink
      ? createElement(
          Link,
          {
            href: {
              pathname: routes.blog.snippets.url,
              query: { tag: url },
            },
            passHref: true,
          },
          <a title={`Snippets tagged ${label}`} className={pillClassName}>
            {label}
          </a>
        )
      : createElement("div", { className: pillClassName }, label);

  return createElement(as, {}, renderChildren());
};

const Pills = ({ types }: { types: string[] }) => {
  return (
    <ul className={styles.pills}>
      {types.map((type, pillIndex: number) => (
        <Pill type={type} as="li" key={type} />
      ))}
    </ul>
  );
};

export default Pills;
