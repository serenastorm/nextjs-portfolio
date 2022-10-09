import { ReactNode } from "react";
import { ScrollSectionProps } from "components/lessons/ModuleWrapper/types";

import styles from "./Tips.module.scss";

type TipsProps = {
  content: string | ReactNode;
  title?: string;
  type?: "accessibility" | "default";
  scrollSection?: ScrollSectionProps;
};

const Tips = ({
  content,
  type = "default",
  title,
  scrollSection,
}: TipsProps) => {
  const scrollSectionProps = scrollSection
    ? {
        ref: (el: HTMLDivElement) =>
          (scrollSection.refs.current[`${scrollSection.name}`] = el),
      }
    : {};

  const getTipTitle = () => {
    switch (type) {
      case "default":
        return "Tip";
      case "accessibility":
        return "Accessibility note";
    }
  };

  return (
    <div className={styles.tip} data-tip={type} {...scrollSectionProps}>
      <h3>{title || getTipTitle()}</h3>
      {typeof content === "string" ? <p>{content}</p> : content}
    </div>
  );
};

export default Tips;
