import { BottomSheetComponent, useBottomSheet } from '@src/components/BottomSheet';
import { DataDisplay } from '@src/components/Content';
import ListPage, { _sheetOption } from '@src/components/ListPage';
import { DeleteMenuItem, MenuItem } from '@src/components/MenuItem';
import useConsole from '@src/utils/use-console';
import React, { Fragment, useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Chip, Divider, Text } from 'react-native-paper';

import useList from '../utils/use-list';

//
// const auth = Firebase.auth();

const OrderScreen = ({ navigation, route, ...props }) => {
  const list = useList({
    _url: 'v1/orders',
    _query: {
      ...(route?.params?.query ?? {}),
    },
    _extras: {
      title: 'Units',
    },
    _transformExtras(e) {
      if (!e) e = {};
      if (e.project) {
        e.title = e.project.title;
        e.subtitle = e.project.builder_name;
      } else {
        e.title = 'Units';
      }
      return e;
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
    useConsole.logScreen('PROJECTS');
  }, []);
  function addAction() {
    // /
  }
  function UnitItem({ item, readonly = false }) {
    return (
      <Pressable
        onPress={() => {
          !readonly && _click(item);
        }}
      >
        <View className="px-4 py-3 border-b border-gray-300">
          <Text className="font-bold capitalize">{item.app_title}</Text>
          <Text>{item.project_title}</Text>
        </View>
        {readonly && (
          <View>
            <DataDisplay title="Home Key" value={item.home_key} />
            <DataDisplay title="Status">
              <Text>{item.status}</Text>
              <Text>{item.sub_status}</Text>
            </DataDisplay>

            <Text className="font-bold">Invoicing</Text>
            <Divider />
            <Chip>{item.sum_due}</Chip>
            <Chip>{item.sum_chargeback}</Chip>
            <Chip>{item.sum_paid}</Chip>
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
          navigation.navigate('UnitEditScreen');
        },
        loader: list,
      }}
    >
      {list.items.map((item, i) => (
        <UnitItem key={i} item={item} />
      ))}

      <BottomSheetComponent ctx={option}>
        <UnitItem item={option.data} readonly={true} />
        <Text className="text-lg mb-6 font-bold">{option.data.headline}</Text>
        <DataDisplay title="Status" value={option.data.sub_status} />
        <DataDisplay title="Builder" value={option.data.builder_name} />
        {/* <DataDisplay title="" value="" />
        <DataDisplay title="" value="" /> */}
        <MenuItem
          title="Edit Unit"
          onPress={() =>
            navigation.navigate('UnitEditScreen', {
              data: option.data,
            })
          }
        />
        <MenuItem
          title="Edit Costs"
          onPress={() =>
            navigation.navigate('UnitCostEditScreen', {
              data: option.data,
            })
          }
        />
        <MenuItem
          title="Unit Tasks"
          onPress={() =>
            navigation.navigate('TasksScreen', {
              query: {
                unit_slug: option.data.slug,
                task_page: 'task',
              },
            })
          }
        />
        <DeleteMenuItem menu={option} list={list} />
      </BottomSheetComponent>
    </ListPage>
  );
};
export default OrderScreen;
const styles = StyleSheet.create({});
