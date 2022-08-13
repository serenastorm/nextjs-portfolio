import { SVGAttributes } from "react";

const ChangelogIcon = () => {
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
      <path d="M14.845 16.09l.727-1.542a.25.25 0 01.456 0l.728 1.543 1.626.248c.209.032.292.3.14.455l-1.176 1.2.278 1.694c.035.218-.183.384-.37.28l-1.454-.8-1.455.8c-.186.104-.404-.063-.369-.28l.278-1.695-1.177-1.2c-.15-.153-.068-.422.141-.454l1.627-.248z"></path>
      <path d="M17.8 12V6.999a.48.48 0 00-.14-.34l-2.52-2.518A.48.48 0 0014.801 4H5.48a.48.48 0 00-.48.48v15.04c0 .265.215.48.48.48h5.12"></path>
      <path d="M14.6 6.72V4.283a.283.283 0 01.482-.2l2.635 2.634a.283.283 0 01-.2.483H15.08a.48.48 0 01-.48-.48z"></path>
    </svg>
  );
};

export default ChangelogIcon;
