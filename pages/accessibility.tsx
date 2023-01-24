import Head from "next/head";
import { Page } from "components/shared/Page";
import { Link } from "components/shared";

import styles from "styles/Accessibility.module.scss";
import blogStyles from "styles/blog/Blog.module.scss";
import blogPageStyles from "styles/blog/BlogPage.module.scss";

const Accessibility = () => {
  return (
    <>
      <Head>
        <title>Accessibility | Serena Antonetti</title>
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="theme-color"
          content="#181a1d"
          media="(prefers-color-scheme: dark)"
        />
      </Head>
      <Page
        className={`${blogStyles.blog} ${blogPageStyles.blogPage} ${styles.accessibilityPage}`}
      >
        <h1 className={blogStyles.blogIndexTitle}>Accessibility</h1>
        <div className={blogStyles.blogPost}>
          <p>
            The web should be accessible to everyone. If your accessibility
            requirements are not met, please{" "}
            <Link
              label="open an issue on Github."
              href="https://github.com/serenastorm/nextjs-portfolio/issues"
              underline={false}
            />
          </p>
        </div>
      </Page>
    </>
  );
};

export default Accessibility;
