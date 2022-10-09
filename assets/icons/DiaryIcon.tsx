import type { SVGAttributes } from "react";

const DiaryIcon = () => {
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
      <path d="M5 18.222V5.778C5 4.796 5.796 4 6.778 4h11.91c.296 0 .534.239.534.533v11.658"></path>
      <path d="M15.667 9.138c0 .534-.211 1.048-.588 1.427-.868.875-1.71 1.787-2.61 2.63a.53.53 0 01-.732-.016l-2.593-2.614a2.028 2.028 0 010-2.855 2.024 2.024 0 012.873 0l.094.095.094-.095a2.023 2.023 0 013.462 1.428z"></path>
      <path d="M6.777 16.444h12.445M6.777 20h12.445"></path>
      <path d="M6.778 20a1.778 1.778 0 110-3.556"></path>
    </svg>
  );
};

export default DiaryIcon;
