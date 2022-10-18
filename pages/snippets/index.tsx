import { useRouter } from "next/router";
import Head from "next/head";
import { SnippetLinks } from "components/entries/EntryCollection";
import { Page } from "components/shared/Page";
import { filterPosts, getCategory } from "helpers/blog";
import type { GetStaticProps } from "next/types";
import type { BlogPostResponse } from "infrastructure/blog/types";

import blogStyles from "styles/blog/Blog.module.scss";
import blogIndexStyles from "styles/blog/BlogIndex.module.scss";
import blogPageStyles from "styles/blog/BlogPage.module.scss";

import { fetchEntries } from "helpers/blog/api";

const SnippetsPage = ({ entries }: { entries: BlogPostResponse[] }) => {
  const { query } = useRouter();

  const { cat, tag: queryTag } = query;

  const category = "snippets";
  const subcategory = Array.isArray(cat) ? cat[0] : cat || "";
  const tag = Array.isArray(queryTag) ? queryTag[0] : queryTag || "";

  const posts = filterPosts({
    entries,
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
          <SnippetLinks posts={posts} />
        </div>
      </Page>
    </>
  );
};

export default SnippetsPage;

export const getStaticProps: GetStaticProps = async () => {
  const entries = await fetchEntries();

  return {
    props: {
      entries,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 30 seconds
    revalidate: 30,
  };
};
