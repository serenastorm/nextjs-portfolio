import { ReactNode } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { GoToLinkIcon } from "assets/icons";
import {
  LandingProjectLinks,
  LandingFootnoteLink,
  LandingFootnote,
  LandingFootnotes,
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
  const links = [
    {
      label: "Serena,",
      url: "https://www.linkedin.com/in/serena-antonetti",
      description: "LinkedIn Profile",
    },
    {
      label: "Storm Ideas,",
      description: "Storm Ideas' website",
      url: "https://stormideas.com/",
    },
    {
      label: "Github.",
      description: "Source code on Github",
      url: "https://github.com/serenastorm/nextjs-portfolio",
    },
  ];

  const renderTextWithFootnote = (linkIndex: number) => (
    <LandingFootnoteLink text={links[linkIndex].label} linkIndex={linkIndex} />
  );

  return (
    <>
      <Head>
        <title>Portfolio | Serena Antonetti</title>
      </Head>
      <Page className={styles.landingPage}>
        {/* ARIA role="text" prevents 'text splitting' in VoiceOver iOS https://axesslab.com/text-splitting/  */}
        <h1 role="text">
          Hi, I’m {renderTextWithFootnote(0)} a product designer &amp; front-end
          developer currently based in Edinburgh. I recently worked at{" "}
          {renderTextWithFootnote(1)} where most of my projects were under{" "}
          <abbr title="Non Disclosure Agreements">NDAs</abbr>, but you can find
          some of my public works below. You can also check out the code for
          this website on my {renderTextWithFootnote(2)}
        </h1>
        <LandingFootnotes>
          {links.map((link, linkIndex) => (
            <LandingFootnote
              key={link.label}
              linkIndex={linkIndex}
              url={link.url}
              description={link.description}
            />
          ))}
        </LandingFootnotes>
        <LandingProjectLinks />
        <div className={`${blogStyles.blog} ${styles.blogWrapper}`}>
          <h2 className={styles.landingBlogTitle}>Last snippet</h2>
          <ul
            className={`${blogIndexStyles.blogPosts} ${styles.landingBlogPost}`}
          >
            <SnippetLinks posts={[{ ...mostRecentPost }]} />
          </ul>
          <Link href={routes.blog.snippets.url} passHref>
            <a
              className={`${blogIndexStyles.linkWithIcon} ${styles.landingBlogLink}`}
            >
              View all snippets{" "}
              <GoToLinkIcon className={blogIndexStyles.blogGoToLinkIcon} />
            </a>
          </Link>
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
