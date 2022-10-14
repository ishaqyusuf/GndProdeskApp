import { getUniqueId } from 'react-native-device-info';
import { useDispatch } from 'react-redux';
import { initDeviceId } from '../actions/auth';
import { SET_AUTH_HEADER } from '../contants/actions';
import { store } from '../store';

export const getHeaders = async () => {
  try {
    const state = await store.getState();
    console.log(state.auth);
    const {
      headers, //: { 'access-token': accessToken, uid, client },
      // user: { account_id: accountId },
    } = state.auth;
    if (!headers['X-DEVICE-ID']) {
      const uid = await getUniqueId();
      // const d = useDispatch();
      store.dispatch(initDeviceId(uid));
      console.log(uid);
      headers['X-DEVICE-ID'] = uid;
    }
    console.log(headers);
    return {
      ...(headers ?? {}),
    };
  } catch (error) {}
};

export const getPubSubToken = async () => {
  try {
    const state = await store.getState();
    const {
      user: { pubsub_token: pubSubToken },
    } = state.auth;

    return pubSubToken;
  } catch (error) {}
};

export const getUserDetails = async () => {
  try {
    const state = await store.getState();
    const {
      user: { id: userId, account_id: accountId, name, email },
    } = state.auth;
    return { accountId, userId, name, email };
  } catch (error) {}
};
