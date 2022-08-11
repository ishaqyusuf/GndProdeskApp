import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TailwindProvider } from 'tailwindcss-react-native';
import { useHeader } from './src/utils/use-fetch';  
import Router from './src/router';  
export default function App() {
  // useHeader.init() 
  return (
    <SafeAreaProvider> 
      <TailwindProvider>
        {/* <RouteIndex /> */}
        <Router />
      </TailwindProvider> 
      
      
    </SafeAreaProvider>
  );
}
