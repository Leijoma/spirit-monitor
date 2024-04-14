import React, { createContext, useState, useEffect, useContext } from 'react';
import { AppState,View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {pathSettings} from './assets/config'; // Assuming settings are in a separate file


export const SignalkContext = createContext();

export const SignalkProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState([]);
  const [appInForeground, setAppInForeground] = useState(true);
  const [serverUrl, setServerUrl] = useState('');

  const [serverSettings, setServerSettings] = useState({url : "192.168.1.211", port : '3000', user : "magnus", password : "Molly123"});
  
  const [paths, setPaths] = useState([]);
  const [settings, setSettings] = useState(pathSettings ); 
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const defaultSettings = pathSettings;

  let ws;

  const processWebSocketData = (message) => {
    const timestamp = message.updates[0].timestamp; // Assuming there's always at least one update

    message.updates.forEach(update => {
      update.values.forEach(value => {
        const updateObject = {
          path: value.path,
          value: value.value,
          timestamp: timestamp,
          age : 0
        };

        setData(currentData => {
          const existingIndex = currentData.findIndex(u => u.path === updateObject.path);
          if (existingIndex !== -1) {
            // If the path exists, update the item at the existing index
            const updatedData = [...currentData];
            updatedData[existingIndex] = updateObject;
            return updatedData; // This updatedData array has the updated item
          } else {
            // If the path does not exist, add the new item
            return [...currentData, updateObject]; // This spreads the old data and adds the new item
          }
        });
      });
    });
  };

  
  const connect = async () => {
    try {
      const availablePaths = await fetchAvailablePaths();
      //console.log(availablePaths)
      if (!ws || ws.readyState !== ws.OPEN) { // Check if ws needs to be created or reconnected
       // ws = new WebSocket('ws://158.174.207.36:3000/signalk/v1/stream?subscribe=none');
        ws = new WebSocket('ws://'+serverUrl+'/signalk/v1/stream?subscribe=none');
        
       //urn:mrn:imo:mmsi:265027440
       //vessels.self
        var subscribe_msg = '{"context": "vessels.urn:mrn:imo:mmsi:265027440","subscribe": [{"path": "navigation.*","period": 1000},"path": "electrical.*","period": 1000},{"path": "tanks.*","period": 1000}]}'; // ,{"path": "*","period": 1000}
        var unsubscribe_all_msg = '{"context": "*","unsubscribe": [{"path": "*"}]}' 
       
        ws.onopen  = () => {
          setIsConnected(true)
          // connection opened
          console.log("Connected in context...");
          //setConnected(true)
          var login_msg ='{"requestId": "1234-45653-343454","login": {"user": "'+serverSettings.user+'","password": "'+serverSettings.password+'"}}'
          //console.log("login message: "+login_msg)
          ws.send(login_msg);  // send a message
        
        };
        
       
        ws.onmessage = (event) => {
          const message = JSON.parse(event.data);
          //console.log("message: "+JSON.stringify(message))
          if (message.name) 
            console.log(message.name)
          else if (message.login) {
            console.log("Logged in")
            //ws.send(login_msg);
            const token=message.login.token
            //const subs_msg='{"token" : "'+token+'" ,"context": "vessels.self","subscribe": [{"path": "environment.*","period": 1000},{"path": "navigation.*","period": 1000},"path": "electrical.*","period": 1000},{"path": "tanks.*","period": 1000}]}'; // ,{"path": "*","period": 1000}
              const subs_msg='{"token" : "'+token+'" ,"context": "vessels.urn:mrn:imo:mmsi:265027440","subscribe": [{"path": "environment.*","period": 1000},{"path": "navigation.*","period": 1000},{"path": "electrical.*","period": 1000},{"path": "tanks.*","period": 1000}]}';

            console.log("Subs mesage: "+subs_msg)
            ws.send(subs_msg);
          }
          else 
          {
             // Update data based on message type
          // (e.g., full update, delta, subscription response)
            //console.log("message received: "+JSON.stringify(message))
            //console.log("data received: "+JSON.stringify(data))
            processWebSocketData(message)
           // setData({ ...data, ...message });
          }    
        };
        ws.onclose = () => {
          setIsConnected(false), console.log('disconnected...')
          if (appInForeground) { // Check if app is in foreground
            console.log('Reconnecting...');
            connect(); // Attempt reconnection automatically
          }
        };
        // ... rest of your connection logic
      }
    } catch (error) {
      console.error('WebSocket connection error:', error);
    }
  };

  const close = async () => {
    ws.close
  }

  function replaceDotsWithSlashes(inputString) {
    return inputString.replace(/\./g, "/");
  }

  const fetchMetadata = async (path) => {
    try {
      //const response = await fetch(`${serverUrl}/signalk/v2/api/resources?type=self`, {
        //console.log("path: "+path + "  "+replaceDotsWithSlashes(path))
        const response = await fetch('http://'+serverUrl+'/signalk/v1/api/vessels/self/'+replaceDotsWithSlashes(path), {
        
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(`Error fetching paths: ${response.statusText}`);
      }

      const data = await response.json();
      // console.log("Extracted paths: " + extractPaths(data))
      //.log("received metadata: " + JSON.stringify(data))
      return data
    } 
    catch (error) {
      console.error('Error fetching paths:', error);
      return {}; // Return empty array on error
    }
  };

  function findPathsWithValue(obj, currentPath = '') {
    let paths = [];
    Object.keys(obj).forEach(key => {
        const newPath = currentPath ? `${currentPath}.${key}` : key;
        if (key === 'value') {
            paths.push(currentPath);
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            paths = paths.concat(findPathsWithValue(obj[key], newPath));
        }
    });
    return paths;
  }

  const fetchAvailablePaths = async () => {
    try {
      //const response = await fetch(`${serverUrl}/signalk/v2/api/resources?type=self`, {
        const response = await fetch('http://'+serverUrl+'/signalk/v1/api/vessels/self', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Error fetching paths: ${response.statusText}`);
      }

      const data = await response.json();
      // console.log("Extracted paths: " + extractPaths(data))
      //console.log("Extracted paths: " + findPathsWithValue(data))
      findPathsWithValue
      //const paths = data.entries.map((entry) => entry.path);

      return paths;
    } 
    catch (error) {
      console.error('Error fetching paths:', error);
      return []; // Return empty array on error
    }
  };

  const updateAge = () => {
      setData(currentData =>
        currentData.map(path => ({
          ...path,
          age: path.age + 1,
        }))
      );
  };

  useEffect(() => {
    const loadData = async () => {
      const storedData = await AsyncStorage.getItem('ss');
      if (storedData == null) {
       // alert("no server data stored");
       // setServerUrl("192.168.68.94:3000"); // This will indirectly trigger the useEffect below due to the state update
      } else {
        const serverObject = JSON.parse(storedData);
        // If you wish to use the serverObject's properties, uncomment the next line
        // setServerUrl(serverObject.url + ':' + serverObject.port);
       // setServerUrl(storedData.url+':'+storedData.port); // Placeholder for actual logic
      }
    };

    const loadServerSettings = async () => {
      try {
        const ss = await AsyncStorage.getItem('ss');
        if (ss) {
          console.log("Loaded server settings:", ss);
          ssp=JSON.parse(ss)
          setServerSettings(ssp);

          await AsyncStorage.setItem('ss', ss);
          setServerUrl(ssp.url+':'+ssp.port);
          console.log(ssp.url+':'+ssp.port)
        } else {
          console.log("No server settings found.");
        }
        } catch (error) {
        console.error('Error fetching paths:', error);
      } finally {
        setIsLoading(false);
      };
    }

    const loadSettings = async () => {
      try {
       // await AsyncStorage.removeItem('appSettings');
          const storedSettings = await AsyncStorage.getItem('appSettings');
          if (storedSettings) {
              setSettings(JSON.parse(storedSettings));
              console.log("Loaded settings:", storedSettings);
               AsyncStorage.setItem('appSettings', storedSettings);
          }
      } catch (error) {
          console.error('Failed to load settings:', error);
          setSettings(defaultSettings); // Ensure default settings are used in case of error
      } finally {
          setIsLoading(false);
      }
    };
    loadSettings();
    loadServerSettings();
   
    console.log("starting?");
    loadData();

    const intervalId = setInterval(updateAge, 1000);
    // Returning a cleanup function that clears the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // This useEffect is only triggered on component mount
  
  // useEffect to call connect when serverUrl changes
  useEffect(() => {
    // Ensure serverUrl is set before calling connect
    if (serverUrl) {
      console.log('Server URL is set, now connecting...');
      connect();
    }
  }, [serverUrl]); // This useEffect is triggered every time serverUrl changes
  
  // Your existing useEffect for AppState changes
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        console.log('Coming to the foreground');
        // Ensure reconnecting only if serverUrl is already set
        if (serverUrl) {
          connect();
        }
      } else {
        console.log('Going to the background');
        close();
      }
    };
    
    const subscription = AppState.addEventListener('change', handleAppStateChange);
  
    return () => {
      subscription.remove(); // Cleanup on component unmount
    };
  }, [serverUrl]); // Adding serverUrl as a dependency here as well, if connect/close logic depends on it


  useEffect(() => {
   
    return () => {
      if (ws) {
        close(); // Close ws on unmount
      }
      else {
        connect();
      }
    };
  }, []);

 

  const saveSettings = async (newSettings) => {
    console.log("Saving settings:", newSettings); // Before saving
    try {
      const jsonSettings = JSON.stringify(newSettings);
      await AsyncStorage.setItem('appSettings', jsonSettings);
      setSettings(newSettings); // Update context state to reflect new settings
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  
  const saveServerSettings = async (newSettings) => {
    console.log("Saving server settings:", newSettings); // Before saving
    try {
      const jsonSettings = JSON.stringify(newSettings);
      console.log("beforeSave: "+ jsonSettings )
      await AsyncStorage.setItem('ss', jsonSettings);
      console.log("Settings saved successfully.");
      setServerSettings(newSettings); // Update context state to reflect new settings
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  const subscribe = (path) => {
    // Implement subscription logic with WebSocket
    // Update data on successful subscription
  };

  const unsubscribe = (path) => {
    // Implement unsubscription logic with WebSocket
    // Update data on successful unsubscription
  };

  
  return (
    <SignalkContext.Provider value={{ data, isConnected, fetchMetadata, serverUrl,settings, serverSettings, saveServerSettings, saveSettings }}>
      {children}
    </SignalkContext.Provider>
  );
};


