import { useFocusEffect } from '@react-navigation/native';
import PublicNav from '@src/components/home/PublicNav';
import PageLoader from '@src/components/ListPage';
import InstallationsScene from '@src/scenes/auth/InstallationsScene';
import ProductionsScene from '@src/scenes/auth/ProductionsScene';
import TasksScene from '@src/scenes/auth/TasksScene';
import { AppState } from '@src/utils/app-state-provider';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import useList from '../utils/use-list';

const TasksScreen = ({ navigation, ...props }) => {
  let _query = props.query ??
    props.route?.params?.query ?? {
      task_page: 'task',
    };
  let list = composeList();
  console.log(_query);
  function composeList() {
    let listName = [_query.project_slug, _query.unit_slug, _query.task_page, 'list']
      .filter(Boolean)
      .join('-');
    return useList(listName, {
      _url: 'home-tasks',
      // _debug: true,
      _cache: true,
      _query,
    });
  }
  //

  useFocusEffect(
    useCallback(() => {
      if (!list) list = composeList();
      list.load();
    }, [])
  );

  let TaskActions = {};
  console.log(_query.task_page);
  let Context = {
    production: ProductionsScene,
    installation: InstallationsScene,
    task: TasksScene,
  }[_query.task_page]({ list, TaskActions });

  const [title, setTitle] = useState(
    { task: 'Tasks', installation: 'Installations', production: 'productions' }[_query.task_page]
  );
  const [subtitle, setSubtitle] = useState({}[_query.task_page] ?? '');

  return (
    <>
      {props.withStats && <PublicNav type={_query.task_page} navigation={navigation} />}

      <PageLoader
        header={!props.widget}
        widget={props.widget}
        navigation={navigation}
        canGoBack
        title={title}
        subtitle={subtitle}
        loader={list}
        Item={Context.Item}
      >
        <Context.App />
        {/* <FlatList
          data={list.state.items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Context.Item item={item} />
            </TouchableOpacity>
          )}
        /> */}

        {props.widget && (
          <View>
            <Button
              onPress={() => {
                // props.viewAll()
                navigation.navigate('TasksScreen', {
                  query: _query,
                });
              }}
            >
              View All
            </Button>
          </View>
        )}
      </PageLoader>
    </>
  );
};
export default TasksScreen;
const styles = StyleSheet.create({});
