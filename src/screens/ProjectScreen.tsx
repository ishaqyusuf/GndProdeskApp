import { useAuth } from '@src/auth-provider';
import ListPage, { _sheetOption } from '@src/components/ListPage';
import React, { useContext, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import useList from '../utils/use-list';
import { BottomSheetComponent, useBottomSheet } from '@src/components/BottomSheet';
import { DeleteMenuItem, MenuItem } from '@src/components/MenuItem';
import { DataDisplay } from '@src/components/Content';

//
// const auth = Firebase.auth();

const ProjectScreen = ({ navigation, route }) => {
  const option = useBottomSheet({
    onOpen() {},
  });

  const auth = useAuth();
  const list = useList({
    _url: 'v1/projects',
    _query: {
      ...(route?.params?.query ?? {}),
    },
    _cache: true,
  });
  useEffect(() => {
    list.load();
  }, []);

  // const [selected,setSelection] =

  return (
    <ListPage
      navigation={navigation}
      title="Projects"
      header
      canGoBack
      loader={list}
      addAction={() => navigation.navigate('ProjectEditScreen')}
    >
      {list.items.map((item, i) => (
        <Item key={i} item={item} />
      ))}

      <BottomSheetComponent ctx={option}>
        <Item item={option.data} readonly={true} />
        <MenuItem
          title="Edit Project"
          onPress={() =>
            navigation.navigate('ProjectEditScreen', {
              project: option.data,
            })
          }
        />
        <MenuItem
          title="Project Units"
          onPress={() => {
            navigation.navigate('UnitsScreen', {
              query: {
                project_slug: option.data.slug,
              },
            });
          }}
        />
        <MenuItem
          title="View Tasks"
          onPress={() => {
            navigation.navigate('TasksScreen', {
              query: {
                task_page: 'tasks',
                project_slug: option.data.slug,
              },
            });
          }}
        />
        <DeleteMenuItem menu={option} list={list} />
      </BottomSheetComponent>
    </ListPage>
  );
  function Item({ item, readonly = false }) {
    return (
      <Pressable
        onPress={() => {
          !readonly && option.open(item);
        }}
      >
        <View className="px-4 py-3 border-b border-gray-300">
          <View className="flex-row justify-between">
            <Text className="font-bold">{item.title} </Text>
            <Text className=""> {item.unit_count} </Text>
          </View>
          <View className="flex-row justify-between">
            {/* <Text>{item.meta.lot_block}</Text> */}
            <Text>
              {item.ref_no} | {item.builder_name}
            </Text>
            {/* <Label status={item.install_status}/> */}
          </View>
          {readonly && (
            <View>
              <DataDisplay title="Address" value={item.address} />
              <DataDisplay title="Supervisor" value={item.supervisor_name} />
              <DataDisplay title="Units" value={item.unit_count} />
            </View>
          )}
        </View>
      </Pressable>
    );
  }
};

//
export default ProjectScreen;
const styles = StyleSheet.create({});
