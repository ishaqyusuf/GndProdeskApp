import React from "react";
 

import AuthLoading from './scenes/auth/AuthLoading';
import AuthProvider from './auth-provider';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { NavigationContainer } from '@react-navigation/native';
import BaseStack from './routes/base';

const Stack = createNativeStackNavigator();
//APP ROUTES STACK
 

// const Navigator = createAppContainer(AppStack);

export default function Router(props) { 
  return (
    <AuthProvider>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false 
      }}  initialRouteName='Loading'>
          <Stack.Screen name="Loading" component={AuthLoading}/>
          <Stack.Screen name="Auth" component={LoginScreen}/>
          <Stack.Screen name="App" component={BaseStack}/>
          {/*  */}
        </Stack.Navigator>
          </NavigationContainer>
    </AuthProvider> 
  );
}
