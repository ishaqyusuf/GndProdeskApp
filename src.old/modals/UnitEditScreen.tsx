import { _sheetOption } from '@src/components/ListPage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import useForm from '@src/utils/use-form';

//
// const auth = Firebase.auth();

const UnitEditScreen = ({ navigation, route }) => {
  const Form = useForm({
    // _key: 'slug',
    // _url: 'homes',
    _route: route,
    navigation,
    _success(data) {},
  });
  useEffect(() => {}, []);
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
export default UnitEditScreen;
const styles = StyleSheet.create({});
