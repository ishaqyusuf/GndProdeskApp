import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHeader } from '@src/utils/use-fetch';
import useStorage from '@src/utils/use-storage';
import { useDispatch, useSelector } from 'react-redux';

export const initialState = {
  isLoggedIn: false,
  user: null,
  can: null,
  token: null,
  homeScreen: null,
};
export const AUTH_KEY = 'x-auth';
export const keys = [AUTH_KEY];
export const LOGGED_IN = `auth/LOGGED_IN`;
export const LOGGED_OUT = `auth/LOGGED_OUT`;
export function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGGED_IN: {
      let { user, can, token } = action;
      let { viewProduction, viewInstallation, viewProject, viewInvoice } = can;
      // let dashKey =  {
      //   'production': viewProduction && !viewProject && !viewInvoice,
      //   'installation': viewInstallation && !viewProject && !
      // }
      // const homeScreen =
      //   {

      //   } [dashKey]
      return { ...state, isLoggedIn: true, user, token, can };
    }

    case LOGGED_OUT: {
      return { ...state, ...initialState };
    }

    default:
      return state;
  }
}

export function useAuth() {
  const dispatch = useDispatch();
  const state = useSelector<any, any>((_state) => _state.auth);
  const handleLogin = async (data, fresh = false) => {
    try {
      if (fresh) {
        useHeader.login(data.token);
        await useStorage.set(AUTH_KEY, data);
      }

      //AXIOS AUTHORIZATION HEADER
      //   axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

      //DISPATCH TO REDUCER
      dispatch({ type: LOGGED_IN, ...data });
    } catch (error) {
      throw new Error(error);
    }
  };
  const handleLogout = async () => {
    try {
      //REMOVE DATA
      await AsyncStorage.removeItem(AUTH_KEY);
      // AsyncStorage.clear();
      useHeader.logout();
      //AXIOS AUTHORIZATION HEADER
      //   delete axios.defaults.headers.common['Authorization'];

      //DISPATCH TO REDUCER
      dispatch({ type: LOGGED_OUT });
    } catch (error) {
      throw new Error(error);
    }
  };
  const updateAuth = async (auth) => {
    try {
      await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(auth));
      dispatch({ type: LOGGED_IN, ...auth }); //DISPATCH TO REDUCER
    } catch (error) {
      throw new Error(error);
    }
  };
  const getAuthState = async () => {
    try {
      //GET TOKEN && USER
      // let token = await AsyncStorage.getItem(TOKEN_KEY);
      let auth = await useStorage.get(AUTH_KEY);
      if (auth !== null) await handleLogin(auth);
      else await handleLogout();

      return auth;
    } catch (error) {
      throw new Error(error);
    }
  };
  // console.log(state.type);
  return {
    state,
    handleLogin,
    getAuthState,
    handleLogout,
    updateAuth,
  };
}
