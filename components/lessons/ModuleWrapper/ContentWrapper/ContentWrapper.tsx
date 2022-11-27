import type { ScrollSectionProps } from "../types";
import type { ReactNode } from "react";

import styles from "./ContentWrapper.module.scss";

type ContentWrapperProps = {
  children: ReactNode;
  title: string;
  scrollSection: ScrollSectionProps;
};

const ContentWrapper = ({
  children,
  title,
  scrollSection,
}: ContentWrapperProps) => {
  return (
    <div
      className={styles.wrapper}
      ref={(el: HTMLDivElement) =>
        (scrollSection.refs.current[`${scrollSection.name}`] = el)
      }
    >
      <h1 id="page-header">{title}</h1>
      {children}
    </div>
  );
};

export default ContentWrapper;
