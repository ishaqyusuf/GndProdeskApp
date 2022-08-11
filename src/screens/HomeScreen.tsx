import React, { useState } from 'react';
 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import { NavigatorScreenParams } from '@react-navigation/native';
import ProjectScreen from './ProjectScreen';
import OptionsScreen from './OptionsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import ProjectStack from '@src/routes/projects';
 
type BottomTabParams = {
  TabStack: NavigatorScreenParams<SimpleStackParams>;
  TabProjects: undefined;
  TabTasks: undefined;
  TabInstallations: undefined;
  TabProductions: undefined;
  TabOptions: undefined;
};
export type SimpleStackParams = {
  Projects: { author: string } | undefined;
  NewsFeed: { date: number };
  Albums: undefined;
};
const getTabBarIcon =
  (name: string) =>
  ({ color, size }: { color: string; size: number }) =>
    <Icon name={name} type="ionicon" color={color} size={size} />;

const BottomTabs = createBottomTabNavigator<BottomTabParams>();

let _route = (title,focusedIcon,unfocusedIcon) => true && {
  title,focusedIcon,unfocusedIcon,key:title
}
const Stack = createNativeStackNavigator();
function HomeStack ({navigation})   {
  const [routes] = useState([
   _route('Project','folder','folder-outline'),
  ])
  return ( 
         <BottomTabs.Navigator screenOptions={{
          
    }}> 
      <BottomTabs.Screen name="TabOptions" component={OptionsScreen} options={{
        title: 'More',
        // tabBarBadge: 2,
        tabBarIcon: getTabBarIcon('menu-outline')
      }} /> 
      {/* <BottomTabs.Screen name="TabProjects" component={ProjectStack} options={{
        title: 'Projects',  
          // tabBarBadge: 2,
        tabBarIcon: getTabBarIcon('folder-outline')
      }} /> */}
    </BottomTabs.Navigator>
       
    
  );
}
export default HomeStack;