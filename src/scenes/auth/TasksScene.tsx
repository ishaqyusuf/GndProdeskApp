import { BottomSheetComponent, useBottomSheet } from '@src/components/BottomSheet';
import Input from '@src/components/Input';
import { MenuItem } from '@src/components/MenuItem';
import { TaskItem } from '@src/components/TaskItem';
import useForm from '@src/utils/use-form';
import React, { Fragment, useContext, useEffect } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from 'react-native-paper';

export default function TasksScene() {
  const option = useBottomSheet({
    page: 'menu', //submit
  });
  const installForm = useForm({
    note: '',
  });

  function App() {
    return (
      <Fragment>
        <BottomSheetComponent ctx={option}>
          <TaskItem readonly option={option} installation menu item={option.data} />
        </BottomSheetComponent>
      </Fragment>
    );
  }

  return {
    App,
    Item: ({ item }) => <TaskItem option={option} item={item} />,
  };
}
