import { Link } from "components/shared";
import type { LinkProps } from "helpers/main/types";

import { PROJECTS } from "./constants";

import styles from "./LandingProjectLink.module.scss";

const LandingProjectLink = ({
  label,
  description,
  url,
  isExternal,
}: LinkProps) => (
  <div className={styles.landingProject}>
    <div className={styles.landingProjectImg} />
    <dl>
      <dt>
        <Link href={url} underline={false}>
          {label}
        </Link>
      </dt>
      <dd>{description}</dd>
    </dl>
    <Link
      className={styles.landingProjectLink}
      href={url}
      underline={false}
      tabIndex={-1}
      aria-hidden="true"
      hidden
    ></Link>
  </div>
);

export const LandingProjectLinks = () => {
  return (
    <dl className={styles.landingProjects}>
      {PROJECTS.map((project: LinkProps, projectIndex: number) => (
        <LandingProjectLink {...project} key={project.label} />
      ))}
    </dl>
  );
};
