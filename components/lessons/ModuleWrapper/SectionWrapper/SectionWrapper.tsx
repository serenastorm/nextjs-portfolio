import { ReactNode } from "react";
// import { useLocation } from "react-router-dom";
import { ScrollSectionProps } from "../types";
// import { BookmarksButton } from "components/lessons/Bookmarks";

import styles from "./SectionWrapper.module.scss";

type SectionWrapperProps = {
  children: ReactNode;
  title: string;
  scrollSection?: ScrollSectionProps;
};

const SectionWrapper = ({
  children,
  title,
  scrollSection,
}: SectionWrapperProps) => {
  // const { pathname } = useLocation();

  const scrollSectionProps = scrollSection
    ? {
        ref: (el: HTMLElement) =>
          (scrollSection.refs.current[`${scrollSection.name}`] = el),
      }
    : {};
  const id = title.replace(/\s+/g, "-").toLowerCase();
  // const sectionUrl = `${pathname}#${id}`;

  return (
    <section className={styles.wrapper} {...scrollSectionProps}>
      {/* <BookmarksButton /> */}
      <h2 id={id}>{title}</h2>
      {children}
    </section>
  );
};

export default SectionWrapper;
