import { useState } from "react";
import { Div } from "components/lessons/Preview/Div";

import styles from "./Preview.module.scss";

const OrderPreview = () => {
  const [withBreakpoint, setWithBreakpoint] = useState<boolean>(false);

  return (
    <>
      <Div.Parent
        className={styles.order}
        layout={false}
        style={{
          gap: "12px",
          maxWidth: withBreakpoint ? "24rem" : "initial",
          flexDirection: withBreakpoint ? "column" : "row",
        }}
      >
        <Div.Child
          color="blue"
          className={styles.orderChild}
          content="Cats go for world domination stare out the window if human is on laptop sit on the keyboard."
          style={withBreakpoint ? {} : { order: 1 }}
        />
        <Div.Child
          color="blue"
          style={withBreakpoint ? {} : { order: 0 }}
          className={styles.orderChild}
        />
      </Div.Parent>
      <div className={styles.previewActions}>
        <button
          onClick={() => setWithBreakpoint(true)}
          disabled={withBreakpoint}
        >
          {`Screen < 600px`}
        </button>
        <button
          onClick={() => setWithBreakpoint(false)}
          disabled={!withBreakpoint}
        >
          {`Screen >= 600px`}
        </button>
      </div>
    </>
  );
};

export default OrderPreview;
