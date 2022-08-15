import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppHomeScreen from '@src/screens/AppHomeScreen';
import React from 'react';
import OptionsScreen from '@src/screens/OptionsScreen';
import ProjectScreen from '@src/screens/ProjectScreen';
import UnitsScreen from '@src/screens/UnitsScreen';
import TasksScreen from '@src/screens/TasksScreen';
import { useAuth } from '@src/auth-provider';
import ProjectEditScreen from '@src/screens/ProjectEditScreen';
import UnitEditScreen from '@src/screens/UnitEditScreen';
import BuildersScreen from '@src/screens/BuildersScreen';
import CustomerServiceScreen from '@src/screens/CustomerServiceScreen';
import OrdersScreen from '@src/screens/OrdersScreen';
// const BaseStack = composeNavigationStack([
//     // createNavItem('AppHomeScreen',
//     // AppHomeScreen)
// ],{},{
//      headerShown: false,
// })
// export default  BaseStack;

const Stack = createNativeStackNavigator();
function BaseStack({ navigation }) {
  const auth = useAuth();
  return (
    auth.state.token && (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="AppHomeScreen" component={AppHomeScreen} />
        <Stack.Screen
          name="ProjectsScreen"
          options={{
            title: 'Projects',
          }}
          component={ProjectScreen}
        />
        <Stack.Screen
          name="ProjectEditScreen"
          options={{
            title: 'Edit Project',
          }}
          component={ProjectEditScreen}
        />

        <Stack.Screen
          name="UnitsScreen"
          options={{
            title: 'Units',
          }}
          component={UnitsScreen}
        />
        <Stack.Screen
          name="UnitEditScreen"
          options={{
            title: 'Unit Edit',
          }}
          component={UnitEditScreen}
        />

        <Stack.Screen
          name="BuildersScreen"
          options={{
            title: 'Units',
          }}
          component={BuildersScreen}
        />
        <Stack.Screen
          name="TasksScreen"
          options={{
            title: 'Tasks',
          }}
          component={TasksScreen}
        />

        <Stack.Screen
          name="CustomerServicesScreen"
          options={{
            title: 'Customer Services',
          }}
          component={CustomerServiceScreen}
        />

        <Stack.Screen
          name="OrdersScreen"
          options={{
            title: 'Orders',
          }}
          component={OrdersScreen}
        />

        <Stack.Screen
          name="OptionsScreen"
          options={{
            headerShown: true,
            title: 'More',
          }}
          component={OptionsScreen}
        />
      </Stack.Navigator>
    )
  );
}
export default BaseStack;
