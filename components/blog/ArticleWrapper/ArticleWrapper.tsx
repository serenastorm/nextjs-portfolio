import { MDXProvider } from "@mdx-js/react";
import Head from "next/head";
import Balancer from "react-wrap-balancer";
import { Link as MarkdownLink, Page } from "components/shared";
import { CodeBlock as Code, LikeButton, Tags } from "components/blog";
import { RelatedArticles } from "./RelatedArticles";
import { Breadcrumbs } from "./Breadcrumbs";
import { getTag } from "components/blog/Tags/constants";
import { useLikes, useRelatedPosts } from "infrastructure/hooks";
import type { ArticleMetaData } from "./types";
import type {
  AnchorHTMLAttributes,
  ClassAttributes,
  HTMLAttributes,
} from "react";

import styles from "./ArticleWrapper.module.scss";
import markdownStyles from "styles/blog/Markdown.module.scss";
import blogStyles from "styles/blog/Blog.module.scss";

type ArticleWrapperProps = {
  children: JSX.Element;
} & ArticleMetaData;

const markdownComponents = {
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) =>
    props.href ? (
      <MarkdownLink href={props.href}>{props.children}</MarkdownLink>
    ) : (
      <>{props.children}</>
    ),

  pre: (props: ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement>) => (
    <>{props.children}</>
  ),
  // TODO fix those types
  // @ts-ignore
  code: ({ children, className, inline, filename }) =>
    inline ? (
      <code>{children}</code>
    ) : (
      <Code className={className} filename={filename}>
        {children}
      </Code>
    ),
};

export const ArticleWrapper = ({
  children,
  id,
  title,
  subcategory,
  shortText,
  slug,
  tags,
}: ArticleWrapperProps) => {
  const { totalLikes, addLike, removeLike, likesStatus } = useLikes(id);
  const { nextPost, previousPost } = useRelatedPosts(id);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="theme-color"
          content="#181a1d"
          media="(prefers-color-scheme: dark)"
        />
        <meta
          property="og:image"
          content={`https://nextjs-portfolio-beryl.vercel.app/api/og?title=${encodeURIComponent(
            title
          )}${
            subcategory
              ? `&category=${encodeURIComponent(getTag(subcategory).label)}`
              : ""
          }`}
        />
        {shortText && <meta property="og:description" content={shortText} />}
      </Head>
      <Page className={blogStyles.blog} as="main" type="blog">
        <header
          className={`${styles.header}`}
          key={`${subcategory}/${slug}/meta`}
        >
          <Breadcrumbs subcategory={subcategory} />
          <h1>
            {/* Replace with CSS text-wrap: balance when support is better */}
            <Balancer>
              {/* This can't be a pseudo element bc it breaks the balancer */}
              <span aria-hidden="true" className={styles.titleOrnament}>
                &#9830;&#xFE0E;
              </span>
              {title}
            </Balancer>
          </h1>

          {tags && (
            <div className={styles.tags}>
              <p id="tagsLabel">Tagged: </p>
              <Tags label="tagsLabel" types={tags} />
            </div>
          )}
        </header>

        <article
          id="mainContent"
          key={`${subcategory}/${slug}/mainContent`}
          className={markdownStyles.markdown}
        >
          {/* @ts-ignore */}
          <MDXProvider components={markdownComponents}>{children}</MDXProvider>
        </article>
        <RelatedArticles nextPost={nextPost} previousPost={previousPost} />
        {likesStatus !== "failed" && likesStatus !== "initial" && (
          <LikeButton
            total={totalLikes}
            add={addLike}
            remove={removeLike}
            articleId={id}
            fixed
          />
        )}
      </Page>
    </>
  );
};
