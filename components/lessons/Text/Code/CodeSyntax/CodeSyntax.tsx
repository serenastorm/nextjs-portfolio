import { ReactNode } from "react";

import styles from "./CodeSyntax.module.scss";
import inlineCodeStyles from "../InlineCode/InlineCode.module.scss";

type CodeSyntaxProps = {
  children: ReactNode;
  type: "selector" | "attribute";
};

const CodeSyntax = ({ children, type }: CodeSyntaxProps) => {
  return (
    <code className={`${inlineCodeStyles.inlineCode} ${styles[type]}`}>
      {children}
    </code>
  );
};

export default CodeSyntax;
