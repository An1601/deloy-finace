const ChangePasswordIcon = (props: any) => (
  <svg
    width={53}
    height={53}
    viewBox="0 0 53 53"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_1407_58550)">
      <circle cx={26} cy={24} r={20} fill="white" />
    </g>
    <path
      d="M26 27V29M20 33H32C33.1046 33 34 32.1046 34 31V25C34 23.8954 33.1046 23 32 23H20C18.8954 23 18 23.8954 18 25V31C18 32.1046 18.8954 33 20 33ZM30 23V19C30 16.7909 28.2091 15 26 15C23.7909 15 22 16.7909 22 19V23H30Z"
      stroke="#45556E"
      strokeWidth={1.2}
      strokeLinecap="round"
    />
    <defs>
      <filter
        id="filter0_d_1407_58550"
        x={0.615385}
        y={0.153846}
        width={52.3077}
        height={52.3077}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx={0.769231} dy={2.30769} />
        <feGaussianBlur stdDeviation={3.07692} />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1407_58550"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1407_58550"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default ChangePasswordIcon;
