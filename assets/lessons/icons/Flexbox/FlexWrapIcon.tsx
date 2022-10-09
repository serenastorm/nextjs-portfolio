import { FlexWrapPossibleValuesProps } from "lessons/Flexbox/types";

const FlexWrapIcon = ({ value }: { value: FlexWrapPossibleValuesProps }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      width="26"
      height="26"
      fill="none"
      viewBox="0 0 26 26"
    >
      {value === "wrap" && (
        <path
          fill="#F5F5F5"
          fillRule="evenodd"
          d="M7.5 5h-2a.5.5 0 00-.5.5v5a.5.5 0 00.5.5h2a.5.5 0 00.5-.5v-5a.5.5 0 00-.5-.5zm-2-1A1.5 1.5 0 004 5.5v5A1.5 1.5 0 005.5 12h2A1.5 1.5 0 009 10.5v-5A1.5 1.5 0 007.5 4h-2zM4 15.5A1.5 1.5 0 015.5 14h2A1.5 1.5 0 019 15.5v5A1.5 1.5 0 017.5 22h-2A1.5 1.5 0 014 20.5v-5zm7-10A1.5 1.5 0 0112.5 4h2A1.5 1.5 0 0116 5.5v5a1.5 1.5 0 01-1.5 1.5h-2a1.5 1.5 0 01-1.5-1.5v-5zm3.5 9.5h-2a.5.5 0 00-.5.5v5a.5.5 0 00.5.5h2a.5.5 0 00.5-.5v-5a.5.5 0 00-.5-.5zm-2-1a1.5 1.5 0 00-1.5 1.5v5a1.5 1.5 0 001.5 1.5h2a1.5 1.5 0 001.5-1.5v-5a1.5 1.5 0 00-1.5-1.5h-2zm7-9h2a.5.5 0 01.5.5v5a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-5a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 0119.5 4h2A1.5 1.5 0 0123 5.5v5a1.5 1.5 0 01-1.5 1.5h-2a1.5 1.5 0 01-1.5-1.5v-5zm0 10a1.5 1.5 0 011.5-1.5h2a1.5 1.5 0 011.5 1.5v5a1.5 1.5 0 01-1.5 1.5h-2a1.5 1.5 0 01-1.5-1.5v-5z"
          clipRule="evenodd"
        ></path>
      )}
      {value === "nowrap" && (
        <path
          fill="#F5F5F5"
          fillRule="evenodd"
          d="M5.5 10h2a.5.5 0 01.5.5v5a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-5a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 015.5 9h2A1.5 1.5 0 019 10.5v5A1.5 1.5 0 017.5 17h-2A1.5 1.5 0 014 15.5v-5zM12.5 9a1.5 1.5 0 00-1.5 1.5v5a1.5 1.5 0 001.5 1.5h2a1.5 1.5 0 001.5-1.5v-5A1.5 1.5 0 0014.5 9h-2zm7 1h2a.5.5 0 01.5.5v5a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-5a.5.5 0 01.5-.5zm-1.5.5A1.5 1.5 0 0119.5 9h2a1.5 1.5 0 011.5 1.5v5a1.5 1.5 0 01-1.5 1.5h-2a1.5 1.5 0 01-1.5-1.5v-5z"
          clipRule="evenodd"
        ></path>
      )}
    </svg>
  );
};

export default FlexWrapIcon;
