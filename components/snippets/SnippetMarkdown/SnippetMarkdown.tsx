import ReactMarkdown from "react-markdown";
import { useRef, useState, KeyboardEvent } from "react";
import type { CoreOptions } from "react-markdown/lib/react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { SnippetCodeTabs } from "./SnippetCodeTabs";
import { rehypeMetaAsAttributes, reactNodeToString } from "helpers/blog";
import { SnippetCopyToClipboardButton } from "components/snippets";
import { Link } from "components/shared";
import { ElementContent } from "react-markdown/lib/ast-to-react";

import styles from "./SnippetMarkdown.module.scss";
import blogStyles from "styles/blog/Blog.module.scss";
import blogArticleStyles from "styles/blog/BlogArticle.module.scss";

const SnippetMarkdown = ({ content }: { content: CoreOptions["children"] }) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const tabsRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activateTab = (newTabIndex: number) => {
    /* Focus new tab button */
    tabsRefs?.current[newTabIndex]?.focus();
    /* Set new tab as active */
    setActiveTabIndex(newTabIndex);
  };

  const onKeyPressed = (
    event: KeyboardEvent<HTMLButtonElement>,
    tabIndex: number,
    totalTabs: number
  ) => {
    const shouldGoToNextTab = event.key === "ArrowRight";
    const shouldGoToPreviousTab = event.key === "ArrowLeft";
    const shouldGoToFirstTab = event.key === "Home";
    const shouldGoToLastTab = event.key === "End";

    const prevTab = tabIndex - 1;
    const nextTab = tabIndex + 1;
    const lastTab = totalTabs - 1;

    if (shouldGoToNextTab) {
      if (tabIndex >= totalTabs - 1) {
        activateTab(0);
      } else {
        activateTab(nextTab);
      }
    } else if (shouldGoToPreviousTab) {
      if (tabIndex <= 0) {
        activateTab(lastTab);
      } else {
        activateTab(prevTab);
      }
    } else if (shouldGoToFirstTab) {
      activateTab(0);
    } else if (shouldGoToLastTab) {
      activateTab(lastTab);
    } else {
      return null;
    }
  };

  return (
    <>
      <ReactMarkdown
        // eslint-disable-next-line react/no-children-prop
        children={content}
        key="main"
        className={`${styles.markdown} markdown`}
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
          div({ children, node, ...props }) {
            const shouldHaveTabs = !!node.properties?.filenames;
            const tabsList = `${node.properties?.filenames}`;
            const tabs = tabsList.split(",");

            const tabsLabel = node.properties?.label;
            const label =
              typeof tabsLabel === "string"
                ? tabsLabel.toLowerCase().replace(/\s/g, "")
                : "";

            return shouldHaveTabs && label ? (
              <SnippetCodeTabs
                tabs={tabs}
                label={label}
                renderWrapper={(activeTabIndex, wrapperChildren) => (
                  <div data-activetab={activeTabIndex + 1} {...props}>
                    {wrapperChildren}
                  </div>
                )}
              >
                {children}
              </SnippetCodeTabs>
            ) : (
              <div {...props}>{children}</div>
            );
          },
          a({ children, node, href, ...props }) {
            const indexOfExternalLink = node.children.findIndex(
              (child) =>
                child.type === "text" &&
                (child.value === "View full criteria" ||
                  child.value === "View design pattern")
            );

            const indexOfLink = node.children.findIndex(
              (child) => child.type === "text"
            );

            const isExternalLink =
              href?.startsWith("http") || href?.startsWith("https");

            const nodeChildren: Array<ElementContent & { value?: string }> =
              node.children;
            const linkCopy = nodeChildren[indexOfLink]?.value;

            return isExternalLink && href && !!linkCopy ? (
              <Link label={linkCopy} href={href} underline={false} />
            ) : (
              <a href={href} {...props}>
                {children}
              </a>
            );
          },
        }}
      />
    </>
  );
};

export default SnippetMarkdown;
