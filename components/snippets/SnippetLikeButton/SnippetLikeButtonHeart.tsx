type SnippetLikeButtonHeartProps = {
  filled: boolean;
};

const SnippetLikeButtonHeart = ({ filled }: SnippetLikeButtonHeartProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none"
      viewBox="0 0 40 40"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <path
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        data-layer="mainHeart"
        d="M27.821 12.515a5.076 5.076 0 00-1.648-1.121 5.005 5.005 0 00-3.89 0 5.076 5.076 0 00-1.649 1.121l-.98.996-.978-.996a5.038 5.038 0 00-3.594-1.514c-1.348 0-2.64.544-3.594 1.514A5.218 5.218 0 0010 16.172c0 1.371.535 2.687 1.489 3.656l.979.997 7.187 7.313 7.187-7.313.98-.997c.471-.48.846-1.05 1.101-1.677a5.25 5.25 0 000-3.958 5.177 5.177 0 00-1.102-1.678z"
      ></path>
      <path
        opacity="0"
        fill="#FCE5F3"
        data-layer="circle"
        d="M20.035 21.105c.57 0 1.034-.471 1.034-1.052 0-.582-.463-1.053-1.034-1.053-.572 0-1.035.471-1.035 1.053 0 .581.463 1.052 1.035 1.052z"
      ></path>
      <g opacity="0" data-layer="hearts" data-order="7">
        <path
          id="heart1"
          data-layer="heart"
          data-order="1"
          fill="#9C2BAD"
          d="M6.207 9.825c.762 0 1.38-.629 1.38-1.404 0-.775-.618-1.403-1.38-1.403-.762 0-1.38.628-1.38 1.403s.618 1.404 1.38 1.404z"
        ></path>
        <path
          id="heart2"
          data-layer="heart"
          data-order="2"
          fill="#793AAF"
          d="M8.276 7.018c.762 0 1.38-.629 1.38-1.404 0-.775-.618-1.403-1.38-1.403-.762 0-1.38.628-1.38 1.403s.618 1.404 1.38 1.404z"
        ></path>
      </g>
      <g opacity="0" data-layer="hearts" data-order="6">
        <path
          id="heart1"
          data-layer="heart"
          data-order="1"
          fill="#D31E66"
          d="M1.38 25.965c.761 0 1.379-.628 1.379-1.404 0-.775-.618-1.403-1.38-1.403-.761 0-1.379.628-1.379 1.403 0 .776.618 1.404 1.38 1.404z"
        ></path>
        <path
          id="heart2"
          data-layer="heart"
          data-order="2"
          fill="#CD1D8D"
          d="M2.069 22.456c.762 0 1.38-.628 1.38-1.403 0-.776-.618-1.404-1.38-1.404-.762 0-1.38.628-1.38 1.404 0 .775.618 1.403 1.38 1.403z"
        ></path>
      </g>
      <g opacity="0" data-layer="hearts" data-order="5">
        <path
          id="heart1"
          data-layer="heart"
          data-order="1"
          fill="#067A6F"
          d="M37.241 25.965c.762 0 1.38-.628 1.38-1.404 0-.775-.618-1.403-1.38-1.403-.761 0-1.379.628-1.379 1.403 0 .776.618 1.404 1.38 1.404z"
        ></path>
        <path
          id="heart2"
          data-layer="heart"
          data-order="2"
          fill="#0C7792"
          d="M38.62 22.456c.763 0 1.38-.628 1.38-1.403 0-.776-.617-1.404-1.38-1.404-.761 0-1.378.628-1.378 1.404 0 .775.617 1.403 1.379 1.403z"
        ></path>
      </g>
      <g opacity="0" data-layer="hearts" data-order="4">
        <path
          id="heart1"
          data-layer="heart"
          data-order="1"
          fill="#0078A1"
          d="M33.793 9.825c.762 0 1.38-.629 1.38-1.404 0-.775-.618-1.403-1.38-1.403-.762 0-1.38.628-1.38 1.403s.618 1.404 1.38 1.404z"
        ></path>
        <path
          id="heart2"
          data-layer="heart"
          data-order="2"
          fill="#006ADC"
          d="M31.724 7.018c.762 0 1.38-.629 1.38-1.404 0-.775-.618-1.403-1.38-1.403-.762 0-1.38.628-1.38 1.403s.618 1.404 1.38 1.404z"
        ></path>
      </g>
      <g opacity="0" data-layer="hearts" data-order="3">
        <path
          id="heart1"
          data-layer="heart"
          data-order="1"
          fill="#CA3214"
          d="M13.793 40c.762 0 1.38-.628 1.38-1.404 0-.775-.618-1.403-1.38-1.403-.762 0-1.38.628-1.38 1.404 0 .775.618 1.403 1.38 1.403z"
        ></path>
        <path
          id="heart2"
          data-layer="heart"
          data-order="2"
          fill="#CD2B31"
          d="M11.035 37.895c.761 0 1.379-.629 1.379-1.404 0-.775-.618-1.403-1.38-1.403-.761 0-1.379.628-1.379 1.403s.618 1.404 1.38 1.404z"
        ></path>
      </g>
      <g opacity="0" data-layer="hearts" data-order="2">
        <path
          id="heart1"
          data-layer="heart"
          data-order="1"
          fill="#18794E"
          d="M28.276 40c.762 0 1.38-.628 1.38-1.404 0-.775-.618-1.403-1.38-1.403-.762 0-1.38.628-1.38 1.404 0 .775.618 1.403 1.38 1.403z"
        ></path>
        <path
          id="heart2"
          data-layer="heart"
          data-order="2"
          fill="#147D6F"
          d="M25.517 37.895c.762 0 1.38-.629 1.38-1.404 0-.775-.618-1.403-1.38-1.403-.761 0-1.38.628-1.38 1.403s.619 1.404 1.38 1.404z"
        ></path>
      </g>
      <g opacity="0" data-layer="hearts" data-order="1">
        <path
          id="heart1"
          data-layer="heart"
          data-order="1"
          fill="#5746AF"
          d="M18.276 3.509c.762 0 1.38-.629 1.38-1.404 0-.775-.618-1.403-1.38-1.403-.762 0-1.38.628-1.38 1.403s.618 1.404 1.38 1.404z"
        ></path>
        <path
          id="heart2"
          data-layer="heart"
          data-order="2"
          fill="#3451B2"
          d="M21.724 2.807c.762 0 1.38-.628 1.38-1.403 0-.776-.618-1.404-1.38-1.404-.762 0-1.38.628-1.38 1.404 0 .775.618 1.403 1.38 1.403z"
        ></path>
      </g>
    </svg>
  );
};

export default SnippetLikeButtonHeart;
