import Head from "next/head";
import { LandingProjectLinks } from "components/landing";
import { Page } from "components/shared/Page";
import { fetchMarkdownEntries } from "helpers/blog/api";

import type { NextPage } from "next";
import type { ArticleMetaData } from "components/blog/ArticleWrapper/types";

import styles from "styles/Home.module.scss";

const Home: NextPage<{ mostRecentPost: ArticleMetaData }> = ({
  mostRecentPost,
}) => {
  return (
    <>
      <Head>
        <title>Serena Antonetti | Blog</title>
        <meta name="theme-color" content="#f5f7fb" />
        <meta
          name="theme-color"
          content="#181a1d"
          media="(prefers-color-scheme: dark)"
        />
      </Head>
      <style jsx global>{`
        html {
          background-color: var(--homepage-bg);
        }
      `}</style>
      <Page className={styles.landingPage}>
        <LandingProjectLinks />
      </Page>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const posts = await fetchMarkdownEntries(1);

  return {
    props: {
      mostRecentPost: posts[0],
    },
  };
}
