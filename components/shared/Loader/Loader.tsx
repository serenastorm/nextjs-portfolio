import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <p role="alert" aria-busy="true" className="screenReaderText">
        Loading...
      </p>
    </div>
  );
};

export default Loader;
