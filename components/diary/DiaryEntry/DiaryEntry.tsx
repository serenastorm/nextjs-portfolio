import { ReactNode } from "react";

import { formatRelativeTime } from "helpers/blog";
import { StatHeartIcon } from "assets/diary/icons";

import styles from "./DiaryEntry.module.scss";
import diaryImageStyles from "styles/diary/DiaryImage.module.scss";

export const DiaryEntryStat = ({
  label,
  score,
}: {
  label: string;
  score: number;
}) => {
  const renderIcons = () => {
    let iconsToRender = [];

    for (var i = 0; i < 5; i++) {
      iconsToRender.push(<StatHeartIcon filled={i <= score - 1} key={`icon${i}`} />);
    }

    return <>{iconsToRender}</>;
  };

  return (
    <li>
      <span className={styles.statLabel}>{label}</span>
      <span className="screenReaderText">{score}/5</span>
      <span className={styles.statIcons}>{renderIcons()}</span>
    </li>
  );
};

const DiaryEntry = ({
  date,
  children,
  type,
}: {
  date: Date;
  children: ReactNode;
  type: string;
}) => {
  return (
    <div className={styles.entryWrapper}>
      <div
        className={`${styles.entryProfilePicture} ${diaryImageStyles.profilePicture} ${diaryImageStyles.overlayImg}`}
      />
      <article
        className={`${styles.entry} ${styles[`${type.toLowerCase()}Entry`]}`}
      >
        <div className={styles.entryHeader}>
          <h2>{type}</h2>
          <time dateTime={new Date(date).toISOString()}>
            {formatRelativeTime(new Date(date))}
          </time>
        </div>
        <div className={styles.entryContent}>{children}</div>
      </article>
    </div>
  );
};

export default DiaryEntry;
