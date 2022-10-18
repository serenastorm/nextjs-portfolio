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
        <title>Changelog | Serena Antonetti</title>
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="theme-color"
          content="#181a1d"
          media="(prefers-color-scheme: dark)"
        />
      </Head>
      <Page
        className={`${blogStyles.blog} ${blogPageStyles.blogPage} ${styles.accessibilityPage}`}
        as="main"
      >
        <h1 className={blogStyles.blogIndexTitle}>Changelog</h1>
        <div className={blogIndexStyles.blogPosts}>
          <ChangeLogEntries entries={entries} />
        </div>
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
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 60 seconds
    revalidate: 60,
  };
};
