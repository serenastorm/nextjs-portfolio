import {
  createElement,
  useState,
  useRef,
  Fragment,
  type KeyboardEvent,
} from "react";
import Link from "next/link";
import { routes } from "infrastructure/routes/constants";
import { getTag } from "./constants";

import type { TagProps, TagsProps } from "./types";

import styles from "./Tags.module.scss";

export const Tag = ({
  className = "",
  isLink,
  inList,
  type,
  linkRef,
  onKeyDown,
  tabIndex,
}: TagProps) => {
  const { color, label, url } = getTag(type);

  const pillClassName = `${styles.pill} ${styles[`pill${color}`]} ${className}`;

  const wrapperElement = () => {
    if (inList) {
      return "li";
    } else {
      if (isLink) {
        return Fragment;
      } else {
        return "div";
      }
    }
  };

  const renderChildren = () => {
    return isLink ? (
      <Link
        className={pillClassName}
        href={{
          pathname: routes.blog.snippets.url,
          query: { tag: url },
        }}
        title={inList ? undefined : `Snippets tagged ${label}`}
        ref={linkRef}
        tabIndex={tabIndex}
        onKeyDown={(event: KeyboardEvent<HTMLAnchorElement>) =>
          onKeyDown(event)
        }
      >
        {label}
      </Link>
    ) : (
      <div className={pillClassName}>{label}</div>
    );
  };

  return createElement(wrapperElement(), {}, renderChildren());
};

export const Tags = ({ asLinks = true, label, types }: TagsProps) => {
  const [focusedPillIndex, setFocusedPillIndex] = useState<number>(0);
  const pillsRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const focusPill = (newFocusedPillIndex: number) => {
    pillsRefs?.current[newFocusedPillIndex]?.focus();
    setFocusedPillIndex(newFocusedPillIndex);
  };

  const totalPills = types.length;
  const asList = totalPills > 1;

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

  return createElement(
    asList ? "ul" : Fragment,
    asList
      ? {
          role: "list",
          "aria-label": label ? undefined : "Snippet tags",
          "aria-labelledby": label,
          className: styles.pills,
        }
      : {},
    types.map((type, pillIndex) => (
      <Tag
        type={type.toLowerCase()}
        isLink={asLinks || asList}
        inList={asList}
        key={type}
        linkRef={(el: HTMLAnchorElement) => (pillsRefs.current[pillIndex] = el)}
        onKeyDown={(event: KeyboardEvent<HTMLAnchorElement>) => {
          if (!asLinks) {
            return null;
          }
          onKeyPressed(event, pillIndex);
        }}
        tabIndex={pillIndex === focusedPillIndex && asLinks ? 0 : -1}
      />
    ))
  );
};
