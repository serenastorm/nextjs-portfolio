import { SVGAttributes } from "react";

const HomeIcon = () => {
  const svgProps = {
    width: "24",
    height: "24",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as SVGAttributes<SVGSVGElement>["strokeLinecap"],
    strokeLinejoin: "round" as SVGAttributes<SVGSVGElement>["strokeLinejoin"],
    strokeWidth: "2",
    viewBox: "0 0 24 24",
  };

  return (
    <svg {...svgProps} role="presentation">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
      <path d="M9 22L9 12 15 12 15 22"></path>
    </svg>
  );
};

export default HomeIcon;
