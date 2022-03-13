import { ReactNode, useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";
// import { serialize } from "next-mdx-remote/serialize";
// import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Head from "next/head";
import Image from "next/image";
import { GoToLinkIcon } from "assets/icons";
import { SandpackWrapper } from "components/snippets";
import { LandingScreenReaderLink } from "components/landing";
import { Page } from "components/shared/Page";
import { projectLinks } from "./constants";
import { AnimatedLinkProps, LinkProps, ScreenReaderLinkProps } from "./types";
import { routes, apiUrl } from "infrastructure/routes/constants";
import { BlogArticleLink } from "components/snippets";

import styles from "styles/Home.module.scss";
import blogIndexStyles from "styles/blog/BlogIndex.module.scss";
import blogStyles from "styles/blog/Blog.module.scss";
import { NewTabLink } from "components/shared";

const ProjectLink = ({
  animationDelay,
  label,
  description,
  url,
  isExternal,
}: AnimatedLinkProps) => (
  <div className={styles.landingProject}>
    <div className={styles.landingProjectImg} />
    <dl>
      <dt>
        {isExternal ? (
          <NewTabLink
            copy={label}
            to={url}
            shouldOpenInNewTab
            withUnderline={false}
            className={styles.landingProjectNewTabLink}
          />
        ) : (
          <Link href={url} passHref>
            <a className={styles.landingProjectNewTabLink} tabIndex={-1} aria-hidden="true">
              {label}
            </a>
          </Link>
        )}
      </dt>
      <dd>{description}</dd>
    </dl>
    {isExternal ? (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a
        href={url}
        target="blank"
        rel="noopener noreferrer"
        className={styles.landingProjectLink}
        tabIndex={-1}
        aria-hidden="true"
      />
    ) : (
      <Link href={url} passHref>
        <a
          className={styles.landingProjectLink}
          tabIndex={-1}
          aria-hidden="true"
        />
      </Link>
    )}
  </div>
);

const Home: NextPage = ({
  mostRecentPost,
}: {
  children?: ReactNode;
  // source?: MDXRemoteSerializeResult;
  mostRecentPost?: any;
}) => {
  // console.log("markdown", source);

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
            url="https://github.com/serenastorm/react-portfolio"
            label="View source code on Github"
          />{" "}
        </h1>
        <dl className={styles.landingProjects}>
          {projectLinks.map((project: LinkProps, projectIndex: number) => (
            <ProjectLink
              {...project}
              key={project.label}
              animationDelay={(projectIndex + 1) * 0.1}
            />
          ))}
        </dl>
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
            <BlogArticleLink
              posts={[{ ...mostRecentPost }]}
              isLoading={!mostRecentPost}
              isEmpty={!mostRecentPost}
            />
          </ul>
        </div>
      </Page>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  // const res = await fetch();
  // const markdown = await res.text();
  // const mdxSource = await serialize(markdown);
  // console.log("mdxSource", mdxSource);

  const res = await fetch(`${apiUrl}/snippets/last`);
  const mostRecentPost = await res.json();

  return {
    props: {
      mostRecentPost,
    },
  };
}
