import { Link } from "components/shared";
import type { LinkProps } from "helpers/main/types";

import { PROJECTS } from "./constants";

import styles from "./LandingProjectLink.module.scss";

const LandingProjectLink = ({ label, description, url }: LinkProps) => (
  <li className={styles.landingProject}>
    <div className={styles.landingProjectImg} />
    <div className={styles.landingProjectDescription}>
      <Link href={url} underline={false}>
        {label}
      </Link>
      <p>{description}</p>
    </div>
    <Link
      className={styles.landingProjectLink}
      href={url}
      underline={false}
      tabIndex={-1}
      aria-hidden="true"
      hidden
    ></Link>
  </li>
);

export const LandingProjectLinks = () => {
  return (
    <ul
      className={styles.landingProjects}
      role="list"
      aria-label="Side projects"
    >
      {PROJECTS.map((project: LinkProps) => (
        <LandingProjectLink {...project} key={project.label} />
      ))}
    </ul>
  );
};
