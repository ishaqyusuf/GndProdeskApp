import PublicNav from '@src/components/home/PublicNav';
import PageLoader from '@src/components/ListPage';
import InstallationsScene from '@src/scenes/auth/InstallationsScene';
import ProductionsScene from '@src/scenes/auth/ProductionsScene';
import TasksScene from '@src/scenes/auth/TasksScene';
import useConsole from '@src/utils/use-console';
import React, { Fragment, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import useList from '../utils/use-list';

const TasksScreen = ({ navigation, ...props }) => {
  let _query = props.query ??
    props.route?.params?.query ?? {
      task_page: 'task',
    };
  const list = useList({
    _url: 'unit-tasks',
    // _debug: true,
    _cache: true,
    _query,
  });
  //
  useEffect(() => {
    list.load();
    useConsole.logScreen('TASKS');
  }, []);

  //
  //  useConsole.log(props.query)
  let Context = {
    production: ProductionsScene,
    installation: InstallationsScene,
    task: TasksScene,
  }[_query.task_page]({ list });

  const [title, setTitle] = useState(
    { task: 'Tasks', installation: 'Installations', production: 'productions' }[_query.task_page]
  );
  const [subtitle, setSubtitle] = useState({}[_query.task_page] ?? '');

  return (
    <Fragment>
      {props.withStats && <PublicNav type={_query.task_page} navigation={navigation} />}
      <PageLoader
        header={!props.widget}
        widget={props.widget}
        navigation={navigation}
        canGoBack
        title={title}
        subtitle={subtitle}
        loader={list}
      >
        <Context.App />
        {list.items.map((item, i) => (
          <Context.Item key={i} item={item} />
        ))}
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
    </Fragment>
  );
};
export default TasksScreen;
const styles = StyleSheet.create({});
