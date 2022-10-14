import { useAuth } from '@src/auth-provider';
import ListPage, { _sheetOption } from '@src/components/ListPage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import useForm from '@src/utils/use-form';
import useConsole from '@src/utils/use-console';

//
// const auth = Firebase.auth();

const RoleEditModal = ({ navigation, route }) => {
  function _click(item) {
    navigation.navigate('UnitsPage', {
      project_slug: item.slug,
    });
  }
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
      <Form.Input label="Model No" name="model" />
      <Form.Input label="Lot" name="lot" />
      <Form.Input label="Block" name="block" />
      <Form.Input label="Home Key" name="home_key" />
      <Form.Input label="Status" name="status" />

      <View>
        <Form.Button submit={true}>Submit</Form.Button>
      </View>
    </View>
  );
};
export default RoleEditModal;
const styles = StyleSheet.create({});
