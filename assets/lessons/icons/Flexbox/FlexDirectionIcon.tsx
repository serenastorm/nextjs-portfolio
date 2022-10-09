import { FlexDirectionPossibleValuesProps } from "lessons/Flexbox/types";

const FlexDirectionIcon = ({
  value,
}: {
  value: FlexDirectionPossibleValuesProps;
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
      {value === "row" && (
        <path
          fill="#F5F5F5"
          fillRule="evenodd"
          d="M7.5 6h3a.5.5 0 01.5.5v5a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-5a.5.5 0 01.5-.5zM6 6.5A1.5 1.5 0 017.5 5h3A1.5 1.5 0 0112 6.5v5a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 016 11.5v-5zM15.5 5A1.5 1.5 0 0014 6.5v5a1.5 1.5 0 001.5 1.5h3a1.5 1.5 0 001.5-1.5v-5A1.5 1.5 0 0018.5 5h-3zM21 18.5L16.227 15v2.894H5v1.212h11.227V22L21 18.5z"
          clipRule="evenodd"
        ></path>
      )}
      {value === "column" && (
        <path
          fill="#F5F5F5"
          fillRule="evenodd"
          d="M18.5 21l3.5-4.773h-2.894V5h-1.212v11.227H15L18.5 21zM12 7.5v3a.5.5 0 01-.5.5h-5a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5h5a.5.5 0 01.5.5zM11.5 6A1.5 1.5 0 0113 7.5v3a1.5 1.5 0 01-1.5 1.5h-5A1.5 1.5 0 015 10.5v-3A1.5 1.5 0 016.5 6h5zm1.5 9.5a1.5 1.5 0 00-1.5-1.5h-5A1.5 1.5 0 005 15.5v3A1.5 1.5 0 006.5 20h5a1.5 1.5 0 001.5-1.5v-3z"
          clipRule="evenodd"
        ></path>
      )}
    </svg>
  );
};

export default FlexDirectionIcon;
