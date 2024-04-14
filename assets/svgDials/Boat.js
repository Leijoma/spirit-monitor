
import React from 'react';
import Svg, { G, Line } from 'react-native-svg';

const Boat = ({ cx,cy,radius, strokeWidth, length, totalTicks=4 ,color="white" }) => {
  const ticks = [];
 
  for (let i = 0; i < totalTicks; i++) {
    let angle = (i * (360 / totalTicks));
 
    ticks.push(
      <Line
        key={i}
        x1={0}
        y1={radius+length/2}
        x2={0}
        y2={radius-length/2}
        stroke={color}
        strokeWidth={strokeWidth}
    
      transform={`rotate(${angle} 0 0)`}
      />
    );
  }

  return (
   
     
<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_1_5)" transform={`translate(${cx} ${cy})`}>
        <path d="M29.5333 1C-8.46667 59 9.53333 105 15.5333 116" stroke="url(#linear2)" strokeWidth="3"/>
    </g>
    <g filter="url(#filter1_d_1_5)" transform={`translate(${cx} ${cy})`}>
        <path d="M29 1C67 59 49 105 43 116" stroke="url(#linear2)" strokeWidth="3"/>
    </g>
    <defs>
        <filter id="filter0_d_1_5" x="0.499741" y="0.177963" width="34.2883" height="124.54" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_5"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_5" result="shape"/>
        </filter>
        <filter id="filter1_d_1_5" x="23.7453" y="0.177963" width="34.2883" height="124.54" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_5"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_5" result="shape"/>
        </filter>
        <linearGradient id="linear2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#717171"/>
            <stop offset="75%" stopColor="#717171"/>
            <stop offset="100%" stopColor="#000"/>
        </linearGradient>
    </defs>
</svg>

   
  );
};

export default Boat;


