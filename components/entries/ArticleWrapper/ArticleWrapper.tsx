import Link from "next/link";
import Head from "next/head";
import type { ParsedUrlQuery } from "querystring";
import type { GetStaticProps } from "next/types";
import { useRouter } from "next/router";
import { Page } from "components/shared/Page";
import {
  SnippetLikeButton,
  SnippetMarkdown,
  SnippetPills,
  SnippetSandpack,
} from "components/snippets";
import { routes } from "infrastructure/routes/constants";
import { useLikes } from "infrastructure/hooks";
import { getCategory } from "helpers/blog";
import {
  fetchEntries,
  fetchEntry,
  fetchRelatedEntries,
} from "helpers/blog/api";

import type { BlogPostResponse } from "infrastructure/blog/types";

import blogStyles from "styles/blog/Blog.module.scss";
import blogArticleStyles from "styles/blog/BlogArticle.module.scss";
import blogPageStyles from "styles/blog/BlogPage.module.scss";

const category = "snippets";

type ArticleMetaData = {
  title: string;
  subcategory?: string;
  slug: string;
};

type ArticleWrapperProps = {
  children: JSX.Element;
} & ArticleMetaData;

export const ArticleWrapper = ({
  children,
  title,
  subcategory,
  slug,
}: ArticleWrapperProps) => {

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
        {/* {shortText && <meta property="og:description" content={shortText} />} */}
      </Head>

      <Page
        className={`${blogPageStyles.blogPage} ${blogStyles.blog} ${blogArticleStyles.blogArticle}`}
        as="main"
      >
        <header
          className={`${blogStyles.blogArticleMeta} ${blogArticleStyles.blogArticleMeta}`}
          key={`${subcategory}/${slug}/meta`}
        >
          <nav aria-label="Breadcrumbs">
            <ul
              aria-label="Breadcrumbs"
              className={blogArticleStyles.breadcrumbs}
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

          {/* {tags && <SnippetPills types={tags} />} */}
        </header>
        <article id="mainContent" key={`${subcategory}/${slug}/mainContent`}>
          <h1>{title}</h1>
          {children}
        </article>
        {/* {(nextPost || previousPost) && (
          <aside className={blogArticleStyles.blogArticleNav}>
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
                    <a>{previousPost.fields.title}</a>
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
                    <a>{nextPost.fields.title}</a>
                  </Link>
                </>
              )}
            </div>
          </aside>
        )}
        {!likesAreLoading && (
          <SnippetLikeButton
            total={totalLikes}
            add={addLike}
            remove={removeLike}
            articleId={sys.id}
            fixed
          />
        )} */}
      </Page>
    </>
  );
};
