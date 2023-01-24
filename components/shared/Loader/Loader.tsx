import styles from "./Loader.module.scss";

export const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader} />
      <p aria-live="polite" aria-busy="true">
        Loading...
      </p>
    </div>
  );
};
