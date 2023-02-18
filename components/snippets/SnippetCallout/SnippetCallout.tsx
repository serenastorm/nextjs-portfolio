import styles from "./SnippetCallout.module.scss";

type SnippetCalloutProps = { children: JSX.Element; title?: string };

export const SnippetCallout = ({ children, title }: SnippetCalloutProps) => {
  return (
    <aside className={styles.callout}>
      {title && (
        <p>
          <strong>{title}</strong>
        </p>
      )}
      {children}
    </aside>
  );
};
