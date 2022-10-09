import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

import styles from "./ParentDiv.module.scss";

type ParentProps = {
  animated?: boolean;
  className?: string;
  children: ReactNode;
  layout?: boolean;
  style?: CSSProperties;
};

const ParentDiv = ({
  animated = true,
  className = "",
  children,
  layout = true,
  style,
}: ParentProps) => {
  const parentDivProps = {
    className: `${styles.parentDiv} ${className}`,
    "data-name": "parent",
    style,
  };

  const previewAnimationProps = {
    initial: {
      opacity: 0,
      y: "5%",
    },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "-5%" },
    transition: { duration: 0.5 },
  };

  return animated ? (
    <motion.div layout={layout} {...previewAnimationProps} {...parentDivProps}>
      {children}
    </motion.div>
  ) : (
    <div {...parentDivProps}>{children}</div>
  );
};

export default ParentDiv;
