import { BottomSheetComponent, useBottomSheet } from '@src/components/BottomSheet';
import { DataDisplay } from '@src/components/Content';
import ListPage, { _sheetOption } from '@src/components/ListPage';
import { DeleteMenuItem, MenuItem } from '@src/components/MenuItem';
import { BottomListSelect, searchContext } from '@src/scenes/ListSearchScene';
import useConsole from '@src/utils/use-console';
import { ColorLabel } from '@src/utils/use-status-colors';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import useList from '../utils/use-list';

const WorkOrdersScreen = ({ navigation, route, ...props }) => {
  const list = useList({
    _url: 'v1/customer-services',
    _query: {
      ...(route?.params?.query ?? {}),
    },
    _transform(item) {
      return {
        ...item,
      };
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

  function Item({ item, readonly = false }) {
    return (
      <Pressable
        onPress={() => {
          !readonly && _click(item);
        }}
      >
        <View className="px-4 py-3 border-b border-gray-300">
          <Text className="font-bold capitalize">{item.app_title}</Text>
          <Text>{item.meta.project_title}</Text>
        </View>
        {readonly && (
          <View>
            <DataDisplay title="Appointment">
              <Text>{item.meta.app_date}</Text>
              <Text>{item.meta.coe}</Text>
            </DataDisplay>
            <DataDisplay title="Customer">
              <Text>{item.meta.home_owner}</Text>
              <Text>{item.meta.home_phone}</Text>
            </DataDisplay>
            <DataDisplay title="Job">
              <Text>{item.meta.project_name}</Text>
              <Text>
                Lot: {item.meta.lot}, Block: {item.meta.block}
              </Text>
              <Text>{item.meta.home_address}</Text>
              <Text>{item.meta.work_description}</Text>
            </DataDisplay>
            <DataDisplay title="Request By">
              <Text>
                {item.meta.request_by} - {item.meta.request_date}
              </Text>
            </DataDisplay>
            <DataDisplay title="Tech">
              <Text>{item.meta.tech_name ?? 'Not Assigned'}</Text>
            </DataDisplay>
            <DataDisplay title="Status">
              <ColorLabel status={item.status} />
              <Text>{item.meta.status_date}</Text>
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
        title: list.extras.title,
        subtitle: list.extras.subtitle,
        addAction() {
          navigation.navigate('WorkOrderEditScreen', {
            list,
          });
        },
        loader: list,
      }}
    >
      {list.items.map((item, i) => (
        <Item key={i} item={item} />
      ))}

      <BottomSheetComponent ctx={option}>
        <Item item={option.data} readonly={true} />
        <Pressable
          onPress={() => {
            navigation.navigate('Search', {
              ctx: searchContext.work_order_assign_tech,
              onSelect(user, value) {
                list.updateItem(
                  {
                    meta_update: true,
                    tech_name: user.name,
                    tech_id: user.id,
                  },
                  option.data.id
                );
              },
            });
          }}
        >
          <MenuItem title="Assign Tech" />
        </Pressable>

        <MenuItem
          title="Edit"
          onPress={() =>
            navigation.navigate('WorkOrderEditScreen', {
              data: option.data,
              list,
            })
          }
        />
        <BottomListSelect
          onSelect={({ status }) => {
            list
              .updateItem(
                {
                  // meta_update: true,
                  status,
                },
                option.data.id
              )
              .then((c) => {});
          }}
          ctx={searchContext.work_order_status}
        >
          <MenuItem title="Update Status" />
        </BottomListSelect>
        <DeleteMenuItem menu={option} list={list} />
      </BottomSheetComponent>
    </ListPage>
  );
};
export default WorkOrdersScreen;
const styles = StyleSheet.create({});
