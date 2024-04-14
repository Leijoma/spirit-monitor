import { useEffect, useState } from "react";
import { Dimensions, Image,Button,ScrollView, FlatList,Modal, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
//import { Image } from 'expo-image';
import { Entypo } from '@expo/vector-icons';
import WindRose from "./windRose";
import { testWeather } from "../assets/weatherdata";



export default function Smhi({lat,lon}) {

    let url= 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/'+lon+'/lat/'+lat+'/data.json'
    const [loaded, setLoaded] = useState(false);
    const [SMHIdata,setSMHIdata] = useState([])
    const [seconds, setSeconds] = useState();

    const {screenHeight, screenWidth} = Dimensions.get('screen');
    console.log(screenWidth)
   
    var updateInterval=600; // seconds between smhi API calls

    
    var images = [
        require('../assets/weather_icons/PNG/128/day_clear.png'),           // placeholder for icon 0
        require('../assets/weather_icons/PNG/128/day_clear.png'),           //Clear sky
        require('../assets/weather_icons/PNG/128/day_clear.png'),           // Nearly clear sky
        require('../assets/weather_icons/PNG/128/day_partial_cloud.png'),   //variable cloudiness
        require('../assets/weather_icons/PNG/128/day_partial_cloud.png'),   // half clear sky
        require('../assets/weather_icons/PNG/128/cloudy.png'),              //Cloudy sky
        require('../assets/weather_icons/PNG/128/overcast.png'),            //overcast
        require('../assets/weather_icons/PNG/128/fog.png'),                 // Fog
        require('../assets/weather_icons/PNG/128/day_rain.png'),            // Light rain showers
        require('../assets/weather_icons/PNG/128/day_rain.png'),            // Moderate rain showers
        require('../assets/weather_icons/PNG/128/rain.png'),                // Heavy rain showers
        require('../assets/weather_icons/PNG/128/rain_thunder.png'),        //Thunderstorm
        require('../assets/weather_icons/PNG/128/day_sleet.png'),           // Light sleet showers
        require('../assets/weather_icons/PNG/128/day_sleet.png'),           // Moderate sleet showers
        require('../assets/weather_icons/PNG/128/sleet.png'),               // Heavy sleet showers
        require('../assets/weather_icons/PNG/128/day_snow.png'),            // Light Snow showers
        require('../assets/weather_icons/PNG/128/day_snow.png'),            // Moderate Snow showers
        require('../assets/weather_icons/PNG/128/snow.png'),                // Heavy Snow showers
        require('../assets/weather_icons/PNG/128/rain.png'),                // Light rain
        require('../assets/weather_icons/PNG/128/rain.png'),                // Moderate rain
        require('../assets/weather_icons/PNG/128/rain.png'),                // Heavy rain
        require('../assets/weather_icons/PNG/128/thunder.png'),             //Thunder
        require('../assets/weather_icons/PNG/128/sleet.png'),               // Light sleet
        require('../assets/weather_icons/PNG/128/sleet.png'),               // Moderate sleet
        require('../assets/weather_icons/PNG/128/sleet.png'),               // Heavy sleet
        require('../assets/weather_icons/PNG/128/snow.png'),                // Light snowfall
        require('../assets/weather_icons/PNG/128/snow.png'),                // Moderate snowfall
        require('../assets/weather_icons/PNG/128/snow.png'),                // Heavy snowfall
    ];

    function getParameterByIndexAndName(timeSeriesData, index, paramName) {
        // Check if the index is within the bounds of the timeSeries array
        if(index < 0 || index >= timeSeriesData.timeSeries.length) {
          console.error("Index out of bounds");
          return null;
        }
      
        // Get the selected time series object
        const selectedTimeSeries = timeSeriesData.timeSeries[index];
      
        // Find the parameter object by name
        const parameterObject = selectedTimeSeries.parameters.find(param => param.name === paramName);
      
        // Return the parameter object if found, otherwise log an error
        if(parameterObject) {
          return parameterObject;
        } else {
          console.error("Parameter not found");
          return null;
        }
      }

    function WeatherIcon({iconId}) {
       
        return ( 
           
                <Image  contentFit={"contain"} style={styles.logo} source={images[iconId]}/>
          
        )
    }

    function inside(point, vs) {
        // ray-casting algorithm based on
        // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html
        
        var x = point[0], y = point[1];
        
        var inside = false;
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            var xi = vs[i][0], yi = vs[i][1];
            var xj = vs[j][0], yj = vs[j][1];
            
            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        
        return inside;
    };

    function positionAffected(lat,lon,data) {
        console.log(data)
        for (var key in data) {
            console.log(data[key].area)
            let area=data[key].area.geometry
            for (var key2 in area) {
                console.log('multipolygon to check:')
                console.log(area[key2])
            }
  
        }
    }

    function updateForecast() {
        fetch(url, {
            // varningar      fetch('https://opendata-download-warnings.smhi.se/ibww/api/version/1/warning.json', {
               method: 'GET',
               //Request Type
               })
               .then((response) => response.json())
               //If response is in json then in success
               .then((responseJson) => {
                   //Success
                   const myData=[]
                   
                   //alert(JSON.stringify(responseJson));
                  
                   for (var key in responseJson) {
                       if (responseJson.hasOwnProperty(key)) {
                       }
                   }
                   console.log("SMHI response: "+JSON.stringify(responseJson));
                   setSMHIdata(responseJson)
                   setLoaded(true)
               })
               //If response is not in json then in error
               .catch((error) => {
                   //Error
                 //  alert(JSON.stringify(error));
                   console.error(error);
               });
    } 

    

    useEffect(() => {
    const loadData = async () => {
      try {
        updateForecast()
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    // Call the API when the component is loaded
    loadData();

    // Set up an interval to call the API every updateInterval seconds
    const intervalId = setInterval(loadData, updateInterval*1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this effect runs only once on mount


    /*
   
    useEffect(() => {
     
        const interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
            updateForecast()
            
          }, updateInterval);
          return () => clearInterval(interval);
        
    }, []);
*/

    let options = {  
        weekday: "short", 
        month: "short",  
        day: "numeric", 
        hour: "2-digit", 
        minute: "2-digit", 
        hourCycle: 'h23'
    };  

    function displayTime(datestring) {
     let date = new Date(datestring)
     return date.toLocaleTimeString("se-us", options)
    }

    function ReportItem({reportData,timeIndex}) {

        function getViewStyle(sw) {
            console.log("screen sw: "+sw)
            if(sw<450) {
             return {
                flexDirection : "column", alignItems : 'center', justifyContent : 'flex-start'
             }
            } else {
              return {
                flexDirection : "row", alignItems : 'center', justifyContent : 'flex-start'
              }
            }
        }
        //console.log("weatherdata: "+JSON.stringify(reportData))
        return (
            <View style={{ width : 180,flexDirection : 'column',alignItems: 'flex-start', padding:0, borderWidth : 0, borderColor : 'gray', backgroundColor : "transparent"}}>
                <Text style={styles.value}>{displayTime(reportData.timeSeries[timeIndex].validTime)}</Text>
                <View style={{ flexDirection : 'row',alignItems: 'flex-start', paddingHorizontal:2}} >
                    <View style={getViewStyle(screenWidth)}>
                        <WeatherIcon iconId={getParameterByIndexAndName(reportData, timeIndex, "Wsymb2").values[0]}  />    
                        <WindRose style={{ paddingHorizontal:5}} value={getParameterByIndexAndName(reportData, timeIndex, "wd").values[0]} label='Water level (%)'  backgroundColor={'#9bf'} />
                    </View>
                    <View style={{backgroundColor : 'transparent',flexDirection : "column", alignContent : 'flex-start', alignItems : 'flex-start', justifyContent : 'flex-start'}}>
                        <Text style={styles.value}>Temp: {getParameterByIndexAndName(reportData, timeIndex, "t").values[0].toFixed(0)}°</Text>
                        <Text style={styles.value}>Vind: {getParameterByIndexAndName(reportData, timeIndex, "ws").values[0].toFixed(0)} m/s</Text>
                        <Text style={styles.value}>Byar: {getParameterByIndexAndName(reportData, timeIndex, "gust").values[0].toFixed(0)} m/s</Text>
                        <Text style={styles.value}>Tryck: {getParameterByIndexAndName(reportData, timeIndex, "msl").values[0].toFixed(0)} hPa</Text>
  
                        
                    </View>
                </View>
            </View> 
        )
    }
//  <Text style={styles.value}>Riktning: {getParameterByIndexAndName(reportData, timeIndex, "wd").values[0].toFixed(0)} deg</Text>

                    
    return (
        <View style={{ marginTop :4 ,alignItems: 'flex-start', paddingHorizontal : 5, borderWidth : 0, borderColor : 'gray', backgroundColor : "transparent"}}>
           { loaded ? 
            <View style={{ flexDirection : 'row',alignItems: 'flex-start', padding:0, borderWidth : 0, borderColor : 'gray', backgroundColor : "transparent"}}>
                <ReportItem reportData={SMHIdata} timeIndex={2}    />
                <ReportItem reportData={SMHIdata} timeIndex={6}    />
                <ReportItem reportData={SMHIdata} timeIndex={8}    />
                <ReportItem reportData={SMHIdata} timeIndex={12}    />
            </View> 
            :
            <View>
                <Text style={{color : 'blue'}}>No weather data</Text>

            </View>     }
        </View>


    )

}


const styles = StyleSheet.create({
    modalContent: {
      height: '100%',
      width: '60%',
      flex : 1,
      backgroundColor: '#25292e',
      borderTopRightRadius: 18,
      borderTopLeftRadius: 18,
      position: 'absolute',
      top : 10,
      left : 0,
      bottom: 0,
    },
    titleContainer: {
      height: '16%',
      backgroundColor: '#464C55',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      color: '#fff',
      fontSize: 16,
    },
    value: {
        fontFamily : 'futura_medium',
        color: '#fff',
        fontSize: 14,
      },
      
    pickerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 50,
      paddingVertical: 20,
    },
    logo :{
        height: 35,
        width: 35,
    },
  });
