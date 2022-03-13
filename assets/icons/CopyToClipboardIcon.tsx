const CopyToClipboardIcon = ({ copied }: { copied?: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      width="512"
      height="512"
      fill="none"
      viewBox="0 0 512 512"
      aria-hidden="true"
    >
      <path
        data-layer="clipboard"
        stroke="#6272A4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="34"
        d="M383.5 128l.5-24a56.159 56.159 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24"
      ></path>
      {copied ? (
        <>
          <path
            data-layer="clipboard-fill"
            fill="#6272A4"
            fillRule="evenodd"
            d="M145 185c0-22.091 17.909-40 40-40h222c22.091 0 40 17.909 40 40v81.214l19.032-21.752L481 227.356V185c0-40.869-33.131-74-74-74H185c-40.869 0-74 33.131-74 74v222c0 40.869 33.131 74 74 74h84.511l-34-34H185c-22.091 0-40-17.909-40-40V185zm127.28 262l31.838 31.838L306.28 481h30.494l2.929-3.347L366.524 447H323.36l-2.399 2.741L318.22 447h-45.94zM447 305.697v49.33l34-38.857v-49.33l-12.522 14.31L447 305.697zm34 49.957l-34 38.857V407c0 22.091-17.909 40-40 40h-5.928l-29.75 34H407c40.869 0 74-33.131 74-74v-51.346z"
            clipRule="evenodd"
          ></path>
          <path
            data-layer="checkmark"
            fill="#4FF67A"
            fillRule="evenodd"
            d="M510.046 282.974L322.543 497.263l-94.636-94.636 22.97-22.97 70.084 70.084 164.638-188.158 24.447 21.391z"
            clipRule="evenodd"
          ></path>
        </>
      ) : (
        <path
          data-layer="clipboard"
          stroke="#6272A4"
          strokeLinejoin="round"
          strokeWidth="34"
          d="M407 128H185c-31.48 0-57 25.52-57 57v222c0 31.48 25.52 57 57 57h222c31.48 0 57-25.52 57-57V185c0-31.48-25.52-57-57-57z"
        ></path>
      )}
    </svg>
  );
};

export default CopyToClipboardIcon;
