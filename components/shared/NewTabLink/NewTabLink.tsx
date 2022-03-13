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
  const destinationUrl = `${type === "email" ? "mailto:" : ""}${to}`;

  return (
    <a
      href={destinationUrl}
      className={`${styles.newTabLink} ${className}${
        withUnderline ? " underline-link" : ""
      }`}
      target={shouldOpenInNewTab ? "blank" : undefined}
      rel={shouldOpenInNewTab ? "noopener noreferrer" : undefined}
    >
      {copy}
      {type === "email" ? <SendEmailIcon /> : <OpenInNewTabIcon />}
    </a>
  );
};

export default NewTabLink;
