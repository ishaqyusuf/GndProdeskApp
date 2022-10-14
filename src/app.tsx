import React, { useEffect } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import Route from './route';
import { TailwindProvider } from 'tailwindcss-react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  //

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <TailwindProvider>
            <Route />
          </TailwindProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
