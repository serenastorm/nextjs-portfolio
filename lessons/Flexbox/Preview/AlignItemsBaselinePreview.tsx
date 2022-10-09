import { Div } from "components/lessons/Preview/Div";

import styles from "./Preview.module.scss";

const AlignItemsBaselinePreview = () => {
  return (
    <Div.Parent className={styles.alignItemsBaseline} animated={false}>
      <Div.Axis axis="x" className={styles.alignItemsBaselineAxis} />
      <Div.Child
        color="blue"
        content="A"
        className={styles.alignItemsBaselineChild}
      />
      <Div.Child
        color="blue"
        content="B"
        className={styles.alignItemsBaselineChild}
      />
      <Div.Child
        color="blue"
        content="C"
        className={styles.alignItemsBaselineChild}
      />
      <Div.Child
        color="blue"
        content="q"
        className={styles.alignItemsBaselineChild}
      />
    </Div.Parent>
  );
};

export default AlignItemsBaselinePreview;
