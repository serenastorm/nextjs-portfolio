import styles from "./AxisDiv.module.scss";

type AxisProps = {
  axis?: "x" | "y";
  className?: string;
  opacity?: number;
};

const AxisDiv = ({ axis = "x", className = "", opacity = 0.8 }: AxisProps) => {
  return (
    <div
      className={`${styles.axis} ${className}`}
      data-axis={axis}
      style={{ opacity }}
    />
  );
};

export default AxisDiv;
