import React, { useContext } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperLightTheme,
  Divider,
  List,
  Provider as PaperProvider,
} from 'react-native-paper';
import { Icon } from '@rneui/themed';
import { useAuth } from '@src/redux/reducers/auth';
// const auth = Firebase.auth();

const OptionsScreen = ({ navigation }) => {
  const { handleLogout } = useAuth();
  async function _handleLogout() {
    await handleLogout();
    navigation.navigate('Auth');
  }
  const _listItem = (name, icon = '', action = null, type = 'ionicon') =>
    true && { name, type, icon, action };
  function to(screen) {
    return () => navigation.navigate(screen);
  }
  const list = [
    _listItem('Projects', 'albums-outline', to('ProjectsScreen')),
    _listItem('Units', 'business-outline', to('UnitsScreen')),
    _listItem('Tasks', 'layers-outline', to('TasksScreen')),
    _listItem('Builders', 'podium-outline', to('BuildersScreen')),
    _listItem('Invoices', 'wallet-outline'),
    _listItem('Employees', 'people-outline', to('EmployeesScreen')),
    _listItem('Roles', 'git-pull-request-outline', to('RolesScreen')),
    _listItem('Orders', 'cart-outline', to('OrdersScreen')),
    _listItem('Price List', 'dollar-sign', to('PriceListScreen'), 'feather'),
    _listItem('Customer Services', 'help-buoy-outline', to('WorkOrdersScreen')),
    _listItem('EPO', 'help-buoy-outline', to('PurchaseOrdersScreen')),
    _listItem('Profile', 'settings-outline', to('ProfileScreen')),
  ];
  return (
    <ScrollView style={{ flex: 1 }}>
      {list.map((item, i) => (
        <List.Item
          key={i}
          onPress={() => {
            item.action && item.action();
          }}
          title={(props) => <Text className="px-2 pb-1s">{item.name}</Text>}
          left={(props) => <Icon name={item.icon} type={item.type} />}
        />
      ))}
      <Pressable className="flex-row items-center p-2 space-x-4" onPress={_handleLogout}>
        <Icon name="log-out-outline" type="ionicon" />
        <Text className=" text-red-800">Logout</Text>
      </Pressable>
    </ScrollView>
  );
};
export default OptionsScreen;
const styles = StyleSheet.create({});
