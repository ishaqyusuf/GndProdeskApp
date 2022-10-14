import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack"

 import React from "react";
const Stack = createStackNavigator();
export default function composeNavigationStack(stacks,props:any = {},options: StackNavigationOptions = {}) : any {
        return ( 
             
              <Stack.Navigator {...props} screenOptions={options}>
            {
                stacks.map(stack => 
                (
                    <Stack.Screen {...stack}/>
                    )
                    )
                }
        </Stack.Navigator> 
         
        )
}
export const createNavItem = (name,component,options = {})  => {
  return {
    name,component,
    options: {
      title: name,
      ...options
    }
  }
}