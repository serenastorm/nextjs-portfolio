const GoToLinkIcon = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      width="512"
      height="512"
      fill="none"
      viewBox="0 0 512 512"
      className={className}
    >
      <path
        fill="#000"
        fillRule="evenodd"
        d="M335.811 237.626l-.018-.018v.018H126.561a7.545 7.545 0 00-7.467 7.427v17.376c0 4.349 3.098 7.447 7.447 7.447h209.885l-38.583 38.568-57.869 58.245a6.215 6.215 0 00-2.224 3.893 7.735 7.735 0 002.224 6.652l12.412 11.797c2.482 3.098 7.447 3.098 10.565 0l129.717-129.678a7.142 7.142 0 002.332-5.282 7.144 7.144 0 00-2.332-5.283L262.971 119.091a7.84 7.84 0 00-5.601-2.324 6.353 6.353 0 00-5.004 2.324l-12.412 11.796c-3.098 3.098-3.098 8.062 0 10.545l96.234 96.194h-.377z"
        clipRule="evenodd"
      ></path>
      <circle cx="256" cy="256" r="226" stroke="#000" strokeWidth="32"></circle>
      <style jsx>{`
        circle {
          stroke: currentColor;
          transition: stroke-dashoffset 500ms ease;
          stroke-dasharray: 1500;
          stroke-dashoffset: 1500;
        }
      `}</style>
    </svg>
  );
};

export default GoToLinkIcon;
