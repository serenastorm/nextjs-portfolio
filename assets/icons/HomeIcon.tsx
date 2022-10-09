import type { SVGAttributes } from "react";

const HomeIcon = () => {
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
      {/* <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
      <path d="M9 22L9 12 15 12 15 22"></path> */}
      <path d="M4 9.194L12.5 4 21 9.194M19.111 12.5v6.044a.567.567 0 01-.567.567H6.457a.567.567 0 01-.567-.567V12.5"></path>
      <path d="M12.974 8.845l1.935.502c.25.065.426.29.417.549-.157 4.712-2.826 5.437-2.826 5.437s-2.67-.725-2.826-5.437a.552.552 0 01.417-.55l1.935-.5c.31-.081.637-.081.948 0z"></path>
    </svg>
  );
};

export default HomeIcon;
