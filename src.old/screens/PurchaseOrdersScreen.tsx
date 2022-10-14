import { BottomSheetComponent, useBottomSheet } from '@src/components/BottomSheet';
import ListPage, { _sheetOption } from '@src/components/ListPage';
import { DeleteMenuItem, MenuItem } from '@src/components/MenuItem';
import React, { Fragment, useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Appbar, Chip, List, Text } from 'react-native-paper';
import useList from '../utils/use-list';

//
// const auth = Firebase.auth();

const PurchaseOrdersScreen = ({ navigation, props }) => {
  const list = useList({
    _url: 'builders',
    _query: {},
  });
  const viewer = useBottomSheet();

  function _click(item) {
    viewer.open(item);
  }
  useEffect(() => {
    list.load();
    // useConsole.log('PROPS');
    // useConsole.log(JSON.stringify(props));
  }, []);
  function addAction() {
    navigation.navigate('BuilderEditScreen', { list });
  }
  function BuilderItem(item) {
    return (
      <Pressable
        onPress={() => {
          _click(item);
        }}
      >
        <View className="mb-3 border-b border-gray-200">
          <Text className="font-bold mb-2">{item.name}</Text>
          <View className="flex-row justify-between">
            <Text>{item.project_count} Projects</Text>
            <Text>{item.builderTasks?.count() ?? 0} Tasks</Text>
          </View>
        </View>
      </Pressable>
    );
  }
  return (
    <ListPage
      {...{
        navigation,
        canGoBack: true,
        header: true,
        title: 'Builders',
        subtitle: '',
        addAction,
        loader: list,
      }}
    >
      {list.items.map((item, index) => (
        <BuilderItem key={index} item={item} />
      ))}
      <BottomSheetComponent ctx={viewer}>
        {viewer.data && (
          <Fragment>
            <Text className="text-lg mb-6 font-bold">{viewer.data.name}</Text>
            <View>
              <Text>Builder Tasks</Text>
              {viewer.data.builderTasks.map((t, i) => (
                <Chip key={i} icon="information">
                  {t.name}
                </Chip>
              ))}
            </View>
            <MenuItem
              title="Edit"
              onPress={() =>
                navigation.navigate('BuilderEditScreen', {
                  data: viewer.data,
                  list,
                })
              }
            />
            <DeleteMenuItem menu={viewer} list={list} />
          </Fragment>
        )}
      </BottomSheetComponent>
    </ListPage>
  );
};
export default PurchaseOrdersScreen;
const styles = StyleSheet.create({});
