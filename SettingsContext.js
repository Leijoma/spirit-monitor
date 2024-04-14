// SettingsContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [appSettings, setAppSettings] = useState({
    EnginePanel: true,
    EditSignalKSettings: true,
    ServerSettings: true,
    EditSignalKSettings:  false,
    // Default settings
  });

  useEffect(() => {
    const loadSettings = async () => {
      const storedSettings = await AsyncStorage.getItem('panelSettings');
      if (storedSettings) {
        setAppSettings(JSON.parse(storedSettings));
        AsyncStorage.setItem('panelSettings', storedSettings);
      }

    };

    loadSettings();
  }, []);

  const saveAppSettings = async (newSettings) => {
    setAppSettings(newSettings);
    await AsyncStorage.setItem('panelSettings', JSON.stringify(newSettings));
  };

  return (
    <SettingsContext.Provider value={{ appSettings, saveAppSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
