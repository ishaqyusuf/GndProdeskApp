 
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppHomeScreen from "@src/screens/AppHomeScreen"; 
import { View } from "react-native";
import { Text } from "react-native-paper";
 import React from 'react';
import composeNavigationStack, { createNavItem } from "@src/utils/composer";
import AuthLoading from "@src/scenes/auth/AuthLoading";
import OptionsScreen from "@src/screens/OptionsScreen";
import ProjectScreen from "@src/screens/ProjectScreen";
import UnitsScreen from "@src/screens/UnitsScreen";
// const BaseStack = composeNavigationStack([
//     // createNavItem('AppHomeScreen',
//     // AppHomeScreen)
// ],{},{
//      headerShown: false,
// })
// export default  BaseStack;
 
const Stack = createNativeStackNavigator();
function BaseStack ({navigation}) {
    
    return (
       <Stack.Navigator screenOptions={{
        headerShown: false 
      }}   >
          <Stack.Screen name="AppHomeScreen" component={AppHomeScreen}/>
            <Stack.Screen name="ProjectsScreen" options={{
                
                title: 'Projects'
            }} component={ProjectScreen}/>
            <Stack.Screen name="UnitsPage" options={{
                 
                title: 'Units'
            }} component={UnitsScreen}/>
            <Stack.Screen name="OptionsScreen" options={{
                headerShown: true,
                title: 'More'
            }} component={OptionsScreen}/>
        </Stack.Navigator> 
    )
}

export default BaseStack;