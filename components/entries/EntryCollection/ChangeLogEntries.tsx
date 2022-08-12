import { SnippetMarkdown, SnippetPills } from "components/snippets";
import type { ChangeLogResponse } from "infrastructure/blog/types";

import styles from "./SnippetLink.module.scss";
import blogStyles from "styles/blog/Blog.module.scss";

type ChangeLog = ChangeLogResponse & {
  entryIndex: number;
};

export const ChangeLogEntry = ({ fields, sys }: ChangeLog) => {
  const relativeTimeFormatter = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });
  const { date, content, title, tags } = fields;

  const timeDivisions: {
    amount: number;
    name: Intl.RelativeTimeFormatUnit;
  }[] = [
    { amount: 60, name: "seconds" },
    { amount: 60, name: "minutes" },
    { amount: 24, name: "hours" },
    { amount: 7, name: "days" },
    { amount: 4.34524, name: "weeks" },
    { amount: 12, name: "months" },
    { amount: Number.POSITIVE_INFINITY, name: "years" },
  ];

  const formatRelativeTime = (date: Date) => {
    let duration = (date.getTime() - new Date().getTime()) / 1000;

    for (let i = 0; i <= timeDivisions.length; i++) {
      const division = timeDivisions[i];
      if (Math.abs(duration) < division.amount) {
        return relativeTimeFormatter.format(
          Math.round(duration),
          division.name
        );
      }
      duration /= division.amount;
    }
  };

  return (
    <li className={blogStyles.blogPost}>
      <h3 className={styles.blogPostTitle}>{title}</h3>

      {content && <SnippetMarkdown content={content} />}

      <div
        className={`${blogStyles.blogArticleMeta} ${styles.blogArticleMeta}`}
      >
        <time dateTime={new Date(date).toISOString()}>
          {formatRelativeTime(new Date(date))}
        </time>
        <div className={styles.blogArticleTags}>
          {tags && <SnippetPills types={tags} asLinks={false} />}
        </div>
      </div>
    </li>
  );
};

const ChangeLogEntries = ({
  entries,
}: {
  entries: ChangeLogResponse[] | null;
}) => {
  if (!entries) {
    return <li className={blogStyles.blogPost}>No recent changes to show.</li>;
  }
  return (
    <>
      {entries.map((entry: ChangeLogResponse, entryIndex: number) => (
        <ChangeLogEntry entryIndex={entryIndex} key={entry.sys.id} {...entry} />
      ))}
    </>
  );
};

export default ChangeLogEntries;
