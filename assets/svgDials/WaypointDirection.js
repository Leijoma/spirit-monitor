import { fill } from 'lodash';
import React, { useState, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Circle, Polygon, Text } from 'react-native-svg';



const WaypointDirection = ({ value }) => {
    const translation = useRef(
        new Animated.Value(0)
      ).current;

      const needlePath = `${0},${-70} ${-10},${-100} ${10},${-100}`;

      
      useEffect(() => {
        Animated.timing(translation, {
          toValue: -value,
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
              <Circle cx="100" cy="38" r="5" stroke={"black"} fill={"yellow"}/>
            </Svg>
        </Animated.View>
      );

}

export default WaypointDirection;
