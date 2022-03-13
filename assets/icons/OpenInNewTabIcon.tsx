const OpenInNewTabIcon = () => {
  return (
    <>
      <span className="screenReaderText">(Opens in a new tab)</span>
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
          fill="#EAF0F5"
          data-layer="background"
          d="M48 144c0-17.673 14.327-32 32-32h288c17.673 0 32 14.327 32 32v288c0 17.673-14.327 32-32 32H80c-17.673 0-32-14.327-32-32V144z"
        ></path>
        <g data-layer="arrow">
          <path
            fill="#868D9E"
            d="M302.222 47v46.222h82.969L158.009 320.404l32.587 32.587 227.182-227.182v82.969H464V47H302.222z"
          ></path>
        </g>
      </svg>
    </>
  );
};

export default OpenInNewTabIcon;
