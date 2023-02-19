import SyntaxHighlighter from "react-syntax-highlighter";
import { CopyToClipboardButton } from "components/blog";

import { CodeProps } from "../types";

import styles from "./CodeBlock.module.scss";

const CodeBlock = ({ code, language }: CodeProps) => {
  return (
    <div className={styles.wrapper}>
      <SyntaxHighlighter
        language={language}
        codeTagProps={{
          className: `${styles.codeBlock} language-${language} hljs`,
        }}
        useInlineStyles={false}
      >
        {code}
      </SyntaxHighlighter>
      <CopyToClipboardButton
        textToCopy={code}
        className={styles.copyToClipboardButton}
      />
    </div>
  );
};

export default CodeBlock;
