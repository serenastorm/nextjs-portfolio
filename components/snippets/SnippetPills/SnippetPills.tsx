import {
  createElement,
  useState,
  useRef,
  LegacyRef,
  KeyboardEvent,
} from "react";
import Link from "next/link";
import type { CategoryLabels, CategoryUrls } from "helpers/blog/types";

import { routes } from "infrastructure/routes/constants";

import styles from "./SnippetPills.module.scss";

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

type SnippetPillProps = {
  animationDelay?: number;
  as?: "div" | "li";
  className?: string;
  type: string;
  linkRef: LegacyRef<HTMLAnchorElement>;
  onKeyDown: (event: KeyboardEvent<HTMLAnchorElement>) => void;
  tabIndex: 0 | -1;
};

export const SnippetPill = ({
  as = "div",
  className = "",
  type,
  linkRef,
  onKeyDown,
  tabIndex,
}: SnippetPillProps) => {
  const getSnippetPillColor = (): {
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

  const { color, label, url } = getSnippetPillColor();

  const shouldSnippetPillBeLink = as === "li";
  const pillClassName = `${styles.pill} ${styles[`pill${color}`]} ${className}`;

  const renderChildren = () =>
    shouldSnippetPillBeLink
      ? createElement(
          Link,
          {
            href: {
              pathname: routes.blog.snippets.url,
              query: { tag: url },
            },
            passHref: true,
          },
          <a
            title={`Snippets tagged ${label}`}
            className={pillClassName}
            ref={linkRef}
            onKeyDown={(event: KeyboardEvent<HTMLAnchorElement>) =>
              onKeyDown(event)
            }
            tabIndex={tabIndex}
          >
            {label}
          </a>
        )
      : createElement("div", { className: pillClassName }, label);

  return createElement(as, {}, renderChildren());
};

const SnippetPills = ({ types }: { types: string[] }) => {
  const [focusedPillIndex, setFocusedPillIndex] = useState<number>(0);
  const pillsRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const focusPill = (newFocusedPillIndex: number) => {
    pillsRefs?.current[newFocusedPillIndex]?.focus();
    setFocusedPillIndex(newFocusedPillIndex);
  };

  const totalPills = types.length;

  const onKeyPressed = (
    event: KeyboardEvent<HTMLAnchorElement>,
    pillIndex: number
  ) => {
    const shouldGoToNextTab = event.key === "ArrowRight";
    const shouldGoToPreviousTab = event.key === "ArrowLeft";
    const shouldGoToFirstTab = event.key === "Home";
    const shouldGoToLastTab = event.key === "End";

    const prevPillIndex = pillIndex - 1;
    const nextPillIndex = pillIndex + 1;
    const lastTab = totalPills - 1;

    if (shouldGoToNextTab) {
      if (pillIndex >= totalPills - 1) {
        focusPill(0);
      } else {
        focusPill(nextPillIndex);
      }
    } else if (shouldGoToPreviousTab) {
      if (pillIndex <= 0) {
        focusPill(lastTab);
      } else {
        focusPill(prevPillIndex);
      }
    } else if (shouldGoToFirstTab) {
      focusPill(0);
    } else if (shouldGoToLastTab) {
      focusPill(lastTab);
    } else {
      return null;
    }
  };

  return (
    <ul className={styles.pills}>
      {types.map((type, pillIndex) => (
        <SnippetPill
          type={type}
          as="li"
          key={type}
          linkRef={(el: HTMLAnchorElement) =>
            (pillsRefs.current[pillIndex] = el)
          }
          onKeyDown={(event: KeyboardEvent<HTMLAnchorElement>) =>
            onKeyPressed(event, pillIndex)
          }
          tabIndex={pillIndex === focusedPillIndex ? 0 : -1}
        />
      ))}
    </ul>
  );
};

export default SnippetPills;
