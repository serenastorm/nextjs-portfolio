import Link from "next/link";
import { SendEmailIcon, OpenInNewTabIcon } from "assets/icons";

import type { LinkProps } from "./types";

import styles from "./NewTabLink.module.scss";

export const NewTabLink = ({
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
    <Link
      href={destinationUrl}
      className={`${styles.newTabLink} ${className}${
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
    </Link>
  );
};
