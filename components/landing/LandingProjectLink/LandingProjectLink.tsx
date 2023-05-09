import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  easeInOut,
  useScroll,
  useTransform,
  useVelocity,
  type MotionValue,
} from "framer-motion";
import { Link } from "components/shared";
import { ArrowIcon } from "assets/icons";
import type {
  LandingProject as LandingProjectType,
  LandingFooterProject,
} from "./types";

import {
  PROJECTS,
  FOOTER_PROJECTS,
  FOOTER_PROJECTS_TYPES,
  FOOTER_PROJECTS_TYPES_LABELS,
} from "./constants";

import styles from "./LandingProjectLink.module.scss";

const LandingFooterProjectLink = ({
  title,
  description,
  url,
  year,
  type,
}: LandingFooterProject) => (
  <tr>
    <td className={styles.landingProjectDate}>
      <p>{year}</p>
    </td>
    <td className={styles.landingProjectDescription}>
      <Link href={url} underline={false} showArrow>
        {title}
      </Link>
      <p>{description}</p>
    </td>
  </tr>
);

// function useParallax(
//   value: MotionValue<number>,
//   distance: [number | string, number | string]
// ) {
//   return useTransform(value, [0, 1], distance, {
//     ease: easeInOut,
//   });
// }

const LandingProject = ({ title, description, slug }: LandingProjectType) => {
  const projectRef = useRef<HTMLElement | null>(null);
  const { scrollY, scrollYProgress } = useScroll({
    target: projectRef,
    offset: ["start 100vh", "end 0vh"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"], {
    ease: easeInOut,
  });

  const scrollYProgressVelocity = useVelocity(scrollYProgress);
  const skewY = useTransform(
    scrollYProgressVelocity,
    [0, 1],
    ["0deg", "4deg"],
    {
      ease: easeInOut,
    }
  );

  return (
    <article className={styles.landingProject} ref={projectRef} key={slug}>
      <motion.div style={{ y, skewY }} className={styles.landingProjectImage}>
        <Image
          src={`/work/${slug}/${slug}-preview.jpg`}
          alt=""
          width={640}
          height={800}
        />
      </motion.div>

      <div className={styles.landingProjectDescription}>
        <p>{description}</p>
        <Link href={`/work/${slug}`} underline={false} showArrow>
          {title}
        </Link>
      </div>
    </article>
  );
};

export const LandingProjectLinks = () => {
  const categories = FOOTER_PROJECTS_TYPES.map((type) => {
    const filteredFooterProjects = FOOTER_PROJECTS.filter(
      (project) => project.type === type
    );

    return {
      label: FOOTER_PROJECTS_TYPES_LABELS[type],
      projects: filteredFooterProjects,
      slug: type,
    };
  });

  return (
    <>
      <article className={styles.landingProjectsGrid}>
        <div className={styles.landingProjectsCopy}>
          <p className={styles.landingPageIntro}>
            Hi, I’m <span className={styles.landingPageName}>Serena</span>
          </p>
          <p>
            <i>noun</i>
          </p>
          <ol>
            <li>product designer</li>
            <li>front-end developer</li>
            <li>educator</li>
          </ol>
        </div>
        <p className={styles.landingPageScroll}>
          Scroll down to see my work <ArrowIcon direction="down" />
        </p>
        {PROJECTS.map((project) => (
          <LandingProject {...project} key={project.title} />
        ))}
      </article>
      {categories.map((category) => (
        <table key={category.slug} className={styles.landingProjectsTable}>
          <caption>{category.label}</caption>
          <thead className="screenReaderText">
            <tr>
              <th>Date</th>
              <th>Information</th>
            </tr>
          </thead>
          <tbody>
            {category.projects.map((project) => (
              <LandingFooterProjectLink {...project} key={project.title} />
            ))}
          </tbody>
        </table>
      ))}
    </>
  );
};
