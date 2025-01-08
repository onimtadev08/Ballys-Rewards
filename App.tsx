//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Navigation from './src/components/Navigation';
import SplashScreen from 'react-native-splash-screen';

// ios run ## npm run ios -- --udid="F27F732D-763A-407E-B054-5171302504A5"
// npm run ios -- --udid="00008120-001238D12652201E"

// create a component
const App = () => {

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 300)
  })
  return (
    <Navigation />
  );
};

//make this component available to the app
export default App;
