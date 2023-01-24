import Head from "next/head";
import { Link } from "components/shared";
import { SnippetTags } from "components/snippets";
import { Page } from "components/shared/Page";

import styles from "styles/Error.module.scss";

const Custom404 = () => {
  const tags = ["accessibility", "tsx", "jsx", "react", "html", "css", "scss"];

  return (
    <>
      <Head>
        <title>Not found</title>
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="theme-color"
          content="#181a1d"
          media="(prefers-color-scheme: dark)"
        />
      </Head>
      <Page className={styles.errorPage}>
        <h1>This page could not be found.</h1>
        <p>
          Browse code snippets below, or{" "}
          <Link href="/" label="go back to the homepage." />
        </p>
        <SnippetTags types={tags} />
      </Page>
    </>
  );
};

export default Custom404;
