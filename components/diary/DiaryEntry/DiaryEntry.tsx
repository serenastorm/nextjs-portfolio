import { formatRelativeTime } from "helpers/blog";
import { StatHeartIcon } from "assets/diary/icons";

import type { ReactNode } from "react";

import styles from "./DiaryEntry.module.scss";
import diaryImageStyles from "styles/diary/DiaryImage.module.scss";

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
          <time dateTime={date.toISOString()}>{formatRelativeTime(date)}</time>
        </div>
        <div className={styles.entryContent}>{children}</div>
      </article>
    </div>
  );
};

export const DiaryEntryStat = ({
  label,
  score,
}: {
  label: string;
  score: number;
}) => {
  const renderHeartIcons = (): JSX.Element => {
    let hearts = [];

    for (var i = 0; i < 5; i++) {
      hearts.push(<StatHeartIcon filled={i <= score - 1} key={`icon${i}`} />);
    }

    return <>{hearts}</>;
  };

  return (
    <li>
      <span className={styles.statLabel}>{label}</span>
      <span className="screenReaderText">{score}/5</span>
      <span className={styles.statIcons}>{renderHeartIcons()}</span>
    </li>
  );
};

export default DiaryEntry;
