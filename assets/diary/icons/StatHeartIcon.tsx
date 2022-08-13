const StatHeartIcon = ({ filled }: { filled: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
      role="presentation"
    >
      <path
        // fill={filled ? "url(#paint0_linear_320_221)" : "#F3F6F8"}
        fill="url(#paint0_linear_320_221)"
        fillOpacity={filled ? "1" : "0.1"}
        stroke="#5E5252"
        strokeLinejoin="round"
        strokeWidth="1.5"
        strokeOpacity={filled ? "0.6" : "0.4"}
        d="M29.333 11.816a7.934 7.934 0 01-2.205 5.508c-3.255 3.373-6.412 6.891-9.788 10.142a1.95 1.95 0 01-2.742-.06L4.872 17.324c-2.94-3.048-2.94-7.968 0-11.015a7.441 7.441 0 0110.774 0l.354.366.353-.366A7.483 7.483 0 0121.74 4c2.025 0 3.964.833 5.388 2.309a7.933 7.933 0 012.205 5.507z"
      ></path>
      <defs>
        <linearGradient
          id="paint0_linear_320_221"
          x1="8.711"
          x2="36.907"
          y1="-2.04"
          y2="13.401"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FC6767"></stop>
          <stop offset="1" stopColor="#EC008C"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default StatHeartIcon;
