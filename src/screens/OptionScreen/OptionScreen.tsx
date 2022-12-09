import React, { useEffect } from 'react';
import { Pressable, ScrollView, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { List } from 'react-native-paper';
import { onLogOut } from '../../actions/auth';
import { Icon } from '@rneui/themed';
const OptionScreen = ({ navigation }) => {
  const dispatch = useDispatch<any>();

  const _listItem = (name, icon = '', action = null, type = 'ionicon') =>
    true && { name, type, icon, action };
  const to = (screen: string) => navigation.navigate(screen);
  async function _handleLogout() {
    dispatch(onLogOut());
  }
  const list: any[] = [
    _listItem('Projects', 'albums-outline', to('ProjectsScreen')),
    // _listItem('Units', 'business-outline', to('UnitsScreen')),
    // _listItem('Tasks', 'layers-outline', to('TasksScreen')),
    // _listItem('Builders', 'podium-outline', to('BuildersScreen')),
    // _listItem('Invoices', 'wallet-outline'),
    // _listItem('Employees', 'people-outline', to('EmployeesScreen')),
    // _listItem('Roles', 'git-pull-request-outline', to('RolesScreen')),
    // _listItem('Orders', 'cart-outline', to('OrdersScreen')),
    // _listItem('Price List', 'dollar-sign', to('PriceListScreen'), 'feather'),
    // _listItem('Customer Services', 'help-buoy-outline', to('WorkOrdersScreen')),
    // _listItem('EPO', 'help-buoy-outline', to('PurchaseOrdersScreen')),
    // _listItem('Profile', 'settings-outline', to('ProfileScreen')),
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

export default OptionScreen;
