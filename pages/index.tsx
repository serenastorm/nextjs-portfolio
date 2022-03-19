import { ReactNode } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { GoToLinkIcon } from "assets/icons";
import {
  LandingProjectLinks,
  LandingScreenReaderLink,
} from "components/landing";
import { Page } from "components/shared/Page";
import { routes, apiUrl } from "infrastructure/routes/constants";
import { SnippetLinks } from "components/snippets";

import styles from "styles/Home.module.scss";
import blogIndexStyles from "styles/blog/BlogIndex.module.scss";
import blogStyles from "styles/blog/Blog.module.scss";

const Home: NextPage = ({
  mostRecentPost,
}: {
  children?: ReactNode;
  mostRecentPost?: any;
}) => {
  return (
    <>
      <Head>
        <title>Portfolio | Serena Antonetti</title>
      </Head>
      <Page className={styles.landingPage}>
        {/* ARIA role="text" prevents 'text splitting' in VoiceOver iOS https://axesslab.com/text-splitting/  */}
        <h1 role="text">
          Hi, I’m{" "}
          <LandingScreenReaderLink
            text="Serena,"
            url="https://www.linkedin.com/in/serena-antonetti"
            label="Visit Linkedin profile"
          />{" "}
          a product designer & front-end developer currently based in Edinburgh.
          I recently worked at{" "}
          <LandingScreenReaderLink
            text="Storm&nbsp;Ideas,"
            url="https://stormideas.com/"
            label="Visit Storm Ideas' website"
          />{" "}
          where most of my projects were under{" "}
          <abbr title="Non Disclosure Agreements">NDAs</abbr>, but you can find
          some of my public works below. You can also check out the code for
          this portfolio on my{" "}
          <LandingScreenReaderLink
            text="Github."
            url="https://github.com/serenastorm/nextjs-portfolio"
            label="View source code on Github"
          />{" "}
        </h1>
        <LandingProjectLinks />
        <div className={blogStyles.blog}>
          <div className={styles.landingBlogNav}>
            <h2>Last snippet</h2>
            <span>
              <Link href={routes.blog.snippets.url} passHref>
                <a className={blogIndexStyles.linkWithIcon}>
                  View all snippets{" "}
                  <GoToLinkIcon className={blogIndexStyles.blogGoToLinkIcon} />
                </a>
              </Link>
            </span>
          </div>
          <ul className={blogIndexStyles.blogPosts}>
            <SnippetLinks posts={[{ ...mostRecentPost }]} />
          </ul>
        </div>
      </Page>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const res = await fetch(`${apiUrl}/snippets/last`);
  const mostRecentPost = await res.json();

  return {
    props: {
      mostRecentPost,
    },
  };
}
