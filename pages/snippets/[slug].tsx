import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { Page } from "components/shared/Page";
import { SnippetLikeButton, SnippetMarkdown, SnippetPills, SnippetSandpack } from "components/snippets";
import { routes } from "infrastructure/routes/constants";
import { getCategory } from "helpers/blog/constants";
import { useSinglePost, usePostNavigation } from "infrastructure/hooks";

import styles from "styles/blog/BlogArticlePage.module.scss";
import blogStyles from "styles/blog/Blog.module.scss";
import blogArticleStyles from "styles/blog/BlogArticle.module.scss";
import blogPageStyles from "styles/blog/BlogPage.module.scss";

const category = "snippets";

const BlogArticlePage = () => {
  const router = useRouter();
  const getSlug = (): string => {
    if (Array.isArray(router.query.slug)) {
      return router.query.slug[0];
    } else {
      return router.query.slug || "";
    }
  };
  const slug = getSlug();
  const { post, isLoading, isEmpty, likes } = useSinglePost(category, slug);
  const { previousPost, nextPost } = usePostNavigation(category, slug);
  const { fields, sys } = post || {};

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

          {tags && <SnippetPills types={tags} />}
        </header>
        {!content || isLoading || isEmpty ? (
          <h1>{isEmpty && !isLoading ? "No article here." : "Loading..."}</h1>
        ) : (
          <main id="mainContent" key={`${subcategory}/${slug}/mainContent`}>
            <h1>{title}</h1>
            <SnippetMarkdown content={content} />
            {sandpackContent && sandpackSettings && (
              <>
                <h2>Demo</h2>
                <SnippetSandpack markdown={sandpackContent} setup={sandpackSettings} />
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
        {sys?.id && <SnippetLikeButton {...likes} articleId={sys.id} fixed />}
      </Page>
    </>
  );
};

export default BlogArticlePage;
