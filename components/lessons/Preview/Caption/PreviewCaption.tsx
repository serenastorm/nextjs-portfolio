import { ReactNode } from "react";
import { motion } from "framer-motion";

import styles from "./PreviewCaption.module.scss";

type PreviewCaptionProps = {
  animated?: boolean;
  copy: string | ReactNode;
  subcopy?: string | ReactNode;
};

const PreviewCaption = ({
  animated = true,
  copy,
  subcopy,
}: PreviewCaptionProps) => {
  const captionAnimationProps = {
    initial: {
      opacity: 0,
    },
    animate: { opacity: 10 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 },
  };

  const returnCopy = ({
    copy,
    className = "",
  }: {
    copy: string;
    className?: string;
  }) => {
    return animated ? (
      <motion.p className={className} {...captionAnimationProps}>
        {copy}
      </motion.p>
    ) : (
      <p className={className}>{copy}</p>
    );
  };

  return (
    <div className={styles.previewCaption}>
      {typeof copy === "string" ? returnCopy({ copy }) : copy}
      {typeof subcopy === "string"
        ? returnCopy({ copy: subcopy, className: styles.subcopy })
        : subcopy}
    </div>
  );
};

export default PreviewCaption;
