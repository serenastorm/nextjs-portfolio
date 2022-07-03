import Link from "next/link";
import Head from "next/head";

import { Page } from "components/shared/Page";

import styles from "styles/Accessibility.module.scss";
import { NewTabLink } from "components/shared";

import blogArticleStyles from "styles/blog/BlogArticle.module.scss";

const Accessibility = () => {
  return (
    <>
      <Head>
        <title>Accessibility</title>
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Page className={styles.accessibilityPage}>
        <h1>Accessibility</h1>
        <p>
          The web should be accessible to everyone. If your accessibility
          requirements are not met, please{" "}
          <NewTabLink
            copy="open an issue on Github."
            to="https://github.com/serenastorm/nextjs-portfolio/issues"
            shouldOpenInNewTab
            className={`medium ${blogArticleStyles.newTabLink}`}
            withUnderline={false}
          />
        </p>
      </Page>
    </>
  );
};

export default Accessibility;
