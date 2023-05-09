import { useRouter } from "next/router";
import Head from "next/head";
import { ArticleCollection } from "components/blog/ArticleCollection";
import { Page } from "components/shared/Page";
import { filterPosts, getCategory } from "helpers/blog";
import { fetchMarkdownEntries } from "helpers/blog/api";
import type { GetStaticProps } from "next/types";

import type { ArticleMetaData } from "components/blog/ArticleWrapper/types";

import blogStyles from "styles/blog/Blog.module.scss";

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
          {`${subtitle ? `${subtitle} | ` : ""}Snippets | Serena Antonetti`}
        </title>
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="theme-color"
          content="#181a1d"
          media="(prefers-color-scheme: dark)"
        />
        <meta
          property="og:image"
          content={`https://nextjs-portfolio-beryl.vercel.app/api/og?title=${encodeURIComponent(
            "Code snippets"
          )}`}
        />
      </Head>
      <Page className={blogStyles.blog} as="main" type="blog">
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
        <ArticleCollection posts={filteredPosts} />
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
