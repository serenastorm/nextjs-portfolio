import { useRouter } from "next/router";
import Head from "next/head";
import { SnippetLinks } from "components/blog/EntryCollection";
import { Page } from "components/shared/Page";
import { filterPosts, getCategory } from "helpers/blog";
import { fetchMarkdownEntries } from "helpers/blog/api";
import type { GetStaticProps } from "next/types";

import type { ArticleMetaData } from "components/blog/ArticleWrapper/types";

import blogStyles from "styles/blog/Blog.module.scss";
import blogIndexStyles from "styles/blog/BlogIndex.module.scss";
import blogPageStyles from "styles/blog/BlogPage.module.scss";

const SnippetsPage = ({ posts }: { posts: ArticleMetaData[] }) => {
  const { query } = useRouter();

  const { cat, tag: queryTag } = query;

  const category = "snippets";
  const subcategory = Array.isArray(cat) ? cat[0] : cat || "";
  const tag = Array.isArray(queryTag) ? queryTag[0] : queryTag || "";

  const filteredPosts = filterPosts({
    entries: posts,
    category,
    subcategory,
    tag: tag ? getCategory(tag).value : null,
  });

  const tagSubtitle = tag && getCategory(tag).label;
  const subcategorySubtitle = subcategory && getCategory(subcategory).label;
  const subtitle = tagSubtitle || subcategorySubtitle;

  return (
    <>
      <Head>
        <title>
          {subtitle ? `${subtitle} | ` : ""}Snippets | Serena Antonetti
        </title>
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="theme-color"
          content="#181a1d"
          media="(prefers-color-scheme: dark)"
        />
      </Head>
      <Page
        className={`${blogStyles.blog} ${blogPageStyles.blogPage}`}
        as="main"
      >
        <h1 className={blogStyles.blogIndexTitle}>
          {tag || subcategory ? (
            <>
              Snippets {tag ? "tagged" : "in"}:{" "}
              <span className="italic medium">
                {(tag && getCategory(tag).label) ||
                  (subcategory && getCategory(subcategory).label)}
              </span>
            </>
          ) : (
            "All snippets"
          )}
        </h1>
        <div className={blogIndexStyles.blogPosts}>
          <SnippetLinks posts={filteredPosts} />
        </div>
      </Page>
    </>
  );
};

export default SnippetsPage;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await fetchMarkdownEntries();

  return {
    props: {
      posts,
    },
  };
};
