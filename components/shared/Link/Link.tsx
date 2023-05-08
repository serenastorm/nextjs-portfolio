import { Children, type ReactNode } from "react";
import { default as NextLink } from "next/link";
import { SendEmailIcon, OpenInNewTabIcon } from "assets/icons";

import type { LinkProps } from "./types";

import styles from "./Link.module.scss";

/**
 * The `Link` component accepts any number of children,
 * to mirror the behaviour of a tags
 */

const getLabelFromChildren = (children: ReactNode) => {
  let label = "";

  Children.map(children, (child) => {
    if (typeof child === "string") {
      label += child;
    }
  });

  return label;
};

export const Link = ({
  className = "",
  children,
  hidden = false,
  href,
  type = "link",
  showArrow,
  underline = true,
  ...props
}: LinkProps) => {
  // We need to split the content in two so the
  // last word can always be on the same line
  // as the icon using white-space: nowrap;
  const destinationUrl = `${type === "email" ? "mailto:" : ""}${href}`;
  const isExternal =
    typeof href === "string" &&
    (href?.startsWith("http") || href?.startsWith("https"));
  const labelWords = getLabelFromChildren(children).split(" ");
  const lastWord = labelWords.pop();
  const wordsTotal = labelWords.length;

  return (
    <NextLink
      href={destinationUrl}
      className={`${styles.Link} ${className}${
        underline ? styles.withUnderline : ""
      }`}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...props}
    >
      {!hidden && (
        <>
          {wordsTotal > 0 && <span>{labelWords.join(" ")} </span>}
          <span>
            {lastWord}
            {type === "email" ? (
              <SendEmailIcon />
            ) : (
              <>
                {isExternal && (
                  <span className="screenReaderText">(Opens in a new tab)</span>
                )}
                {(isExternal || showArrow) && <OpenInNewTabIcon />}
              </>
            )}
          </span>
        </>
      )}
    </NextLink>
  );
};
