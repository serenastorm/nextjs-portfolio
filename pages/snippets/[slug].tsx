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

type BlogArticlePageProps = {
  entry: BlogPostResponse;
  previousPost: BlogPostResponse | null;
  nextPost: BlogPostResponse | null;
};

const BlogArticlePage = ({
  entry,
  previousPost,
  nextPost,
}: BlogArticlePageProps) => {
  const router = useRouter();
  const getSlug = (): string => {
    if (Array.isArray(router.query.slug)) {
      return router.query.slug[0];
    } else {
      return router.query.slug || "";
    }
  };
  const slug = getSlug();
  const { fields, sys } = entry;

  const { totalLikes, addLike, removeLike, likesAreLoading } = useLikes(sys.id);

  const {
    title,
    subcategory,
    content,
    tags,
    sandpackSettings,
    sandpackContent,
    shortText,
  } = fields;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="theme-color" content="#ffffff" />
        <meta
          property="og:image"
          content={`https://nextjs-portfolio-beryl.vercel.app/api/og?title=${title}${
            subcategory ? `&category=${subcategory}` : ""
          }`}
        />
        {shortText && <meta property="og:description" content={shortText} />}
      </Head>

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

          {tags && <SnippetPills types={tags} />}
        </header>
        <main id="mainContent" key={`${subcategory}/${slug}/mainContent`}>
          <h1>{title}</h1>
          <SnippetMarkdown content={content} />
          {sandpackContent && sandpackSettings && (
            <>
              <h2>Demo</h2>
              <SnippetSandpack
                markdown={sandpackContent}
                setup={sandpackSettings}
              />
            </>
          )}
        </main>
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
          </footer>
        )}
        {!likesAreLoading && (
          <SnippetLikeButton
            total={totalLikes}
            add={addLike}
            remove={removeLike}
            articleId={sys.id}
            fixed
          />
        )}
      </Page>
    </>
  );
};

export default BlogArticlePage;

export async function getStaticPaths() {
  const entries = await fetchEntries();

  // Get the paths we want to pre-render based on posts
  const paths = entries.map((entry) => ({
    params: { slug: entry.fields.slug },
  }));

  // We'll pre-render only these paths at build time.
  // https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
  return { paths, fallback: "blocking" };
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as Params;
  const { slug } = params;

  const entry = await fetchEntry(slug);
  const { previous: previousPost, next: nextPost } = await fetchRelatedEntries(
    slug
  );

  return {
    props: {
      entry,
      previousPost,
      nextPost,
    },
    revalidate: 30,
  };
};
