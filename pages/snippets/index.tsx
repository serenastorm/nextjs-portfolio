import { useRouter } from "next/router";
import Head from "next/head";
import { SnippetLinks } from "components/snippets";
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
        <title>{subtitle ? `${subtitle} | ` : ""}Snippets</title>
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Page className={`${blogStyles.blog} ${blogPageStyles.blogPage}`}>
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
        <ul
          className={blogIndexStyles.blogPosts} // list-style-type: "none" removes list semantics so this is needed
          role="list"
        >
          <SnippetLinks posts={posts} />
        </ul>
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
  };
};
