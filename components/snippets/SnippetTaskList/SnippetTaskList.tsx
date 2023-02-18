import styles from "./SnippetTaskList.module.scss";

type SnippetTaskListProps = { items: string[] };

export const SnippetTaskList = ({ items }: SnippetTaskListProps) => {
  return (
    <ul className={styles.taskList}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};
