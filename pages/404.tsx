import Head from "next/head";
import { Link } from "components/shared";
import { Tags } from "components/blog";
import { Page } from "components/shared/Page";

const Custom404 = () => {
  const tags = ["accessibility", "tsx", "js", "html", "css", "scss"];

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
      <Page type="error">
        <h1>This page could not be found.</h1>
        <p>
          Browse code snippets below, or{" "}
          <Link href="/">go back to the homepage.</Link>
        </p>
        <Tags types={tags} />
      </Page>
    </>
  );
};

export default Custom404;
