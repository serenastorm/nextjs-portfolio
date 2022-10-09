import { ReactNode } from "react";
import { useWindowDimensions } from "infrastructure/hooks";
import { breakpoint } from "components/lessons/Preview/constants";

import styles from "./InlinePreviewWrapper.module.scss";

type InlinePreviewWrapperProps = {
  children: ReactNode;
};

const InlinePreviewWrapper = ({ children }: InlinePreviewWrapperProps) => {
  const { width: windowWidth } = useWindowDimensions();

  const isDesktop = windowWidth && windowWidth >= breakpoint;

  if (isDesktop) {
    return null;
  }

  return <div className={styles.wrapper}>{children}</div>;
};

export default InlinePreviewWrapper;
