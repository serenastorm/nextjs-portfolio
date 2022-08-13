import { SnippetMarkdown, SnippetPills } from "components/snippets";
import { formatRelativeTime } from "helpers/blog";
import type { ChangeLogResponse } from "infrastructure/blog/types";

import styles from "./SnippetLink.module.scss";
import blogStyles from "styles/blog/Blog.module.scss";

type ChangeLog = ChangeLogResponse & {
  entryIndex: number;
};

export const ChangeLogEntry = ({ fields, sys }: ChangeLog) => {
  const { date, content, title, tags } = fields;

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
