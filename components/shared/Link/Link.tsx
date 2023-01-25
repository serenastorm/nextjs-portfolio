import { default as NextLink } from "next/link";
import { SendEmailIcon, OpenInNewTabIcon } from "assets/icons";

import type { LinkProps } from "./types";

import styles from "./Link.module.scss";

export const Link = ({
  className = "",
  label,
  href,
  type = "link",
  shouldOpenInNewTab,
  underline = true,
  ...props
}: LinkProps) => {
  // We need to split the content in two so the
  // last word can always be on the same line
  // as the icon using white-space: nowrap;
  const destinationUrl = `${type === "email" ? "mailto:" : ""}${href}`;
  const isExternal =
    shouldOpenInNewTab ||
    (typeof href === "string" &&
      (href?.startsWith("http") || href?.startsWith("https")));
  const labelWords = label.split(" ");
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
      {label && (
        <>
          {wordsTotal > 0 && <span>{labelWords.join(" ")} </span>}
          <span>
            {lastWord}
            {type === "email" ? (
              <SendEmailIcon />
            ) : (
              <>{isExternal && <OpenInNewTabIcon />}</>
            )}
          </span>
        </>
      )}
    </NextLink>
  );
};
