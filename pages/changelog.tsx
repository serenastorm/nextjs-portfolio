import Head from "next/head";

import { Page } from "components/shared/Page";
import { fetchEntries } from "helpers/blog/api";
import { ChangeLogEntries } from "components/entries/EntryCollection";
import type { GetStaticProps } from "next/types";
import type { ChangeLogResponse } from "infrastructure/blog/types";

import styles from "styles/Accessibility.module.scss";
import blogStyles from "styles/blog/Blog.module.scss";
import blogIndexStyles from "styles/blog/BlogIndex.module.scss";
import blogPageStyles from "styles/blog/BlogPage.module.scss";

const Changelog = ({ entries }: { entries: ChangeLogResponse[] }) => {
  return (
    <>
      <Head>
        <title>Changelog</title>
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Page
        className={`${blogStyles.blog} ${blogPageStyles.blogPage} ${styles.accessibilityPage}`}
      >
        <h1 className={blogStyles.blogIndexTitle}>Changelog</h1>
        <ul
          className={blogIndexStyles.blogPosts} // list-style-type: "none" removes list semantics so this is needed
          role="list"
        >
          <ChangeLogEntries entries={entries} />
        </ul>
      </Page>
    </>
  );
};

export default Changelog;

export const getStaticProps: GetStaticProps = async () => {
  const entries = await fetchEntries("changelog");

  return {
    props: {
      entries,
    },
  };
};
