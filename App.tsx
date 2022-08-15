import React, { useState } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TailwindProvider } from 'tailwindcss-react-native';
import { useHeader } from './src/utils/use-fetch';  
import Router from './src/router';  
import { LogBox } from "react-native";
export default function App() {
  // useHeader.init() 
  LogBox.ignoreLogs([

  ])
  return (
    <SafeAreaProvider> 
      <TailwindProvider>
        <Router />
      </TailwindProvider> 
      
      
    </SafeAreaProvider>
  );
}
