import React, { useState, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Circle, Polygon } from 'react-native-svg';
import DegreeTicks from './DegreeTicks';

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

const InnerRing = ({value}) => {
    const translation = useRef(
        new Animated.Value(0)
      ).current;

      const needlePath = `${50},${50 - 40} ${50 - 10},${50} ${50 + 10},${50}`;

      
      useEffect(() => {
        Animated.timing(translation, {
          toValue: 30-value,
          delay: 0,
          useNativeDriver: false,
        }).start();
      }, [value]);


      const rotateInterpolate = translation.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg']
      });

     return (
        <Animated.View
          style={{
            width: 200,
            height: 200,
            backgroundColor: 'transparent',
            transform: [{ rotate: rotateInterpolate }],
          }}
        >
         
              
            <Svg height="200" width="200" viewBox="0 0 200 200"    > 
            {/* Static parts */}
                <Circle cx="100" cy="100" r="70" stroke="white" strokeWidth="14" fill="none"/>
                <DegreeTicks cx="100" cy="100"  radius={66} totalTicks={12}   />
            </Svg>
            
         
        </Animated.View>
      );

}

export default InnerRing;
