import type { CSSProperties } from "react";

import styles from "./ChildDiv.module.scss";

type ChildProps = {
  caption?: string;
  className?: string;
  content?: string;
  color?: "blue" | "pink";
  index?: number;
  style?: CSSProperties;
};

const ChildDiv = ({
  caption,
  className = "",
  content,
  color,
  index,
  style,
}: ChildProps) => {
  return (
    <div
      className={`${styles.childDiv} ${color ? styles[`${color}Text`] : ""} ${className}`}
      data-content={content ? "true" : "false"}
      style={style}
    >
      {index && (
        <>
          &:nth-child(<span className={styles.yellowText}>{index}</span>)
        </>
      )}
      {caption && (
        <span className={color ? styles[`${color}Text`] : ""}>{caption}</span>
      )}
      {content}
    </div>
  );
};

export default ChildDiv;
