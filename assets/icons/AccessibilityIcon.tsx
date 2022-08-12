import { SVGAttributes } from "react";

const AccessibilityIcon = () => {
  const svgProps = {
    width: "24",
    height: "24",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as SVGAttributes<SVGSVGElement>["strokeLinecap"],
    strokeLinejoin: "round" as SVGAttributes<SVGSVGElement>["strokeLinejoin"],
    strokeWidth: "1.5",
    viewBox: "0 0 24 24",
  };

  return (
    <svg {...svgProps} role="presentation">
      <path d="M12.5 21a8.5 8.5 0 100-17 8.5 8.5 0 000 17zM8.25 9.95l4.25.85m4.25-.85l-4.25.85m0 0v2.55m0 0l-1.7 4.25m1.7-4.25l1.7 4.25"></path>
      <path d="M12.5 8.25a.425.425 0 110-.85.425.425 0 010 .85z"></path>
    </svg>
  );
};

export default AccessibilityIcon;
