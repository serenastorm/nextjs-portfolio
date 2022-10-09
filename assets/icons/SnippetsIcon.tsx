import type { SVGAttributes } from "react";

const SnippetsIcon = () => {
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
      {/* <path d="M16 18L22 12 16 6"></path>
      <path d="M8 6L2 12 8 18"></path> */}
      <path d="M13.57 20.354H4.761A1.762 1.762 0 013 18.593V6.262C3 5.289 3.789 4.5 4.762 4.5h14.092c.973 0 1.762.789 1.762 1.762v8.808"></path>
      <path d="M3 8.023h17.616"></path>
      <path d="M5.643 6.27l.008-.01M8.285 6.27l.008-.01M10.927 6.27l.01-.01"></path>
      <path
        d="M20.688 18.034c.435.267.409.918-.04.97l-2.26.255-1.014 2.037c-.201.404-.822.206-.925-.294l-1.105-5.387c-.087-.423.293-.689.66-.463l4.684 2.882z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default SnippetsIcon;
