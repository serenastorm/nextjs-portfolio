import fs from "fs";
import path from "path";
import Image from "next/image";
import Head from "next/head";
import { Link, Page } from "components/shared";
import { PROJECTS } from "components/landing/LandingProjectLink/constants";

import type { LandingProject } from "components/landing/LandingProjectLink/types";

import blogStyles from "styles/blog/Blog.module.scss";
import styles from "styles/blog/Project.module.scss";

const Work = ({
  files,
  slug,
  title,
  nextProject,
}: {
  files: string[];
  slug: string;
  title?: string;
  nextProject: LandingProject;
}) => {
  return (
    <>
      <Head>
        <title>Work | Serena Antonetti</title>
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="theme-color"
          content="#181a1d"
          media="(prefers-color-scheme: dark)"
        />
      </Head>
      <Page className={blogStyles.blog} type="project">
        {title && <h1 className={blogStyles.blogIndexTitle}>{title}</h1>}
        <div className={styles.projectFiles}>
          {files.map((fileSource, fileIndex) => (
            <div className={styles.projectFile} key={fileSource}>
              <Image
                src={`/work/${slug}/${fileSource}`}
                priority={fileIndex < 3}
                alt=""
                width={2000}
                height={1352}
              />
            </div>
          ))}
        </div>
        <footer className={styles.projectFooter}>
          <p>
            Next project
            <br />
            <Link
              href={`/work/${nextProject.slug}`}
              underline={false}
              showArrow
              // We need to add a key to reset focus on route change
              key={`next-${nextProject.slug}`}
            >
              {nextProject.title}
            </Link>
          </p>
        </footer>
      </Page>
    </>
  );
};

export default Work;

export async function getStaticPaths() {
  const folderSlugs = fs
    .readdirSync(path.join(process.cwd(), "public", "work"), {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => {
      return {
        params: {
          slug: dirent.name,
        },
      };
    });

  return {
    paths: folderSlugs,
    fallback: false,
  };
}

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const filesInFolder = fs
    .readdirSync(path.join(process.cwd(), "public", "work", slug), {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isFile)
    .map((file) => file.name)
    .filter(
      (fileName) =>
        (fileName.endsWith(".jpg") || fileName.endsWith(".png")) &&
        !fileName.endsWith("preview.jpg")
    );

  const projectIndex = PROJECTS.findIndex((project) => project.slug === slug);
  const nextProjectIndex =
    projectIndex === PROJECTS.length - 1 ? 0 : projectIndex + 1;

  return {
    props: {
      files: filesInFolder,
      slug,
      title: PROJECTS[projectIndex]?.title,
      nextProject: PROJECTS[nextProjectIndex],
    },
  };
}
