import { MDXProvider } from "@mdx-js/react";
import Link from "next/link";
import { Link as MarkdownLink } from "components/shared";
import Head from "next/head";
import Balancer from "react-wrap-balancer";
import { Page } from "components/shared/Page";
import { SnippetLikeButton, SnippetTags } from "components/snippets";
import { routes } from "infrastructure/routes/constants";
import { useLikes, useRelatedPosts } from "infrastructure/hooks";
import { getCategory } from "helpers/blog";
// import { fetchRelatedEntries } from "helpers/blog/api";

import type { ArticleMetaData } from "./types";
import type { AnchorHTMLAttributes } from "react";

import blogStyles from "styles/blog/Blog.module.scss";
import blogArticleStyles from "styles/blog/BlogArticle.module.scss";
import blogPageStyles from "styles/blog/BlogPage.module.scss";
import markdownStyles from "components/snippets/SnippetMarkdown/SnippetMarkdown.module.scss";

const category = "snippets";

type ArticleWrapperProps = {
  children: JSX.Element;
} & ArticleMetaData;

export const markdownComponents = {
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) =>
    props.href ? (
      <MarkdownLink href={props.href}>{props.children}</MarkdownLink>
    ) : (
      <></>
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
            subcategory ? `&category=${encodeURIComponent(subcategory)}` : ""
          }`}
        />
        {shortText && <meta property="og:description" content={shortText} />}
      </Head>

      <Page
        className={`${blogPageStyles.blogPage} ${blogStyles.blog} ${blogArticleStyles.blogArticle}`}
        as="main"
      >
        <header
          className={`${blogArticleStyles.header}`}
          key={`${subcategory}/${slug}/meta`}
        >
          <nav aria-label="Breadcrumbs">
            <ul
              aria-label="Breadcrumbs"
              className={blogArticleStyles.breadcrumbs}
              role="list"
            >
              <li>
                <Link href={`/${category}`}>Code Snippets</Link>
              </li>
              {subcategory && (
                <li>
                  <Link
                    href={{
                      pathname: routes.blog.snippets.url,
                      query: { cat: subcategory },
                    }}
                  >
                    {getCategory(subcategory).label}
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          <h1>
            <Balancer>
              {/* This can't be a pseudo element bc it breaks the balancer */}
              <span
                aria-hidden="true"
                className={blogArticleStyles.titleOrnament}
              >
                &#9830;&#xFE0E;
              </span>
              {title}
            </Balancer>
          </h1>

          {tags && (
            <div className={blogArticleStyles.tags}>
              <p id="tagsLabel">Tagged: </p>
              <SnippetTags types={tags} />
            </div>
          )}
        </header>

        <article
          id="mainContent"
          key={`${subcategory}/${slug}/mainContent`}
          className={markdownStyles.markdown}
        >
          <MDXProvider components={markdownComponents}>{children}</MDXProvider>
        </article>
        {(nextPost || previousPost) && (
          <aside className={blogArticleStyles.blogArticleNav}>
            <div
              className={blogArticleStyles.blogArticleNavLink}
              key={`${subcategory}/${slug}/prevLink`}
            >
              {previousPost && (
                <>
                  <p>Previous post</p>
                  <Link href={`/${previousPost.category}/${previousPost.slug}`}>
                    {previousPost.title}
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
                  <Link href={`/${nextPost.category}/${nextPost.slug}`}>
                    {nextPost.title}
                  </Link>
                </>
              )}
            </div>
          </aside>
        )}
        {likesStatus !== "failed" && likesStatus !== "initial" && (
          <SnippetLikeButton
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
