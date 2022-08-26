import { useAuth } from '@src/auth-provider';
import { _sheetOption } from '@src/components/ListPage';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Appbar, Button } from 'react-native-paper';

import useForm from '@src/utils/use-form';
import useConsole from '@src/utils/use-console';
import { BottomSheetComponent, useBottomSheet } from '@src/components/BottomSheet';
import useList from '@src/utils/use-list';
import { searchContext } from '@src/scenes/ListSearchScene';

//
// const auth = Firebase.auth();

const ProjectEditScreen = ({ navigation, route, ...props }) => {
  const auth = useAuth();
  const list = useList('projects', {});
  console.log(list.state?._url);
  //  const [form,setForm] = useState({})
  const Form = useForm({
    navigation,
    _route: route,
    async onSubmit(form) {
      console.log(form);
      const s = await list.createItem(form);
      if (s) navigation.goBack();
      return s;
    },
  });
  // useEffect(() => {
  //   // Form.init();
  //   useConsole.logScreen('PROJECTS');
  // }, []);
  const [title, setTitle] = useState('Create Project');

  return (
    <View className="flex-1">
      <Appbar.Header className="bg-white">
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title={title} />
      </Appbar.Header>
      <ScrollView>
        <View className="m-4 space-y-4">
          <Form.Input label="Title" name="title" />
          <Form.Input label="Reference No" name="ref_no" />
          <Pressable
            onPress={() =>
              navigation.navigate('Search', {
                ctx: searchContext.builders,
                onSelect({ name, id }) {
                  Form.coldForm.builder_name = name;
                  Form.coldForm.builder_id = id;
                  Form.__setForm();
                },
              })
            }
          >
            <Form.Input label="Builder" editable={false} name="builder_name" />
          </Pressable>
          <Form.Input label="Address" name="address" />
          <Form.Input label="Supervisor Name" name="supervisor_name" />
          <Form.Input label="Supervisor Email" name="supervisor_email" />
          <Form.Input label="Supervisor Phone" name="supervisor_phone" />
          <View>
            <Form.Faker k="project" />
            <Form.Button submit={true}>Save</Form.Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default ProjectEditScreen;
const styles = StyleSheet.create({});
