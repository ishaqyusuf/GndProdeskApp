import React, { Fragment } from 'react';

import AuthLoading from './scenes/auth/AuthLoading';
import LoginScreen from './screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import OptionsScreen from '@src/screens/OptionsScreen';
import ProjectsScreen from '@src/screens/ProjectsScreen';
import UnitsScreen from '@src/screens/UnitsScreen';
import TasksScreen from '@src/screens/TasksScreen';
import ProjectEditScreen from '@src/modals/ProjectEditScreen';
import UnitEditScreen from '@src/modals/UnitEditScreen';
import BuildersScreen from '@src/screens/BuildersScreen';

import AppHomeScreen from '@src/screens/AppHomeScreen';
import OrdersScreen from '@src/screens/OrdersScreen';
import BuilderEditScreen from './modals/BuilderEditScreen';
import UnitCostEditScreen from './modals/UnitCostEditScreen';
import WorkOrdersScreen from './screens/WorkOrdersScreen';
import WorkOrderEditScreen from './modals/WorkOrderEditScreen';
import OrderEditScreen from './modals/OrderEditScreen';
import OrderScreen from './screens/OrderScreen';
import EmployeeScreen from './screens/EmployeeScreen';
import RoleEditModal from './modals/RoleEditModal';
import EmployeeEditModal from './modals/EmployeeEditModal';
import PurchaseOrdersScreen from './screens/PurchaseOrdersScreen';
import PurchaseOrderEdit from './modals/PurchaseOrderEdit';
import ListSearchScene from './scenes/ListSearchScene';
import FilterScene from './scenes/FilterScene';
import PriceListScreen from './screens/PriceListScreen';
import PriceEditScreen from './modals/PriceEditScreen';
import EmployeesScreen from './screens/EmployeesScreen';
import RolesScreen from './screens/RolesScreen';
import { Provider } from 'react-redux';
const Stack = createNativeStackNavigator();
import store from './redux/store';
//APP ROUTES STACK

// const Navigator = createAppContainer(AppStack);

export default function Router(props) {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Loading"
        >
          <Stack.Screen name="Loading" component={AuthLoading} />
          <Stack.Screen name="Auth" component={LoginScreen} />
          <Stack.Group>
            <Stack.Screen name="App" component={AppHomeScreen} />
            <Stack.Screen
              name="ProjectsScreen"
              options={{
                title: 'Projects',
              }}
              component={ProjectsScreen}
            />

            <Stack.Screen
              name="UnitsScreen"
              options={{
                title: 'Units',
              }}
              component={UnitsScreen}
            />
            <Stack.Screen
              name="WorkOrdersScreen"
              options={{
                title: 'Work Orders',
              }}
              component={WorkOrdersScreen}
            />
            <Stack.Screen
              name="PriceListScreen"
              options={{
                title: 'Price List',
              }}
              component={PriceListScreen}
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
              name="OrdersScreen"
              options={{
                title: 'Orders',
              }}
              component={OrdersScreen}
            />
            <Stack.Screen
              name="EmployeesScreen"
              options={{
                title: 'Employees',
              }}
              component={EmployeesScreen}
            />
            <Stack.Screen
              name="RolesScreen"
              options={{
                title: 'Roles',
              }}
              component={RolesScreen}
            />
            <Stack.Screen
              name="PurchaseOrdersScreen"
              options={{
                title: 'Purchase Orders',
              }}
              component={PurchaseOrdersScreen}
            />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen
              name="Search"
              options={{
                title: 'Search',
              }}
              component={ListSearchScene}
            />
            <Stack.Screen
              name="ProjectEditScreen"
              options={{
                title: 'Edit Project',
              }}
              component={ProjectEditScreen}
            />
            <Stack.Screen
              name="PurchaseOrderEdit"
              options={{
                title: 'Edit Order',
              }}
              component={PurchaseOrderEdit}
            />
            <Stack.Screen
              name="BuilderEditScreen"
              options={{
                title: 'Edit Builder',
              }}
              component={BuilderEditScreen}
            />
            <Stack.Screen
              name="UnitEditScreen"
              options={{
                title: 'Unit Edit',
              }}
              component={UnitEditScreen}
            />
            <Stack.Screen
              name="WorkOrderEditScreen"
              options={{
                title: 'Work Order Edit',
              }}
              component={WorkOrderEditScreen}
            />
            <Stack.Screen
              name="OrderEditScreen"
              options={{
                title: 'Order Edit',
              }}
              component={OrderEditScreen}
            />
            <Stack.Screen
              name="UnitCostEditScreen"
              options={{
                title: 'Unit Cost',
              }}
              component={UnitCostEditScreen}
            />
            <Stack.Screen
              name="PriceEditScreen"
              options={{
                title: 'Price Edit',
              }}
              component={PriceEditScreen}
            />
            <Stack.Screen
              name="FilterScene"
              options={{
                title: 'Filter',
              }}
              component={FilterScene}
            />
            <Stack.Screen
              name="OptionsScreen"
              options={{
                headerShown: true,
                title: 'More',
              }}
              component={OptionsScreen}
            />
            <Stack.Screen
              name="OrderScreen"
              options={{
                title: 'Orders',
              }}
              component={OrderScreen}
            />
            <Stack.Screen
              name="EmployeeScreen"
              options={{
                title: 'Orders',
              }}
              component={EmployeeScreen}
            />
            <Stack.Screen
              name="EmployeeEditModal"
              options={{
                title: 'Employee',
              }}
              component={EmployeeEditModal}
            />
            <Stack.Screen
              name="RoleEditModal"
              options={{
                title: 'Role',
              }}
              component={RoleEditModal}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
