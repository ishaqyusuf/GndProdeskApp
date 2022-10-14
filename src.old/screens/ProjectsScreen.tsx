import ListPage, { _sheetOption } from '@src/components/ListPage';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import useList from '../utils/use-list';
import { BottomSheetComponent, useBottomSheet } from '@src/components/BottomSheet';
import { DeleteMenuItem, MenuItem } from '@src/components/MenuItem';
import { DataDisplay } from '@src/components/Content';
import { useFocusEffect } from '@react-navigation/native';

//
// const auth = Firebase.auth();

const ProjectsScreen = ({ navigation, route }) => {
  const option = useBottomSheet({
    onOpen() {},
  });

  const list = useList('projects', {
    listName: 'projects',
    _url: 'v1/projects',
    _query: {
      ...(route?.params?.query ?? {}),
    },
    // _debug: true,
    _cache: true,
    _filter: {
      search: 'Hello World',
    },
  });
  useFocusEffect(
    useCallback(() => {
      console.log('>>>PROJECT SCREEN');
      list.load();
    }, [])
  );

  // const [selected,setSelection] =

  return (
    <ListPage
      navigation={navigation}
      title="Projects"
      header
      canGoBack
      refreshable
      loader={list}
      addAction={() =>
        navigation.navigate('ProjectEditScreen', {
          listName: list.listName,
        })
      }
      Item={Item}
    >
      {/* <FlatList
        onScrollEndDrag={() => list.loadMore()}
        data={list.state.items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Item item={item} />}
      /> */}

      {/* {list.items.map((item, i) => (
        <Item key={i} item={item} />
      ))} */}

      <BottomSheetComponent ctx={option}>
        <Item item={option.data} readonly={true} />
        <MenuItem
          title="Edit Project"
          onPress={() =>
            navigation.navigate('ProjectEditScreen', {
              data: option.data,
              list,
            })
          }
        />
        <MenuItem
          title="Project Units"
          onPress={() => {
            option.close();
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
                task_page: 'task',
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
        </View>
        {readonly && (
          <View>
            <DataDisplay title="Address" value={item.address} />
            <DataDisplay title="Supervisor" value={item.supervisor_name} />
            <DataDisplay title="Units" value={item.unit_count} />
          </View>
        )}
      </Pressable>
    );
  }
};

//
export default ProjectsScreen;
const styles = StyleSheet.create({});
