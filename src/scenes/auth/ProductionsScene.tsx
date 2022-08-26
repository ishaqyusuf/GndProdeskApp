import { BottomSheetComponent, useBottomSheet } from '@src/components/BottomSheet';
import { DataDisplay } from '@src/components/Content';
import { MenuItem } from '@src/components/MenuItem';
import { TaskItem } from '@src/components/TaskItem';
import { taskApi } from '@src/utils/task-api';
import { ColorLabel } from '@src/utils/use-status-colors';
import React, { Fragment, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from 'react-native-paper';

export default function ProductionScene({ list, TaskActions }) {
  const [ctx, setCtx] = useState({
    isCompleted: false,
  });
  const option = useBottomSheet({
    onOpen() {},
  });

  function ProductionDisplay() {
    return (
      <Fragment>
        <BottomSheetComponent ctx={option}>
          <TaskItem readonly option={option} production menu item={option.data} />
        </BottomSheetComponent>
      </Fragment>
    );
  }
  return {
    App: ProductionDisplay,
    Item: ({ item }) => <TaskItem production option={option} item={item} />,
  };
}
