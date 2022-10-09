import { PreviewCaption } from "components/lessons/Preview";
import { Div } from "components/lessons/Preview/Div";
import { useWindowDimensions } from "infrastructure/hooks";
import { breakpoint } from "components/lessons/Preview/constants";

import styles from "./Preview.module.scss";

const GapPreview = () => {
  const { width: windowWidth } = useWindowDimensions();
  const isDesktop = windowWidth && windowWidth >= breakpoint;
  const gap = 32;

  return (
    <>
      <Div.Parent className={styles.gap}>
        <Div.Child color="blue" className={styles.gapChild} />

        <div className={`${styles.gapDiv} ${styles.pinkText}`}>{gap}px</div>
        <Div.Child color="blue" />

        <div className={`${styles.gapDiv} ${styles.pinkText}`}>{gap}px</div>
        <Div.Child color="blue" className={styles.gapChild} />
        <Div.Child color="blue" className={styles.gapChild} />

        <div className={`${styles.gapDiv} ${styles.pinkText}`}>{gap}px</div>
        <Div.Child color="blue" className={styles.gapChild} />

        <div className={`${styles.gapDiv} ${styles.pinkText}`}>{gap}px</div>
        <Div.Child color="blue" className={styles.gapChild} />
      </Div.Parent>
      <PreviewCaption copy={`gap: ${gap}px;`} />
    </>
  );
};

export default GapPreview;
