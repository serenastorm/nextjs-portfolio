import { NewTabLink } from "components/shared";
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
        <NewTabLink label={label} href={url} underline={false} />
      </dt>
      <dd>{description}</dd>
    </dl>
    <NewTabLink
      className={styles.landingProjectLink}
      label=""
      href={url}
      underline={false}
      tabIndex={-1}
      aria-hidden="true"
    />
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
