import { useEffect, useState } from "react";
import { Dimensions, Image,Button,ScrollView, FlatList,Modal, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
//import { Image } from 'expo-image';
import { Entypo } from '@expo/vector-icons';
import WindRose from "./windRose";
import {testWarnings} from '../assets/warningtest'



export default function WeatherWarnings({lat=59,lon=20}) {

    let testUrl= 'https://opendata-download-warnings.smhi.se/ibww/test/test_2.json'
    let url= 'https://opendata-download-warnings.smhi.se/ibww/api/version/1/warning.json'
    const [loaded, setLoaded] = useState(false);
    const [warnings,setWarnings] = useState()
    const [seconds, setSeconds] = useState();
    const [foundWarnings,setFoundWarnings]=useState([])

    const {screenHeight, screenWidth} = Dimensions.get('screen');
    console.log(screenWidth)
   
    var updateInterval=600; // seconds between smhi API calls

    /**
 * Finds all warning areas that overlap with a circle centered at the given position and with a specified radius.
 * 
 * @param {Array} weatherWarnings - The array of weather warnings, each with warning areas.
 * @param {Array} position - The center of the circle to check, as [longitude, latitude].
 * @param {number} radius - The radius of the circle in meters.
 * @returns {Array} - An array of warning areas overlapping with the circle, empty if none are found.
 */
function findAllWarningAreasForPosition(weatherWarnings, position, radius) {
  console.log("SMHI warning response: "+JSON.stringify(weatherWarnings));
  const overlappingAreas = [];
              
  for (const warning of weatherWarnings) {
      for (const area of warning.warningAreas) {
          // Safely access the geometry type
          const type = area.area && area.area.geometry ? area.area.geometry.type : null;
          
          if (type === 'Polygon') {
              console.log("polygon: "+JSON.stringify(area.area.geometry.coordinates[0]))
              if (doesCircleOverlapPolygon(area.area.geometry.coordinates[0], position, radius)) {
                  overlappingAreas.push(area); // Add the warning area object to the results
              }
          }
          // Implement logic for other geometry types if necessary
      }
  }
  return overlappingAreas; // Return an array of overlapping areas, could be empty
}

    
 /**
 * Finds the warning area that contains the given position.
 * 
 * @param {Array} weatherWarnings - The array of weather warnings, each with warning areas.
 * @param {Array} position - The position to check, as [longitude, latitude].
 * @returns {Object|null} - The warning area containing the position, or null if not found.
 */
function findWarningAreaForPosition(weatherWarnings, position) {
    console.log("SMHI warning response: "+JSON.stringify(weatherWarnings));
                
    for (const warning of weatherWarnings) {
      for (const area of warning.warningAreas) {
        // Safely access the geometry type
        const type = area.area && area.area.geometry ? area.area.geometry.type : null;
        
        if (type === 'Polygon') {
            console.log("polygon: "+JSON.stringify(area.area.geometry.coordinates[0]))
          if (doesCircleOverlapPolygon(area.area.geometry.coordinates[0], position, 50000)) {
            return area; // Return the warning area object
          }
        }
        // Implement logic for other geometry types if necessary
      }
    }
    return null; // Return null if no containing area is found
  }
  
  /**
   * Determines if a point is inside a polygon.
   * 
   * @param {Array} polygon - Array of polygon coordinates.
   * @param {Array} point - The point to check, as [longitude, latitude].
   * @returns {boolean} - True if the point is inside the polygon, false otherwise.
   */
  function isPointInPolygon(polygon, point) {
    let x = point[0], y = point[1];
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      let xi = polygon[i][0], yi = polygon[i][1];
      let xj = polygon[j][0], yj = polygon[j][1];
      
      let intersect = ((yi > y) != (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }
  
  function doesCircleOverlapPolygon(polygon, center, radius) {
    // Convert radius from meters to degrees approximately (only works for small distances)
    const radiusInDegrees = radius / 111000;
  
    // Step 1: Check if the circle's center is inside the polygon
    if (isPointInPolygon(polygon, center)) {
      return true;
    }
  
    // Helper function to calculate the distance from a point to a line segment
    function distanceFromPointToLineSegment(p, p0, p1) {
      const [x, y] = p;
      const [x1, y1] = p0;
      const [x2, y2] = p1;
  
      const A = x - x1;
      const B = y - y1;
      const C = x2 - x1;
      const D = y2 - y1;
  
      const dot = A * C + B * D;
      const lenSq = C * C + D * D;
      let param = -1;
      if (lenSq !== 0) { //in case of 0 length line
        param = dot / lenSq;
      }
  
      let xx, yy;
  
      if (param < 0) {
        xx = x1;
        yy = y1;
      } else if (param > 1) {
        xx = x2;
        yy = y2;
      } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
      }
  
      const dx = x - xx;
      const dy = y - yy;
      return Math.sqrt(dx * dx + dy * dy);
    }
  
    // Step 2: Check if any polygon edge intersects the circle
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i++) {
      const dist = distanceFromPointToLineSegment(center, polygon[i], polygon[j]);
      if (dist <= radiusInDegrees) {
        return true;
      }
    }
  
    // Step 3: Check if any polygon vertex is inside the circle
    for (let i = 0; i < polygon.length; i++) {
      const dx = center[0] - polygon[i][0];
      const dy = center[1] - polygon[i][1];
      if (Math.sqrt(dx * dx + dy * dy) <= radiusInDegrees) {
        return true;
      }
    }
  
    return false;
  }
  
  

    function updateWarnings() {
        fetch(url, {
           
               method: 'GET',
               cache: "no-cache",
              
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
                   setWarnings(responseJson)
                 
                   const position = [lon, lat];
                   console.log("position: "+position)
                   //const found=[findWarningAreaForPosition(responseJson, position)]
                   const found=[findAllWarningAreasForPosition(responseJson, position, 50000)]
                   
                   console.log("found areas: "+JSON.stringify(found)); // This will log all warning areas that include the given position
                   setFoundWarnings(found);              
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
       updateWarnings()
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

    return (
        <View style={{ flex: 2, minWidth : 190, maxWidth : 430,  height : 200, margin: 1, padding : 2 ,borderWidth : 1, alignItems: 'flex-start', paddingHorizontal : 5, borderColor : 'black', backgroundColor : (foundWarnings[0]!=null)  ? foundWarnings[0].warningLevel.code.toLowerCase() : "gray" }}>
         
            { !loaded  
                ? <Text style={{color : "white"}}>No warning data loaded  </Text>
                : <View>
                    { (foundWarnings[0]!=null)  ? 
                        <View style={{ flexDirection : 'column',alignItems: 'flex-start', padding:0, borderWidth : 0, borderColor : 'black', backgroundColor : foundWarnings[0].warningLevel.code.toLowerCase()}}>
                            <Text style={{color : 'black'}}>{foundWarnings[0].areaName.sv}</Text>
                            <Text style={{color : 'black'}}>{foundWarnings[0].warningLevel.code}</Text>
                            <Text style={{color : 'black'}}>{foundWarnings[0].eventDescription.sv}</Text>
                            <Text style={{color : 'black'}}>{foundWarnings[0].descriptions[0].title.sv}</Text>
                            <Text style={{color : 'black'}}>{foundWarnings[0].descriptions[0].text.sv}</Text>
                        </View> 
                
                    : <Text style={{color : "white"}}>No warnings for current position  </Text>
                    }
                    </View>
            }
        </View>
    )
  
        
   

}

//  <Text style={{color : 'white'}}>{foundWarnings[0].warningLevel.code}</Text>
//<Text style={{color : 'white'}}>{foundWarnings[0].eventDescription.code}</Text>
              
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
