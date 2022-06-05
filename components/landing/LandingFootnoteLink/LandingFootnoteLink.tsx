import { ReactNode } from "react";

import styles from "./LandingFootnoteLink.module.scss";

type LandingFootnoteLinkProps = {
  text: string;
  linkIndex: number;
};

type LandingFootnoteProps = {
  linkIndex: number;
  url: string;
  description: string;
};

const LandingFootnoteLink = ({ text, linkIndex }: LandingFootnoteLinkProps) => {
  const lastCharacterOfLink = text.charAt(text.length - 1);
  const linkHasPunctuation =
    lastCharacterOfLink === "," || lastCharacterOfLink === ".";

  return (
    <>
      <i>{linkHasPunctuation ? text.slice(0, -1) : text}</i>
      <sup className={styles.footnoteRef} id={`footnoteRef:${linkIndex}`}>
        <a href={`#footnote:${linkIndex}`} aria-describedby="footnotes-label">
          [{linkIndex + 1}]
        </a>
      </sup>
      <i>{linkHasPunctuation ? lastCharacterOfLink : null}</i>
    </>
  );
};

export const LandingFootnote = ({
  linkIndex,
  url,
  description,
}: LandingFootnoteProps) => {
  return (
    <li id={`footnote:${linkIndex}`} className={styles.footnote}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {description}
      </a>{" "}
      <b>
        <a
          className={styles.footnoteReturnLink}
          href={`#footnoteRef:${linkIndex}`}
          title="Jump up"
          aria-label="Jump up"
        >
          ↩
        </a>
      </b>
    </li>
  );
};

export const LandingFootnotes = ({ children }: { children: ReactNode }) => (
  <ol className={styles.footnotes}>
    <h2 className="screenReaderText" id="footnotes-label">
      Footnotes
    </h2>
    {children}
  </ol>
);

export default LandingFootnoteLink;
