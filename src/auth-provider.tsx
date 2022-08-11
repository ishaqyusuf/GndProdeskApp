import React, { useMemo, useReducer, useContext, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

//IMPORT REDUCER, INITIAL STATE AND ACTION TYPES
import reducer, { initialState, LOGGED_IN, LOGGED_OUT } from './reducer';
import useConsole from './utils/use-console';
import useStorage from './utils/use-storage';
import { useHeader } from './utils/use-fetch';

// CONFIG KEYS [Storage Keys]===================================
// export const TOKEN_KEY = 'token';
export const AUTH_KEY = 'auth';
export const keys = [AUTH_KEY];

// CONTEXT ===================================
const AuthContext = createContext<any>({});

function AuthProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Get Auth state
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

  // Handle Login
  const handleLogin = async (data) => {
    try {
       
      await useStorage.set(AUTH_KEY,data);

      //AXIOS AUTHORIZATION HEADER
      //   axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

      //DISPATCH TO REDUCER
      dispatch({ type: LOGGED_IN, ...data });
    } catch (error) {
      throw new Error(error);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      //REMOVE DATA
      await AsyncStorage.removeItem(AUTH_KEY);
      useHeader.logout()
      //AXIOS AUTHORIZATION HEADER
      //   delete axios.defaults.headers.common['Authorization'];

      //DISPATCH TO REDUCER
      dispatch({ type: LOGGED_OUT });
    } catch (error) {
      throw new Error(error);
    }
  };

  //UPDATE USER LOCAL STORAGE DATA AND DISPATCH TO REDUCER
  const updateAuth = async (auth) => {
    try {
      await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(auth));
      dispatch({ type: LOGGED_IN, ...auth }); //DISPATCH TO REDUCER
    } catch (error) {
      throw new Error(error);
    }
  };

  const value = useMemo(() => {
    return { state, getAuthState, handleLogin, handleLogout, updateAuth };
  }, [state]);

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}

const useAuth = () => useContext(AuthContext);
export { AuthContext, useAuth };
export default AuthProvider;
