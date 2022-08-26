import { useEffect, useState } from 'react';
import { fetchApi } from './use-fetch';
import useStorage from './use-storage';
import * as dot from 'dot-wild';
import { ActivityIndicator, Button, TextInput as PaperTextInput } from 'react-native-paper';

import React from 'react';
import { useId } from './use-id';
import { useDispatch, useSelector } from 'react-redux';
import { INIT_FORM, PATCH_FORM } from '@src/redux/reducers/form';

const useForm: any = ({
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
  _formId = null,
  navigation = null,
  beforeSubmit = null,
  afterSubmit = null,
  onSubmit = null,
  ..._default
}) => {
  const _d = { ...(_default ?? {}), ...(_route?.params?.data ?? {}) };
  const __data = _transformInput ? _transformInput(_d) : _d;
  const __keys = Object.keys(__data);

  const formId = _formId ?? useId('form');
  const dispatch = useDispatch();
  dispatch({
    type: INIT_FORM,
    formId,
    ..._default,
  });
  const form = useSelector((state) => state[formId]);
  function setState(data) {
    dispatch({
      type: PATCH_FORM,
      formId,
      ...data,
    });
  }
  const list = _list ?? _route?.params?.list;
  const url = _url ?? list?._url;
  const key = _key ?? list?._key;
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
    return form;
  }
  let coldForm = dot.flatten(form);
  async function _submit() {
    __setForm();
    beforeSubmit && beforeSubmit(form);

    onSubmit && onSubmit(form);
    console.log('....');
    if (!url) {
      return;
    }
    setSubmitting(true);

    const api = fetchApi({
      debug: _debug,
      upload: _upload,
    });
    const k = form[key];
    const req = k ? api.patch : api.post;
    req([url, k], _data(), _query).then((data) => {
      setSubmitting(false);
      _success && _success(data);
      if (list) list._addItem(data);
      if (navigation) navigation.goBack();
      else _setValue(key, data[key] ?? k);
    });
  }

  async function __init() {
    // console.log('>>>>>>>F<<<<<');
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
  const [_submittable, setSubmittable] = useState(true);
  const [_submitting, setSubmitting] = useState(false);

  // function _dataKeys(key) {
  //   let _k0 = key.split('.')[0];
  //   if (!__keys.includes(_k0)) {
  //     __keys.push(_k0);
  //   }
  //   // coldForm[key] = value;
  //   // coldForm = dot.set(coldForm, key, value);
  //   // _setValue(key, value);
  // }
  function __setForm(_f = null) {
    // setForm((value) => _f ?? coldForm);
    // setForm((value) => _f ?? dot.expand( coldForm));
    //  console.log('Set Form', _f ?? coldForm);
    //  console.log('Keys', __keys);
  }
  function __dotValue(path) {
    return dot.get({ ...form }, path);
    // return coldForm[path] ?? ''; //dot.get(coldForm,path);
  }
  function _setValue(key, value) {
    let _keys = { ...form }._keys ?? [];
    let _k0 = key.split('.')[0];
    if (!_keys.includes(_k0)) {
      _keys.push(_k0);
    }

    setState({
      key,
      _keys,
      value,
    });
    // _set(name, value);
    // let u = stateUpdate[name];
    // if (u) u();
  }
  // const stateUpdate: any = {};
  return {
    state: { ...form },
    coldForm,
    _submittable,
    __setForm,
    setSubmittable,
    _submit,
    _saveState,
    _loading,
    _submitting,
    // setForm,
    // _set,
    _setValue,
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
      // const [_value, setValue] = useState(__dotValue(name));
      // useEffect(() => {
      //   stateUpdate[name] = () => {
      //     setValue(__dotValue(name));
      //   };
      // }, []);
      return (
        <PaperTextInput
          {...props}
          label={label}
          value={__dotValue(name)}
          className="mb-4"
          mode="outlined"
          dense
          onBlur={() => {}}
          onChangeText={(text) => {
            // setValue(text);
            _setValue(name, text);
          }}
        />
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

export default useForm;
