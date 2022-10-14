import React, { useRef, Fragment } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from './screens/DashboardScreen/DashboardScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import { useDispatch, useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const dispatch = useDispatch();
  const routeNameRef = useRef();

  const isLoggedIn = useSelector<any>((state) => state.auth.isLoggedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        {!isLoggedIn ? (
          <Fragment>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Fragment>
        ) : (
          <Fragment>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
          </Fragment>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
