import { ReactNode } from "react";

import styles from "./HighlightedText.module.scss";

type HighlightedTextProps = {
  children: ReactNode;
};

const HighlightedText = ({ children }: HighlightedTextProps) => {
  return <span className={styles.highlightedText}>{children}</span>;
};

export default HighlightedText;
