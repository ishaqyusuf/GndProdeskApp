import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Fragment, useEffect, useRef } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { navigationRef } from './helpers/NavigationHelper';
import DashboardScreen from './screens/DashboardScreen/DashboardScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';

const Stack = createNativeStackNavigator();

const Router = ({}) => {
  const routeNameRef = useRef();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : undefined} enabled>
      {/* <SafeAreaView> */}
      <NavigationContainer
        ref={navigationRef}
        onReady={() => (routeNameRef.current = navigationRef.current.getCurrentRoute().name)}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.current.getCurrentRoute().name;
          if (previousRouteName !== currentRouteName) {
            // captureScreen({ screenName: currentRouteName });
          }
          // Save the current route name for later comparison
          routeNameRef.current = currentRouteName;
        }}
      >
        <View>
          <Text>Hello WOrld</Text>
        </View>
        {/* <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}> */}
        {/* {!isLoggedIn ? (
            <Fragment>
              <Stack.Screen name="Dashboard" component={DashboardScreen} />
            </Fragment>
          ) : (
            <Fragment>
              <Stack.Screen name="Login" component={LoginScreen} />
            </Fragment>
          )} */}
        {/* </Stack.Navigator> */}
      </NavigationContainer>
      {/* </SafeAreaView> */}
    </KeyboardAvoidingView>
  );
};
export default Router;
