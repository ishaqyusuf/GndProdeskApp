import { useCallback, useEffect, useState } from 'react';
import useConsole from './use-console';
import useStorage from './use-storage';

async function _load(_ret = false) {
  let _data = await useStorage.get('user', {
    token: null,
    can: {},
    role: null,
    user: null,
  });
  if (_ret) return _data;
  // setAuth({
  //   ..._data,
  //   authLoaded: true,
  // });
  // useAuth.token = _data.token;
  this.authStateChanged(_data);
  // useEffect(() => {
  // useAuth.setAuth({
  //   ..._data,
  //   _authLoaded: true,
  // });
  // useConsole.log(JSON.stringify(_data));
  // });
}
const useAuth = {
  setAuth: null,
  token: '',
  _load,
  async _init() {
    // let _data = await _loadState();
    // useConsole.log('===============INITIALIZING AUTH');
    // const [auth, setAuth] = useState<any>({
    //   ..._data,
    // });
    // this.auth = auth;
    // useConsole.log('AUTH STATE!', auth);
    // this.setAuth = setAuth;
    // // _loadState();
  },
  authStateChanged(data) {
    if (this.authStateCallback) {
      useConsole.log('AUTH STATE CALLING BACK');
      this.authStateCallback({
        ...data,
        authLoaded: true,
      });
    }
  },
  authStateCallback: null,
  onAuthStateChanged(callBack = null) {
    this.authStateCallback = callBack;
  },
  signIn(data) {
    useStorage.set('user', data);
    useConsole.log('SIGNIN');
    this.authStateChanged({
      ...data,
      authLoaded: true,
    });
    // useAuth.setAuth(data);
  },
};

export default useAuth;
