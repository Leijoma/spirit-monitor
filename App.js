import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView , Dimensions} from 'react-native';
import { useFonts } from 'expo-font';

import {SignalkProvider} from './SignalkContext'
import { SettingsProvider } from './SettingsContext';
import DigitalValue from './components/DigitalValue';
import UnbalanceValue from './components/UnbalanceValue';
import DataLed from './components/DataLed';
import BatteryPanel from './components/BatteryPanel';
import EnginePanel from './components/EnginePanel';
import WaterPanel from './components/WaterPanel';
import Smhi from './components/smhi';
import WeatherWarnings from './components/WeatherWarnings';
import SettingsComponent from './components/SettingsComponent';
import Serversettings from './components/ServerSettings';
import EditSignalKSettings from './components/EditSignalKSettings';
import WindDisplay from './components/WindDisplay';

import BaseComponent from './components/layout/Base';

import { LayoutProvider } from './components/layout/layoutContext';
import  Header  from './components/Header';
import AnalogMeter from './components/AnalogMeter';
import SailPanel from './components/SailPanel';

export default function App() {
 
  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im1hZ251c0BsZWlqb25ib3JnLnNlIiwiaWF0IjoxNzEyODE1NzcwLCJleHAiOjQ4Njg1NzU3NzB9.4qYSrFijnnedwlSmLnFtNWTsIGf_mmmtvYnknzVFFw0
 
  const [fontsLoaded] = useFonts({
    'futura_light': require('./assets/fonts/futura/futura-light-bt.ttf'),
    'futura_medium': require('./assets/fonts/futura/futura-medium-bt.ttf'),
  });

  return (
    <LayoutProvider>
      <SettingsProvider>
        <SignalkProvider>
          <View style={styles.container}>
            <Header />
            <View style={{flexWrap : 'wrap',flex : 1, flexDirection : 'row', alignItems : 'flex-start', alignContent : 'flex-start'}}>    
            {  /*<ScrollView horizontal={true}> */}
              
                <Serversettings />
                <BatteryPanel />
                <EnginePanel />
              
                <WaterPanel />
                <SailPanel />
              
           { /*   </ScrollView> */}
              <StatusBar style="auto" />
            </View>
            <View style={styles.footer}>
              <ScrollView horizontal={true}>
                <Smhi lat={59.429} lon={18.047} />
              </ScrollView>
            </View>
          </View>
        </SignalkProvider>
      </SettingsProvider>
    </LayoutProvider>
   
  );
}

/*
  <Smhi lat={59.429} lon={18.047} />
  <SettingsComponent />     
  <BaseComponent />
*/

// <WeatherWarnings lat={59.429} lon={18.047} />
//    <Smhi lat={58} lon={18} />
const styles = StyleSheet.create({
  container: {
    flex : 1,
    //height : 480,
    //width : 800, 
    borderWidth : 1,
   
    backgroundColor: '#000',
   
  },
  footer : {
    flexDirection : "row",
    borderTopWidth : 1,
    borderColor : "white",
    paddingHorizontal : 4,
    
    alignItems: 'flex-start',
    justifyContent: 'flex_start',
    height : 100,
    width : '100%',
    backgroundColor : '#000'
  },
 
});
