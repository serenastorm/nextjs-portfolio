import { isValidElement, ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { rehypeMetaAsAttributes } from "helpers/blog/rehypeMetaAsAttributes";
import { Page } from "components/shared/Page";
import {
  CopyToClipboardButton,
  LikeButton,
  Pills,
  Sandpack,
} from "components/snippets";
import { NewTabLink } from "components/shared";
import { routes } from "infrastructure/routes/constants";
import { ElementContent } from "react-markdown/lib/ast-to-react";
import { getCategory } from "helpers/blog/constants";
import { useSinglePost, usePostNavigation } from "infrastructure/hooks";

import styles from "styles/blog/BlogArticlePage.module.scss";
import blogStyles from "styles/blog/Blog.module.scss";
import blogArticleStyles from "styles/blog/BlogArticle.module.scss";
import blogMarkdownStyles from "styles/blog/BlogMarkdown.module.scss";
import blogPageStyles from "styles/blog/BlogPage.module.scss";

const category = "snippets";

const BlogArticlePage = () => {
  const router = useRouter();
  const { slug }: { slug: string } = router.query;
  const { post, isLoading, isEmpty, likes } = useSinglePost(category, slug);
  const { previousPost, nextPost } = usePostNavigation(category, slug);
  const { fields, sys } = post || {};

  const reactNodeToString = function (
    reactNode: ReactNode & ReactNode[]
  ): string {
    let string = "";
    if (typeof reactNode === "string") {
      string += reactNode;
    } else if (reactNode instanceof Array) {
      reactNode.forEach((child) => {
        string += reactNodeToString(child);
      });
    } else if (isValidElement(reactNode)) {
      string += reactNodeToString(reactNode.props.children);
    }
    return string;
  };

  const {
    title,
    subcategory,
    content,
    tags,
    sandpackSettings,
    sandpackContent,
  } = fields || {};

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {!isLoading && (
        <a className={styles.skipToContentLink} href="#mainContent">
          Skip to main content
        </a>
      )}
      <Page
        className={`${blogPageStyles.blogPage} ${blogStyles.blog} ${blogArticleStyles.blogArticle}`}
        as="article"
      >
        <header
          className={`${blogStyles.blogArticleMeta} ${blogArticleStyles.blogArticleMeta}`}
          key={`${subcategory}/${slug}/meta`}
        >
          <p>
            <Link href={`/${category}`}>Code Snippets</Link>
            {subcategory && (
              <>
                {" "}
                /{" "}
                <Link
                  href={{
                    pathname: routes.blog.snippets.url,
                    query: { cat: subcategory },
                  }}
                >
                  {getCategory(subcategory).label}
                </Link>
              </>
            )}
          </p>

          {tags && <Pills types={tags} />}
        </header>
        {!content || isLoading || isEmpty ? (
          <h1>{isEmpty && !isLoading ? "No article here." : "Loading..."}</h1>
        ) : (
          <main id="mainContent" key={`${subcategory}/${slug}/mainContent`}>
            <h1>{title}</h1>
            <div>
              <ReactMarkdown
                // eslint-disable-next-line react/no-children-prop
                children={content}
                key="main"
                className={blogMarkdownStyles.markdown}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[
                  rehypeMetaAsAttributes,
                  rehypeHighlight,
                  rehypeRaw,
                ]}
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
                          <div className={blogMarkdownStyles.codeBlockNav}>
                            <div>
                              <code>{filename}</code>
                            </div>
                          </div>
                        )}
                        <pre>
                          <CopyToClipboardButton
                            textToCopy={reactNodeToString(children)}
                          />
                          {/* {match && (
                          <Pill
                            type={match[1]}
                            className={blogArticleStyles.codePill}
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

                    const nodeChildren: Array<
                      ElementContent & { value?: string }
                    > = node.children;
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
            {sandpackContent && sandpackSettings && (
              <>
                <h2>Demo</h2>
                <Sandpack markdown={sandpackContent} setup={sandpackSettings} />
              </>
            )}
          </main>
        )}
        {(nextPost || previousPost) && (
          <footer className={blogArticleStyles.blogArticleNav}>
            <div
              className={blogArticleStyles.blogArticleNavLink}
              key={`${subcategory}/${slug}/prevLink`}
            >
              {previousPost && (
                <>
                  <p>Previous post</p>
                  <Link
                    href={`/${previousPost.fields.category}/${previousPost.fields.slug}`}
                    passHref
                  >
                    <a>
                      <h2>{previousPost.fields.title}</h2>
                    </a>
                  </Link>
                </>
              )}
            </div>
            <div
              className={blogArticleStyles.blogArticleNavLink}
              key={`${subcategory}/${slug}/nextLink`}
            >
              {nextPost && (
                <>
                  <p>Next post</p>
                  <Link
                    href={`/${nextPost.fields.category}/${nextPost.fields.slug}`}
                    passHref
                  >
                    <a>
                      <h2>{nextPost.fields.title}</h2>
                    </a>
                  </Link>
                </>
              )}
            </div>
          </footer>
        )}
        {sys?.id && <LikeButton {...likes} articleId={sys.id} fixed />}
      </Page>
    </>
  );
};

export default BlogArticlePage;

// export async function getStaticPaths() {
//   return {
//     paths: [
//       // String variant:
//       "/snippets/first-post",
//       // Object variant:
//       { params: { slug: "second-post" } },
//     ],
//     fallback: true,
//   };
// }
