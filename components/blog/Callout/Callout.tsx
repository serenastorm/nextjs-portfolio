import { InfoIcon } from "assets/icons";
import styles from "./Callout.module.scss";

type CalloutProps = { children: JSX.Element; title?: string };

export const Callout = ({ children, title }: CalloutProps) => {
  return (
    <aside className={styles.callout}>
      <div className={styles.icon}>
        <InfoIcon />
      </div>
      {title && (
        <p>
          <strong>{title}</strong>
        </p>
      )}
      {children}
    </aside>
  );
};
