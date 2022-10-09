import { ReactNode } from "react";
import { ScrollProgress } from "components/lessons/Preview";

import styles from "./PreviewWrapper.module.scss";

type PreviewWrapperProps = {
  children: ReactNode;
};

const PreviewWrapper = ({ children }: PreviewWrapperProps) => {
  return (
    <div className={styles.wrapper}>
      <ScrollProgress className={styles.backButton} />
      {children}
    </div>
  );
};

export default PreviewWrapper;
