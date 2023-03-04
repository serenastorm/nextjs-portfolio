import Head from "next/head";
import { Link, Page } from "components/shared";

import blogStyles from "styles/blog/Blog.module.scss";

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
      <Page className={blogStyles.blog} type="blog">
        <h1 className={blogStyles.blogIndexTitle}>Accessibility</h1>
        <div className={blogStyles.blogPost}>
          <p>
            The web should be accessible to everyone. If your accessibility
            requirements are not met, please{" "}
            <Link
              href="https://github.com/serenastorm/nextjs-portfolio/issues"
              underline={false}
            >
              open an issue on Github.
            </Link>
          </p>
        </div>
      </Page>
    </>
  );
};

export default Accessibility;
