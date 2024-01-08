import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const WaveSvg = () => {
  return (
    <svg
    style={{marginTop:"20px"}}
      className="mt-md-3 mt-lg-5"
      xmlns="http://www.w3.org/2000/svg"
      width="auto"
      height="auto"
      viewBox="0 0 1440 85"
      fill="none"
    >
      <g filter="url(#filter0_d_76_1113)">
        <path
          d="M-2.91245 12.0231C600.488 183.334 860.587 -52.977 1437.09 14.0231"
          stroke="#C7C7C7"
          strokeWidth="2"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_76_1113"
          x="-7.18555"
          y="0.709404"
          width="1448.39"
          height="83.9539"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_76_1113"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_76_1113"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default WaveSvg;
