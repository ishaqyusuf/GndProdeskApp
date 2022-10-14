import { BottomSheetComponent, useBottomSheet } from '@src/components/BottomSheet';
import { DataDisplay } from '@src/components/Content';
import ListPage, { _sheetOption } from '@src/components/ListPage';
import { DeleteMenuItem, MenuItem } from '@src/components/MenuItem';
import useConsole from '@src/utils/use-console';
import React, { Fragment, useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Chip, Divider, Text } from 'react-native-paper';

import useList from '../utils/use-list';

const EmployeesScreen = ({ navigation, route, ...props }) => {
  const list = useList('employees', {
    _url: 'v1/employees',
    _query: {
      ...(route?.params?.query ?? {}),
    },
    _cache: true,
    // _debug: true,
  });
  const option = useBottomSheet();

  function _click(item) {
    option.open(item);
  }
  useEffect(() => {
    list.load();
    useConsole.logScreen('Employees');
  }, []);
  function ListItem({ item, readonly = false }) {
    return (
      <Pressable
        onPress={() => {
          !readonly && _click(item);
        }}
      >
        <View className="px-4 py-3 border-b border-gray-300">
          <Text className="font-bold capitalize">{item.name}</Text>
          <Text>{item.role}</Text>
        </View>
        {readonly && (
          <View>
            {/* <DataDisplay title="Home Key" value={item.home_key} />
            <DataDisplay title="Status">
              <Text>{item.status}</Text>
              <Text>{item.sub_status}</Text>
            </DataDisplay> */}
          </View>
        )}
      </Pressable>
    );
  }
  return (
    <ListPage
      {...{
        navigation,
        canGoBack: true,
        header: true,
        title: list.extras.title,
        subtitle: list.extras.subtitle,
        addAction() {
          navigation.navigate('EmployeeEditModal');
        },
        loader: list,
      }}
    >
      {list.items.map((item, i) => (
        <ListItem key={i} item={item} />
      ))}
      <BottomSheetComponent ctx={option}>
        <ListItem item={option.data} readonly={true} />

        <MenuItem
          title="Edit"
          onPress={() =>
            navigation.navigate('EmployeeEditModal', {
              data: option.data,
            })
          }
        />

        <DeleteMenuItem menu={option} list={list} />
      </BottomSheetComponent>
    </ListPage>
  );
};
export default EmployeesScreen;
const styles = StyleSheet.create({});
