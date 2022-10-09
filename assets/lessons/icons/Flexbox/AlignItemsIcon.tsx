import { AlignItemsPossibleValuesProps } from "lessons/Flexbox/types";

const AlignItemsIcon = ({
  value,
}: {
  value: AlignItemsPossibleValuesProps;
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
          d="M17 20a1.5 1.5 0 001.5-1.5V14H21v-1h-2.5V8.5A1.5 1.5 0 0017 7h-2a1.5 1.5 0 00-1.5 1.5V13h-1v-2.5A1.5 1.5 0 0011 9H9a1.5 1.5 0 00-1.5 1.5V13H5v1h2.5v2.5A1.5 1.5 0 009 18h2a1.5 1.5 0 001.5-1.5V14h1v4.5A1.5 1.5 0 0015 20h2z"
          clipRule="evenodd"
        ></path>
      )}
      {value === "flex-start" && (
        <path
          fill="#F5F5F5"
          fillRule="evenodd"
          d="M7.5 14.5V8H5V7h16v1h-2.5v10.5A1.5 1.5 0 0117 20h-2a1.5 1.5 0 01-1.5-1.5V8h-1v6.5A1.5 1.5 0 0111 16H9a1.5 1.5 0 01-1.5-1.5z"
          clipRule="evenodd"
        ></path>
      )}
      {value === "flex-end" && (
        <path
          fill="#F5F5F5"
          fillRule="evenodd"
          d="M9 7a1.5 1.5 0 00-1.5 1.5V19H5v1h16v-1h-2.5v-6.5A1.5 1.5 0 0017 11h-2a1.5 1.5 0 00-1.5 1.5V19h-1V8.5A1.5 1.5 0 0011 7H9z"
          clipRule="evenodd"
        ></path>
      )}
      {value === "stretch" && (
        <path
          fill="#F5F5F5"
          fillRule="evenodd"
          d="M7.5 7H5V6h16v1H7.5zm0 0v12H5v1h16v-1h-2.5V7h-5v12h-1V7h-5z"
          clipRule="evenodd"
        ></path>
      )}
      {value === "baseline" && (
        <path
          fill="#F5F5F5"
          fillRule="evenodd"
          d="M12.703 7.116l1.85 5.387h-3.818l1.968-5.387zm1.004-1.81h-1.868L7.25 17.5h1.693l1.32-3.652h4.823l1.237 3.652h1.81L13.706 5.306zM5 19.5h16v1H5v-1z"
          clipRule="evenodd"
        ></path>
      )}
    </svg>
  );
};

export default AlignItemsIcon;
