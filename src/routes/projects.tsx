 import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProjectScreen from "@src/screens/ProjectScreen";
import UnitsScreen from "@src/screens/UnitsScreen";
import composeNavigationStack from "@src/utils/composer";
import { useLayoutEffect } from "react";

   const Stack = createStackNavigator();

export default function ProjectsStack({  screenOptions,
    navigation
}) {
     useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
    return ( 
            <Stack.Navigator  screenOptions={screenOptions}>
                <Stack.Screen name="Projects" component={ProjectScreen}/>
                <Stack.Screen name="Units" component={UnitsScreen}/>
            </Stack.Navigator>
        
        )
}