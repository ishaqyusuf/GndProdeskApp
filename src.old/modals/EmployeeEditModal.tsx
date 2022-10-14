import { useAuth } from '@src/auth-provider';
import ListPage, { _sheetOption } from '@src/components/ListPage';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Appbar, Button, Checkbox } from 'react-native-paper';
import useForm from '@src/utils/use-form';
import useConsole from '@src/utils/use-console';
import { searchContext } from '@src/scenes/ListSearchScene';

//
// const auth = Firebase.auth();

const EmployeeEditModal = ({ navigation, route }) => {
  const auth = useAuth();
  //  const [form,setForm] = useState({})
  const Form = useForm({
    _url: 'builders',
    _route: route,
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
      <Form.Input label="Name" name="name" />
      <Form.Input label="Phone" name="phone" />
      <Form.Input label="Email" name="email" />
      <Form.Input label="Default Password" name="password" />

      <Pressable
        onPress={() => {
          navigation.navigate('Search', {
            ctx: searchContext.roles,
            onSelect({ title, id }, value) {
              Form.coldForm.role_id = id;
              Form.coldForm.role = title;
              Form.__setForm();
            },
          });
        }}
      >
        <Form.Input label="Role" name="role" />
      </Pressable>
      {Form.state.reset_password && (
        <Checkbox.Item
          label="Update User Password"
          status={Form.state.reset_password ? 'checked' : 'unchecked'}
          onPress={() => {
            Form.coldForm.reset_password = !Form.coldForm.reset_password;
            Form.__setForm();
          }}
        />
      )}
      <View>
        <Form.Button submit={true}>Submit</Form.Button>
      </View>
    </View>
  );
};
export default EmployeeEditModal;
const styles = StyleSheet.create({});
