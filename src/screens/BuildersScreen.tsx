import { useFocusEffect } from '@react-navigation/native';
import { BottomSheetComponent, useBottomSheet } from '@src/components/BottomSheet';
import ListPage, { _sheetOption } from '@src/components/ListPage';
import { DeleteMenuItem, MenuItem } from '@src/components/MenuItem';
import React, { Fragment, useCallback, useEffect } from 'react';
import { InteractionManager, Pressable, StyleSheet, View } from 'react-native';
import { Appbar, Chip, List, Text } from 'react-native-paper';
import useList from '../utils/use-list';

//
// const auth = Firebase.auth();

const BuildersScreen = ({ navigation, props }) => {
  const list = useList('builders', {
    _url: 'builders',
    _query: {},
  });
  const viewer = useBottomSheet();

  function _click(item) {
    viewer.open(item);
  }
  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        list.load();
      });
      return () => task.cancel();
    }, [])
  );

  function addAction() {
    navigation.navigate('BuilderEditScreen', { listName: 'builders' });
  }
  function BuilderItem({ item }) {
    return (
      <Pressable
        onPress={() => {
          _click(item);
        }}
      >
        <View className="px-4 py-3 border-b border-gray-300">
          <Text className="font-bold capitalize">{item.name}</Text>
          <View className="flex-row justify-between">
            <Text>{item.project_count} Projects</Text>
            <Text>{item.builderTasks?.length ?? 0} Tasks</Text>
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
      Item={({ item }) => <BuilderItem item={item} />}
    >
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
export default BuildersScreen;
const styles = StyleSheet.create({});
