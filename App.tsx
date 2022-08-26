import React, { useMemo, useReducer, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TailwindProvider } from 'tailwindcss-react-native';

import Router from './src/router';
import AppStateProvider from './src/utils/app-state-provider';
import { LogBox } from 'react-native';
export default function App() {
  // useHeader.init()
  LogBox.ignoreLogs(['ImmutableStateInvariantMiddleware']);

  return (
    <SafeAreaProvider>
      <AppStateProvider>
        <TailwindProvider>
          <Router />
        </TailwindProvider>
      </AppStateProvider>
    </SafeAreaProvider>
  );
}
