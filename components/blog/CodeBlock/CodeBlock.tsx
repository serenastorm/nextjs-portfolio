import { reactNodeToString } from "helpers/blog";
import { CopyToClipboardButton } from "components/blog/CopyToClipboardButton";

import type { ReactNode } from "react";

import styles from "./CodeBlock.module.scss";
import codeTabsStyles from "components/blog/CodeTabs/CodeTabs.module.scss";

type CodeBlockProps = {
  children: JSX.Element | ReactNode;
  className?: string;
  filename?: string;
};

export const CodeBlock = ({
  children,
  className = "",
  filename,
}: CodeBlockProps) => {
  return (
    <div>
      {filename && (
        <div className={codeTabsStyles.codeTabs}>
          <p>{filename}</p>
        </div>
      )}
      <div className={styles.codeWrapper}>
        <pre>
          <code className={className}>
            <CopyToClipboardButton textToCopy={reactNodeToString(children)} />
            {children}
          </code>
        </pre>
      </div>
    </div>

    // <div className={styles.codeWrapper}>
    // <CopyToClipboardButton textToCopy={reactNodeToString(children)} />
    // {children}
    // </div>
  );
};
