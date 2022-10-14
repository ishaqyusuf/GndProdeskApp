import { useAuth } from '@src/auth-provider';
import { _sheetOption } from '@src/components/ListPage';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import useForm from '@src/utils/use-form';
import useConsole from '@src/utils/use-console';
import useList from '@src/utils/use-list';

//
// const auth = Firebase.auth();

const BuilderEditScreen = ({ navigation, route }) => {
  const auth = useAuth();
  const list = useList('builders', {});
  const Form = useForm({
    _route: route,
    navigation,
    async onSubmit(form) {
      const s = await list.createItem(form);
      if (s) navigation.goBack();
    },
    _success(data) {},
  });
  useEffect(() => {
    // Form.init();
    useConsole.logScreen('Builders');
  }, []);
  const [title, setTitle] = useState('Create Unit');
  return (
    <View>
      <Appbar.Header className="bg-white">
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title={title} />
      </Appbar.Header>
      <ScrollView className="m-4">
        <Form.Input label="Builder" name="name" />
        <Form.Input label="Address" name="address" />
        <View>
          <Form.Button submit={true}>Submit</Form.Button>
        </View>
      </ScrollView>
    </View>
  );
};
export default BuilderEditScreen;
const styles = StyleSheet.create({});
