import { useFocusEffect } from '@react-navigation/native';
import { BottomSheetComponent, useBottomSheet } from '@src/components/BottomSheet';
import { DataDisplay } from '@src/components/Content';
import ListPage, { _sheetOption } from '@src/components/ListPage';
import { DeleteMenuItem, MenuItem } from '@src/components/MenuItem';
import useConsole from '@src/utils/use-console';
import React, { useCallback, useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Chip, Text } from 'react-native-paper';

import useList from '../utils/use-list';

//
// const auth = Firebase.auth();

const UnitsScreen = ({ navigation, route, ...props }) => {
  let listName = [route?.params?.query?.project_slug, 'units'].filter(Boolean).join('-');
  const list = useList(listName, {
    _url: 'homes',
    _key: 'slug',
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
  useFocusEffect(
    useCallback(() => {
      console.log('UNIT SCREEN >>> ', listName);
      // list.load();
    }, [])
  );

  function UnitItem({ item, readonly = false }) {
    return (
      <Pressable
        android_ripple={{
          color: 'gray',
        }}
        onLongPress={() => {
          !readonly && _click(item);
        }}
        onPress={() => {}}
      >
        <View className="px-4 py-3 border-b border-gray-300">
          <Text className="font-bold uppercase">{item.app_title}</Text>
          <Text>{item.project_title}</Text>
        </View>
        {readonly && (
          <View className="py-4">
            <DataDisplay title="Home Key" value={item.home_key ?? 'No key'} />
            <DataDisplay title="Status">
              <Text>{item.status}</Text>
              <Text>{item.sub_status}</Text>
            </DataDisplay>

            {/* <Text className="font-bold">Invoicing</Text> */}
            <DataDisplay title="Status" value={item.sub_status} />
            <DataDisplay title="Builder" value={item.builder_name} />
            <DataDisplay title="Invoicing">
              <View className="flex-row space-x-2 mt-2">
                <Chip className="bg-sky-300">{item.sum_due}</Chip>
                <Chip className="bg-green-300">{item.sum_paid}</Chip>
                <Chip className="bg-yellow-300">{item.sum_chargeback ?? '-$0.00'}</Chip>
              </View>
            </DataDisplay>
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
        title: list.state?.extras?.title,
        subtitle: list.state?.extras?.subtitle,
        addAction() {
          navigation.navigate('UnitEditScreen', {
            list,
          });
        },
        loader: list,
      }}
      Item={UnitItem}
    >
      {/* {list.state.items.map((item, i) => (
        <UnitItem key={i} item={item} />
      ))} */}

      <BottomSheetComponent ctx={option}>
        {option.data && (
          <>
            <UnitItem item={option.data} readonly={true} />

            <MenuItem
              title="Edit Unit"
              onPress={() =>
                navigation.navigate('UnitEditScreen', {
                  data: option.data,
                  list,
                })
              }
            />
            <MenuItem
              title="Edit Costs"
              onPress={() =>
                navigation.navigate('UnitCostEditScreen', {
                  data: option.data,
                  list,
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
          </>
        )}
      </BottomSheetComponent>
    </ListPage>
  );
};
export default UnitsScreen;
const styles = StyleSheet.create({});
