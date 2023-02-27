import { useEffect, useState } from "react";
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
}: LinkProps) => {
  const [packageDownloads, setPackageDownloads] = useState<number>(0);

  useEffect(() => {
    const getPackageDownloads = async () => {
      const likesRes = await fetch("api/react-native-side-nav-downloads", {
        method: "GET",
      });
      const data = await likesRes.json();

      if (data.downloads) {
        setPackageDownloads(data.downloads);
      }
    };

    getPackageDownloads();
  }, []);

  const isNpmPackage = url.indexOf("react-native-side-nav") >= 0;

  return (
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
            <Link href={url}>
              <a className={styles.landingProjectNewTabLink}>{label}</a>
            </Link>
          )}
        </dt>
        <dd>
          {description}
          {isNpmPackage && packageDownloads > 0 && (
            <span className={styles.landingProjectDownloads}>
              {" "}
              ({packageDownloads} downloads)
            </span>
          )}
        </dd>
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
        <Link href={url}>
          <a
            className={styles.landingProjectLink}
            tabIndex={-1}
            aria-hidden="true"
          />
        </Link>
      )}
    </div>
  );
};

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
