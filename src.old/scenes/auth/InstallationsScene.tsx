import { BottomSheetComponent, useBottomSheet } from '@src/components/BottomSheet';
import { DataDisplay } from '@src/components/Content';
import { MenuItem } from '@src/components/MenuItem';
import { TaskItem } from '@src/components/TaskItem';
import { taskApi } from '@src/utils/task-api';
import { fetchApi } from '@src/utils/use-fetch';
import useForm from '@src/utils/use-form';
import { ColorLabel } from '@src/utils/use-status-colors';
import React, { Fragment, useState } from 'react';
import { Pressable, View } from 'react-native';
import { ActivityIndicator, Button, Text, TextInput } from 'react-native-paper';

export default function InstallationsScene({ list, TaskActions }) {
  const option = useBottomSheet({
    page: 'menu', //submit
    onOpen() {
      setCompleteForm(false);
      setSaving(false);
      setNote('');
    },
  });
  const [completeForm, setCompleteForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [note, setNote] = useState('');
  const Form = useForm({
    _url: 'unit-tasks',
  });
  const api = taskApi(list, option);
  function App() {
    return (
      <Fragment>
        <BottomSheetComponent ctx={option}>
          <TaskItem readonly option={option} installation menu item={option.data} />
        </BottomSheetComponent>
      </Fragment>
    );
  }
  function Item({ item, readonly }) {
    return (
      item && (
        <Pressable
          onPress={() => {
            !readonly && option.open(item);
          }}
        >
          <View className="px-4 py-3 border-b border-gray-300">
            <Text className="font-bold">
              {item.meta.project_title} - {item.meta.lot_block}
            </Text>
            <View className="flex-row justify-between">
              {/* <Text>{item.meta.lot_block}</Text> */}
              <Text>{item.title}</Text>
              <ColorLabel status={item.meta.install_status ?? 'Pending'} />
            </View>
            {readonly && (
              <View>
                <DataDisplay title="Assigned at" value={item.meta.assigned_install_at} />
                <DataDisplay title="Started At" value={item.meta.install_started_at} />
                <DataDisplay title="Completed At" value={item.meta.installed_at} />
                <DataDisplay title="Installer" value={item.meta.installer_name} />
              </View>
            )}
          </View>
        </Pressable>
      )
    );
  }
  function InstallationForm() {
    return (
      <View className="p-4">
        <TextInput
          multiline
          placeholder="Information"
          value={note}
          onChangeText={(text) => setNote(text)}
        />
        <View>
          <Button
            loading={saving}
            onPress={() => {
              api.installCompleted(option.data, note);
            }}
            color="green"
          >
            Save
          </Button>
        </View>
      </View>
    );
  }
  return {
    App,
    Item: ({ item }) => <TaskItem installation option={option} item={item} />,
  };
}
