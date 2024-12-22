import Navigation from '@navigation/Navigation';
import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';

const App = () => {
  console.log("App started");

  useEffect(() => {
    
    // StatusBar.setHidden(false);
    // StatusBar.setBarStyle('light-content');
    // StatusBar.setBackgroundColor('transparent');
    
  }, []);

  return (
    <Navigation/>
  )
 
};

export default App;
