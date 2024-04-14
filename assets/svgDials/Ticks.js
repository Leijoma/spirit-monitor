import React from 'react';
import Svg, { G, Line } from 'react-native-svg';

const Ticks = ({ cx,cy,radius, strokeWidth, length, totalTicks=4 ,color="white" }) => {
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
    <Svg height={cx*2} width={cy*2} viewBox={`0 0 ${cx*2} ${cy * 2}`}>
      <G transform={`translate(${cx} ${cy})`}>
        {ticks}
      </G>
    </Svg>
  );
};

export default Ticks;
