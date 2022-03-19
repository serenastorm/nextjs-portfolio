import ReactMarkdown from "react-markdown";
import type { CoreOptions } from "react-markdown/lib/react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { rehypeMetaAsAttributes } from "helpers/blog/rehypeMetaAsAttributes";
import { SnippetCopyToClipboardButton } from "components/snippets";
import { NewTabLink } from "components/shared";
import { ElementContent } from "react-markdown/lib/ast-to-react";
import reactNodeToString from "helpers/blog/reactNodeToString";

import styles from "./SnippetMarkdown.module.scss";
import blogArticleStyles from "styles/blog/BlogArticle.module.scss";

const SnippetMarkdown = ({ content }: { content: CoreOptions["children"] }) => {
  return (
    <>
      <div>
        <ReactMarkdown
          // eslint-disable-next-line react/no-children-prop
          children={content}
          key="main"
          className={styles.markdown}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeMetaAsAttributes, rehypeHighlight, rehypeRaw]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const filename = node?.properties?.filename;

              const renderSnippet = () => (
                <code className={className} {...props}>
                  {children}
                </code>
              );

              return inline ? (
                renderSnippet()
              ) : (
                <>
                  {filename && (
                    <div className={styles.codeBlockNav}>
                      <div>
                        <code>{filename}</code>
                      </div>
                    </div>
                  )}
                  <pre>
                    <SnippetCopyToClipboardButton
                      textToCopy={reactNodeToString(children)}
                    />
                    {/* {match && (
                          <SnippetPill
                            type={match[1]}
                            className={blogArticleStyles.codeSnippetPill}
                          />
                        )} */}
                    {renderSnippet()}
                  </pre>
                </>
              );
            },
            pre({ children }) {
              return <>{children}</>;
            },
            a({ children, node, href, ...props }) {
              const indexOfExternalLink = node.children.findIndex(
                (child) =>
                  child.type === "text" &&
                  (child.value === "View full criteria" ||
                    child.value === "View design pattern")
              );

              const isExternalLink = indexOfExternalLink > -1;

              const nodeChildren: Array<ElementContent & { value?: string }> =
                node.children;
              const linkCopy = nodeChildren[indexOfExternalLink]?.value;

              return isExternalLink && href && !!linkCopy ? (
                <NewTabLink
                  copy={linkCopy}
                  to={href}
                  shouldOpenInNewTab
                  className={`medium ${blogArticleStyles.newTabLink}`}
                  withUnderline={false}
                />
              ) : (
                <a {...props}>{children}</a>
              );
            },
          }}
        />
      </div>
    </>
  );
};

export default SnippetMarkdown;
