import Link from "next/link";
import { NewTabLink } from "components/shared";
import type { LinkProps } from "helpers/main/types";

import { projects } from "./constants";

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
        {isExternal ? (
          <NewTabLink
            copy={label}
            to={url}
            shouldOpenInNewTab
            withUnderline={false}
            className={styles.landingProjectNewTabLink}
          />
        ) : (
          <Link href={url} className={styles.landingProjectNewTabLink}>
            {label}
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
      <Link
        href={url}
        className={styles.landingProjectLink}
        tabIndex={-1}
        aria-hidden="true"
      />
    )}
  </div>
);

const LandingProjectLinks = () => {
  return (
    <dl className={styles.landingProjects}>
      {projects.map((project: LinkProps, projectIndex: number) => (
        <LandingProjectLink {...project} key={project.label} />
      ))}
    </dl>
  );
};

export default LandingProjectLinks;
