import { reactNodeToString } from "helpers/blog";
import { CopyToClipboardButton } from "components/blog/CopyToClipboardButton";

import styles from "./CodeBlock.module.scss";

type CodeBlockProps = {
  children: JSX.Element;
  filename?: string;
};

export const CodeBlock = ({
  children,
  filename,
}: CodeBlockProps) => {
  return (
    <div>
      {filename && (
        <div className={styles.codeHeader}>
          <p>{filename}</p>
        </div>
      )}
      <div className={styles.codeWrapper}>
        <CopyToClipboardButton
          textToCopy={reactNodeToString(children)}
        />
        {children}
      </div>
    </div>

    // <div className={styles.codeWrapper}>
    // <CopyToClipboardButton textToCopy={reactNodeToString(children)} />
    // {children}
    // </div>
  );
};
