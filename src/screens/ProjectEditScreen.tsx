import { useAuth } from '@src/auth-provider';
import ListPage, { _sheetOption } from '@src/components/ListPage';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Button } from 'react-native-paper';

import useForm from '@src/utils/use-form';
import useConsole from '@src/utils/use-console';

//
// const auth = Firebase.auth();

const ProjectEditScreen = ({ navigation, params, ...props }) => {
  const auth = useAuth();
  //  const [form,setForm] = useState({})
  const Form = useForm({
    _key: 'slug',
    _url: 'projects',
    ...(params.project ?? {}),
  });
  useEffect(() => {
    Form.setForm(params?.project ?? {});
    useConsole.logScreen('PROJECTS');
  }, []);
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
          <Form.Input label="Builder" name="builder_name" />
          <Form.Input label="Address" name="address" />
          <Form.Input label="Supervisor Name" name="supervisor_name" />
          <Form.Input label="Supervisor Email" name="supervisor_name" />
          <Form.Input label="Supervisor Phone" name="supervisor_name" />
          <View>
            <Form.Button action={true}>Save</Form.Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default ProjectEditScreen;
const styles = StyleSheet.create({});
