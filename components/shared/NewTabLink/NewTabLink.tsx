import { SendEmailIcon, OpenInNewTabIcon } from "assets/icons";
import styles from "./NewTabLink.module.scss";

type NewTabLinkProps = {
  className?: string;
  copy: string;
  to: string;
  type?: "email" | "link";
  shouldOpenInNewTab?: boolean;
  withUnderline?: boolean;
};

const NewTabLink = ({
  className = "",
  copy,
  to,
  type = "link",
  shouldOpenInNewTab,
  withUnderline = true,
}: NewTabLinkProps) => {
  // We need to split the content in two so the
  // last word can always be on the same line
  // as the icon using white-space: nowrap;
  const destinationUrl = `${type === "email" ? "mailto:" : ""}${to}`;
  const linkLabelWords = copy.match(/\b(\w+)\b/g);
  const lastWord = linkLabelWords?.pop();
  const wordsTotal = linkLabelWords?.length || 0;

  return (
    <a
      href={destinationUrl}
      className={`${styles.newTabLink} ${className}${
        withUnderline ? " underline-link" : ""
      }`}
      target={shouldOpenInNewTab ? "blank" : undefined}
      rel={shouldOpenInNewTab ? "noopener noreferrer" : undefined}
    >
      <span>
        {wordsTotal > 1 &&
          linkLabelWords?.map((linkLabelWord) => `${linkLabelWord} `)}
      </span>
      <span>
        {lastWord}
        {type === "email" ? <SendEmailIcon /> : <OpenInNewTabIcon />}
      </span>
    </a>
  );
};

export default NewTabLink;
