import { useState } from 'react';

import useStorage from '../utils/use-storage';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';

import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import API from '../helpers/APIHelper';
// import { useFaker } from './faker';

const _useForm: any = ({
  _rememberKey = null,
  _transformInput = null,
  _transform = null,
  _formLoaded = null,
  _query = null,
  _success = null,
  _list = null,
  _url = null,
  _key = 'id',
  _debug = false,
  _upload = false,
  _route = null,
  navigation = null,
  beforeSubmit = null,
  afterSubmit = null,
  onSubmit = null,
  ..._default
}) => {
  const _d = { ...(_default ?? {}), ...(_route?.params?.data ?? {}) };
  const __data = _transformInput ? _transformInput(_d) : _d;
  const {
    control,
    handleSubmit,
    // register,
    formState: { errors, ...ext },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      ...__data,
      // ...(await __defaultValues(__data)),
    },
  });

  const list = _list ?? _route?.params?.list;
  const url = _url ?? list?._url;
  const key = _key ?? list?._key;
  function _saveState() {
    if (!_rememberKey) return;
    useStorage.set(_rememberKey, control._formValues);
  }
  function _data() {
    return _transform ? _transform(control._formValues) : control._formValues;
  }
  async function _submit() {
    beforeSubmit && beforeSubmit(_data());
    if (onSubmit) {
      setSubmitting(true);
      await onSubmit(_data());
      setSubmitting(false);
    }
    if (!url) {
      return;
    }
    setSubmitting(true);
    const form = _data();
    const id = form[key];
    console.log(url);
    console.log(form);
    console.log(id);
    API.save(url, id, form)
      .then((data) => {
        console.log(data);
        setSubmitting(false);
        _success && _success(data);
        //   if (list) list._addItem(data);
        //   if (navigation) navigation.goBack();
        //   else _set(key, data[key] ?? k);
        console.log(data);
      })
      .catch((e) => {
        setSubmitting(false);
        //
      });
  }
  async function __defaultValues(v) {
    if (_rememberKey) {
      const s = await useStorage.get(_rememberKey);
      if (s) return s;
    }
    return v;
  }
  const [_loading, setLoading] = useState(false);
  const [_submittable, setSubmittable] = useState(true);
  const [_submitting, setSubmitting] = useState(false);

  const stateUpdate: any = {};
  return {
    _submittable,
    _data,
    setSubmittable,
    _submit,
    _saveState,
    _loading,
    _submitting,
    Faker({ k }) {
      return (
        <Button
          onPress={() => {
            useFaker(k, {
              form: coldForm,
              setForm: __setForm,
            });
          }}
        >
          FAKE
        </Button>
      );
    },
    Button: ({ submit = false, cancel = false, children, ...props }) => {
      return (
        <Button
          onPress={() => {
            if (submit) {
              _submit();
            }
          }}
          loading={_loading && submit}
          disabled={_loading}
          {...props}
        >
          {_loading && submit && <ActivityIndicator />}
          {children}
        </Button>
      );
    },
    // SearchInput({label,name,})
    Input: ({ label, name, ...props }) => {
      return (
        <View className="mb-4">
          <Controller
            control={control}
            {...props}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                label={label}
              />
            )}
            name={name}
          />
        </View>
      );
      // function InputSelection({ children }) {

      //   return <Pressable onPress={() => {
      //     navigation.navigate('SearchInput',)
      //   }}>{children}</Pressable>;
      // }
      // return select ? (
      //   <InputSelection>
      //     <Input />
      //   </InputSelection>
      // ) : (
      //   <Input />
      // );
    },
  };
};

export default _useForm;
