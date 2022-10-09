import { JustifyContentPossibleValuesProps } from "lessons/Flexbox/types";

const JustifyContentIcon = ({
  value,
}: {
  value: JustifyContentPossibleValuesProps;
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
          d="M13.75 5v16h-1.5V5h1.5zM11 17.5A1.5 1.5 0 019.5 19h-1A1.5 1.5 0 017 17.5v-9A1.5 1.5 0 018.5 7h1A1.5 1.5 0 0111 8.5v9zm6.5 1.5a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0017.5 7h-1A1.5 1.5 0 0015 8.5v9a1.5 1.5 0 001.5 1.5h1z"
          clipRule="evenodd"
        ></path>
      )}
      {value === "flex-start" && (
        <path
          fill="#F5F5F5"
          fillRule="evenodd"
          d="M6 21V5h1.5v3H10a1.5 1.5 0 011.5 1.5v7A1.5 1.5 0 0110 18H7.5v3H6zm7.5-11.5A1.5 1.5 0 0115 8h1a1.5 1.5 0 011.5 1.5v7A1.5 1.5 0 0116 18h-1a1.5 1.5 0 01-1.5-1.5v-7z"
          clipRule="evenodd"
        ></path>
      )}
      {value === "flex-end" && (
        <path
          fill="#F5F5F5"
          fillRule="evenodd"
          d="M19 5v3h-2.5A1.5 1.5 0 0015 9.5v7a1.5 1.5 0 001.5 1.5H19v3h1.5V5H19zm-6 11.5a1.5 1.5 0 01-1.5 1.5h-1A1.5 1.5 0 019 16.5v-7A1.5 1.5 0 0110.5 8h1A1.5 1.5 0 0113 9.5v7z"
          clipRule="evenodd"
        ></path>
      )}
      {value === "space-between" && (
        <path
          fill="#F5F5F5"
          fillRule="evenodd"
          d="M19 5v3h-2.5A1.5 1.5 0 0015 9.5v7a1.5 1.5 0 001.5 1.5H19v3h1.5V5H19zM6 21V5h1.5v3H10a1.5 1.5 0 011.5 1.5v7A1.5 1.5 0 0110 18H7.5v3H6z"
          clipRule="evenodd"
        ></path>
      )}
      {value === "space-around" && (
        <path
          fill="#F5F5F5"
          fillRule="evenodd"
          d="M7 5v16H6V5h1zm13 0v16h-1V5h1zm-3.5 14a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0016.5 7h-1A1.5 1.5 0 0014 8.5v9a1.5 1.5 0 001.5 1.5h1zM12 17.5a1.5 1.5 0 01-1.5 1.5h-1A1.5 1.5 0 018 17.5v-9A1.5 1.5 0 019.5 7h1A1.5 1.5 0 0112 8.5v9z"
          clipRule="evenodd"
        ></path>
      )}
      {value === "space-evenly" && (
        <path
          fill="#F5F5F5"
          fillRule="evenodd"
          d="M6 5v16H5V5h1zm16 0v16h-1V5h1zm-3.5 14a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0018.5 7h-3A1.5 1.5 0 0014 8.5v9a1.5 1.5 0 001.5 1.5h3zM13 17.5a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 017 17.5v-9A1.5 1.5 0 018.5 7h3A1.5 1.5 0 0113 8.5v9z"
          clipRule="evenodd"
        ></path>
      )}
    </svg>
  );
};

export default JustifyContentIcon;
