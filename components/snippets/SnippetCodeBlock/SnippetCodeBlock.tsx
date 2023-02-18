import { reactNodeToString } from "helpers/blog";
import { SnippetCopyToClipboardButton } from "components/snippets/SnippetCopyToClipboardButton";

import styles from "./SnippetCodeBlock.module.scss";

type SnippetCodeBlockProps = {
  children: JSX.Element;
  filename?: string;
};

export const SnippetCodeBlock = ({
  children,
  filename,
}: SnippetCodeBlockProps) => {
  return (
    <div>
      {filename && (
        <div className={styles.codeHeader}>
          <p>{filename}</p>
        </div>
      )}
      <div className={styles.codeWrapper}>
        <SnippetCopyToClipboardButton
          textToCopy={reactNodeToString(children)}
        />
        {children}
      </div>
    </div>

    // <div className={styles.codeWrapper}>
    // <SnippetCopyToClipboardButton textToCopy={reactNodeToString(children)} />
    // {children}
    // </div>
  );
};
