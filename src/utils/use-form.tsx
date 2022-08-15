import { useState } from "react";
import { fetchApi } from './use-fetch';
import useStorage from './use-storage';

import { ActivityIndicator, Button, TextInput as PaperTextInput } from 'react-native-paper';

import React from "react"

const useForm: any = ({
  _rememberKey = null,
  _transformData = null,
  _formLoaded = null,
  _query = null,
  _success = null,
  _url = null,
  _key = "id",
  _debug = false,
  ..._default
}) => {

  let keys = Object.keys(_default)
  const [form, setForm] = useState<any>({
    ..._default,
  });
  function _saveState() {
    if (!_rememberKey) return;
    let raw = {
      ...form,
    };
    let allowed = Object.keys(_default);
    Object.keys(raw)
      .filter((key) => !allowed.includes(key))
      .forEach((key) => delete raw[key]);
    // console.log('SAVING', raw);
    useStorage.set(_rememberKey, raw);
  }
  function _data() {
    let __data = Object.keys(_default).reduce((carry, key) => {
      carry[key] = form[key];
      return carry;
    }, {});
    let __ = _transformData ? _transformData(__data) : __data;
    console.log(__);
    return __;
  }
  function _submit() {
    setSubmitting(true);

   const api = fetchApi({
      debug: _debug,
    });
    const k = form[_key];
    const req = k ? api.patch : api.post; 
      req([_url,k], _data(), _query)
      .then((data) => {
        setSubmitting(false);
        _success && _success(data);
        _set(_key,data[_key] ?? k)
      });
  }
 
  async function __init() {
    console.log('>>>>>>>F<<<<<');
    // return;
    if (_rememberKey) {
      let _state = await useStorage.get(_rememberKey);
      // console.log(_state);
      if (_state) {
        Object.entries(_state).map(([k, v]) => (form[k] = v));
        // ctx((f) => {
        //   return f;
        // });
      }
    }
  }
  // console.log('INITING');
  // __init();
  const [_loading, setLoading] = useState(false);
  const [_submitting, setSubmitting] = useState(false);
  function _set(key,value) {
      if(!keys.includes(key))
        keys.push(key)
            setForm({
              ...form,
              [key]: value
            });
    }
  return {
    state: form,
    _submit,
    _saveState,
    _loading,
    _submitting,setForm,
    _set,
    Button: ({submit = false,cancel = false,children,...props}) => {
      return (<Button onPress={() => {
        
      }} loading={_loading && submit} disabled={_loading} {...props}>
        {_loading && submit && <ActivityIndicator/>}
        {children}
      </Button>)
    },
    Input: ({ label, name, ...props }) => {
      return (   <PaperTextInput
          {...props}
          label={label}
          value={form[name]}
          onChangeText={(text) => {
           _set(name,text)
          }}
        />
      );
    },
  };
};
export default useForm;
