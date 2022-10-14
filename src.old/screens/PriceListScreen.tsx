import { BottomSheetComponent, useBottomSheet } from '@src/components/BottomSheet';
import { DataDisplay } from '@src/components/Content';
import ListPage, { _sheetOption } from '@src/components/ListPage';
import { DeleteMenuItem, MenuItem } from '@src/components/MenuItem';
import useConsole from '@src/utils/use-console';
import { ColorLabel } from '@src/utils/use-status-colors';
import React, { Fragment, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip, Divider, Text, TouchableRipple } from 'react-native-paper';

import useList from '../utils/use-list';

//
// const auth = Firebase.auth();

const PriceListScreen = ({ navigation, route, ...props }) => {
  const list = useList('price-list', {
    _url: 'v1/orders',
    _query: {
      ...(route?.params?.query ?? {}),
    },
    _extras: {
      title: 'Orders',
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
  function Item({ item, readonly = false }) {
    let Container = readonly ? View : TouchableRipple;
    return (
      <Container
        rippleColor="rgba(0, 0, 0, .32)"
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
            <DataDisplay title="Order No" value={item.order_id} />
            <DataDisplay title="Name" value={item.name} />
            <DataDisplay title="Phone" value={item.phone} />
            <DataDisplay title="Supplier" value={item.supplier} />
            <DataDisplay title="Status">
              <ColorLabel status={item.status} />
              <Text>{item.status_date}</Text>
            </DataDisplay>

            <MenuItem title="Edit"></MenuItem>
            <DeleteMenuItem list={list} menu={option}></DeleteMenuItem>
          </View>
        )}
      </Container>
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
          navigation.navigate('PriceEditScreen');
        },
        loader: list,
      }}
    >
      {list.items.map((item, i) => (
        <Item key={i} item={item} />
      ))}

      <BottomSheetComponent ctx={option}>
        <Item item={option.data} readonly={true} />

        <DeleteMenuItem menu={option} list={list} />
      </BottomSheetComponent>
    </ListPage>
  );
};
export default PriceListScreen;
const styles = StyleSheet.create({});
