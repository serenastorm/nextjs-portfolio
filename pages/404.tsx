import Link from "next/link";
import Head from "next/head";
import { SnippetPills } from "components/snippets";
import { Page } from "components/shared/Page";

import styles from "styles/Error.module.scss";

const Custom404 = () => {
  const tags = ["accessibility", "tsx", "jsx", "react", "html", "css", "scss"];

  return (
    <>
      <Head>
        <title>Not found</title>
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Page className={styles.errorPage}>
        <h1>This page could not be found.</h1>
        <p>
          Browse code snippets below, or{" "}
          <Link href="/" passHref>
            <a className="underline-link">go back to the homepage.</a>
          </Link>
        </p>
        <SnippetPills types={tags} />
      </Page>
    </>
  );
};

export default Custom404;
