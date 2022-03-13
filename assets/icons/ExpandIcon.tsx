type ExpandIconProps = { className?: string; direction?: "down" | "up" };

const ExpandIcon = ({
  className = "",
  direction = "down",
}: ExpandIconProps) => {
  return (
    <svg
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      width="512"
      height="512"
      fill="none"
      viewBox="0 0 512 512"
      className={`caret ${className}`}
      data-direction={direction}
    >
      <path
        fill="#000"
        fillRule="evenodd"
        d="M286.166 291.706v.732l177.152-177.226c4.571-5.705 13.714-5.705 19.419 0l21.724 22.858a11.694 11.694 0 014.279 9.216 14.447 14.447 0 01-4.279 10.313L265.613 396.447a13.174 13.174 0 01-9.728 4.294 13.173 13.173 0 01-9.728-4.294L7.345 157.562c-5.705-5.742-5.705-14.884 0-19.456l21.724-22.857a14.264 14.264 0 0112.251-4.096 11.448 11.448 0 017.168 4.096l107.264 106.569 90.442 90.478a13.164 13.164 0 0019.455 0l20.554-20.59h-.037z"
        clipRule="evenodd"
      ></path>
      <style jsx>{`
        .caret {
          transition: transform 250ms ease;
          will-change: transform;
        }

        .caret[data-direction="down"] {
          transform: rotate(0deg);
        }

        .caret[data-direction="up"] {
          transform: rotate(180deg);
        }
      `}</style>
    </svg>
  );
};

export default ExpandIcon;
