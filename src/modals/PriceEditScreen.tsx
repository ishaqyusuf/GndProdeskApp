import { useAuth } from '@src/auth-provider';
import ListPage, { _sheetOption } from '@src/components/ListPage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Button, IconButton, Text, TouchableRipple } from 'react-native-paper';
import useForm from '@src/utils/use-form';
import { searchContext } from '@src/scenes/ListSearchScene';
import DocumentPicker from 'react-native-document-picker';
//
// const auth = Firebase.auth();

const PriceEditScreen = ({ navigation, route }) => {
  const auth = useAuth();
  //  const [form,setForm] = useState({})
  const Form = useForm({
    _key: 'slug',
    _url: 'v1/orders',
    _route: route,
    _upload: true,
    _success(data) {},
  });
  useEffect(() => {
    // Form.setForm(project ?? {});
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
      <Form.Input label="Order No" name="order_id" />
      <Form.Input label="Name" name="name" />
      <Form.Input label="Phone" name="phone" />

      <TouchableRipple
        rippleColor="rgba(0, 0, 0, .32)"
        onPress={() => {
          navigation.navigate('Search', {
            ctx: searchContext.order_status,
            onSelect({ supplier }, value) {
              Form.coldForm.supplier = supplier;
              Form.__setForm();
            },
          });
        }}
      >
        <Form.Input label="Supplier" name="supplier" />
      </TouchableRipple>
      <TouchableRipple
        rippleColor="rgba(0, 0, 0, .32)"
        onPress={() => {
          navigation.navigate('Search', {
            ctx: searchContext.order_status,
            onSelect({ status }, value) {
              Form.coldForm.status = status;
              Form.__setForm();
            },
          });
        }}
      >
        <Form.Input label="Status" name="status" />
      </TouchableRipple>
      {Form.state.attachment ? (
        <View>
          <Text className="">{Form.state.attachment.name}</Text>
          <IconButton
            icon="delete"
            onPress={() => {
              Form.coldForm.attachment = null;
              Form.__setForm();
            }}
          ></IconButton>
        </View>
      ) : (
        <IconButton
          icon="upload"
          onPress={() => {
            DocumentPicker.pick({
              type: [DocumentPicker.types.pdf],
            }).then((file) => {
              Form.coldForm.attachment = {
                file: file[0],
                name: file[0].name,
              };
              Form.__setForm();
            });
          }}
        ></IconButton>
      )}
      <View>
        <Form.Button submit={true}>Submit</Form.Button>
      </View>
    </View>
  );
};
export default PriceEditScreen;
const styles = StyleSheet.create({});
