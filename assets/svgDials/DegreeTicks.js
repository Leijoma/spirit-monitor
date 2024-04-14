import React from 'react';
import Svg, { G, Text } from 'react-native-svg';

const DegreeTicks = ({ cx,cy,radius, strokeWidth, length, rotate=30, totalTicks=4 ,color="white" }) => {
  const ticks = [];
 
  for (let i = 0; i < totalTicks; i++) {
    let angle = (i * (360 / totalTicks));
 
    ticks.push(
        <Text
        key={i}
        x={cx}
        y={cy-radius}
        fill="black"
        fontSize="11"
        fontWeight="bold"
        textAnchor="middle"
        fontFamily='futura_light'
        transform={`rotate(${angle}, ${cx}, ${cy})`}
      >
      {angle}
      </Text>
   
    );
  }

  return (
    <Svg height={cx*2} width={cy*2} viewBox={`0 0 ${cx*2} ${cy * 2}`}>
      <G  transform={`rotate(${-rotate}, ${cx}, ${cy})`} >
        {ticks}
      </G>
    </Svg>
  );
};

export default DegreeTicks;
