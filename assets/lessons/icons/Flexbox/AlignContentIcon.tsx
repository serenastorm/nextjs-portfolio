import { AlignContentPossibleValuesProps } from "lessons/Flexbox/types";

const AlignContentIcon = ({
  value,
}: {
  value: AlignContentPossibleValuesProps;
}) => {
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
      {value === "center" && (
        <path
          fill="#F5F5F5"
          fillRule="evenodd"
          d="M19 8.5A1.5 1.5 0 0017.5 7h-9A1.5 1.5 0 007 8.5v1A1.5 1.5 0 008.5 11h9A1.5 1.5 0 0019 9.5v-1zM17.5 15a1.5 1.5 0 011.5 1.5v1a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 017 17.5v-1A1.5 1.5 0 018.5 15h9zM5 12.25h16v1.5H5v-1.5z"
          clipRule="evenodd"
        ></path>
      )}
      {value === "flex-start" && (
        <path
          fill="#F5F5F5"
          fillRule="evenodd"
          d="M5 8.5h2V11a1.5 1.5 0 001.5 1.5h9A1.5 1.5 0 0019 11V8.5h2V7H5v1.5zm12.5 6A1.5 1.5 0 0119 16v1a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 017 17v-1a1.5 1.5 0 011.5-1.5h9z"
          clipRule="evenodd"
        ></path>
      )}
      {value === "flex-end" && (
        <path
          fill="#F5F5F5"
          fillRule="evenodd"
          d="M8.5 11A1.5 1.5 0 017 9.5v-1A1.5 1.5 0 018.5 7h9A1.5 1.5 0 0119 8.5v1a1.5 1.5 0 01-1.5 1.5h-9zM7 17v-2.5A1.5 1.5 0 018.5 13h9a1.5 1.5 0 011.5 1.5V17h2v1.5H5V17h2z"
          clipRule="evenodd"
        ></path>
      )}
      {value === "space-between" && (
        <path
          fill="#F5F5F5"
          fillRule="evenodd"
          d="M7 7H5V6h16v1h-2v2a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 017 9V7zm10.5 8.5A1.5 1.5 0 0119 17v2h2v1H5v-1h2v-2a1.5 1.5 0 011.5-1.5h9z"
          clipRule="evenodd"
        ></path>
      )}
      {value === "space-around" && (
        <path
          fill="#F5F5F5"
          fillRule="evenodd"
          d="M21 7H5V6h16v1zm-2 2.5A1.5 1.5 0 0017.5 8h-9A1.5 1.5 0 007 9.5v1A1.5 1.5 0 008.5 12h9a1.5 1.5 0 001.5-1.5v-1zM17.5 14a1.5 1.5 0 011.5 1.5v1a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 017 16.5v-1A1.5 1.5 0 018.5 14h9zM5 19h16v1H5v-1z"
          clipRule="evenodd"
        ></path>
      )}
      {value === "stretch" && (
        <path
          fill="#F5F5F5"
          fillRule="evenodd"
          d="M7 7H5V6h16v1h-2v3.5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 017 10.5V7zm10.5 7a1.5 1.5 0 011.5 1.5V19h2v1H5v-1h2v-3.5A1.5 1.5 0 018.5 14h9z"
          clipRule="evenodd"
        ></path>
      )}
    </svg>
  );
};

export default AlignContentIcon;
