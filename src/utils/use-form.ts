import { useState } from 'react';
import { fetchApi } from './use-fetch';
import useStorage from './use-storage';

const useForm = ({
  _rememberKey = null,
  _transformData = null,
  _formLoaded = null,
  _query = null,
  _success = null,
  _url,
  ..._default
}) => {
  const [form, ctx] = useState<any>({
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

    fetchApi({
      debug: true,
    })
      .post(_url, _data(), _query)
      .then((data) => {
        //
        // console.log(data);
        setSubmitting(false);
        _success && _success(data);
      });
  }
  function _set(k, v, saveState = true) {
    return ctx((f) => {
      f[k] = v;
      if (!Object.keys(_default).includes(k)) _default[k] = v;
      console.log(Object.keys(_default));

      if (saveState) _saveState();
      // console.log(f);
      return {
        ...f,
      };
    });
    //   this[k] = v;
    //   return this;
  }
  async function __init() {
    console.log('>>>>>>>F<<<<<');
    // return;
    if (_rememberKey) {
      let _state = await useStorage.get(_rememberKey);
      // console.log(_state);
      if (_state) {
        Object.entries(_state).map(([k, v]) => (form[k] = v));
        ctx((f) => {
          return f;
        });
      }
    }
  }
  // console.log('INITING');
  // __init();
  const [_loading, setLoading] = useState(false);
  const [_submitting, setSubmitting] = useState(false);
  return { state: form, ctx, _set, _submit, _saveState, _loading, _submitting };
};
export default useForm;
