import { motion } from "framer-motion";
import type { ReactNode } from "react";

import styles from "./SpacingDiv.module.scss";

type SpacingProps = {
  animated?: boolean;
  color?: "blue" | "pink";
  children: ReactNode;
};

const SpacingDiv = ({ animated, color, children }: SpacingProps) => {
  const divClassName = `${styles.spacing} ${color ? styles[`${color}Text`] : ""}`;

  const spacingAnimationProps = {
    initial: {
      opacity: 0,
      maxWidth: 0,
    },
    animate: { opacity: 1, maxWidth: "24rem" },
    exit: { opacity: 0, maxWidth: "12rem" },
    transition: { duration: 0.5 },
  };

  return animated ? (
    <motion.div className={divClassName} {...spacingAnimationProps}>
      {children}
    </motion.div>
  ) : (
    <div className={divClassName}>{children}</div>
  );
};

export default SpacingDiv;
