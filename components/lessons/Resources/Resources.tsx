import { ReactNode } from "react";
// import { BookmarksButton } from "components/lessons/Bookmarks";
// import { FavouritesButton } from "components/lessons/Favourites";
import { FavouriteIcon, SaveIcon } from "assets/lessons/icons";

import styles from "./Resources.module.scss";

type ResourceProps = {
  label: string;
  link: string;
};

const Resource = ({ label, link }: ResourceProps) => {
  return (
    <li className={styles.resource}>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.button}
      >
        <div className={styles.icon}>
          <FavouriteIcon />
        </div>
        {label}
      </a>
    </li>
  );
};

const Resources = ({ resources }: { resources: ResourceProps[] }) => {
  return (
    <div className={styles.resources}>
      <h3>Resources</h3>
      <ul>
        {resources.map((resource) => (
          <Resource key={resource.label} {...resource} />
        ))}
      </ul>
    </div>
  );
};

export default Resources;
