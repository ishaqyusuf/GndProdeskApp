import axios from 'axios';

// import I18n from '../i18n';

import { showToast } from './ToastHelper';
import { getHeaders } from './AuthHelper';

import { store } from '../store';
import { onLogOut } from '../actions/auth';
import { getBaseUrl } from './UrlHelper';
import { SET_AUTH_HEADER } from '../contants/actions';

const parseErrorCode = (error) => {
  console.log(error);
  if (error.response) {
    if (error.response.status === 401) {
      store.dispatch(onLogOut());
    } else if (error.response.status === 404) {
      const { message } = error.response.data;
      showToast({ message });
    }
  } else {
    showToast({ message: 'Error' });
  }

  return Promise.reject(error.response);
};

const API = axios.create();

// Request parsing interceptor
API.interceptors.request.use(
  async (config) => {
    const headers = await getHeaders();
    config.baseURL = getBaseUrl();
    console.log({ id: 1 });
    if (headers) {
      config.headers = headers;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response parsing interceptors
API.interceptors.response.use(
  (response) => {
    console.log('response keys');
    console.log(Object.keys(response));
    const headers = response.headers;
    if (headers['Authorization']) {
      store.dispatch({
        type: SET_AUTH_HEADER,
        payload: headers,
      });
    }
    return response.data;
    // return null;
  },
  (error) => parseErrorCode(error)
);
function transformUrl(url) {
  if (typeof url === 'string') return url;
  return url.join('/');
}
const post = (url, data?, config?) => API.post(transformUrl(url), data, config);
const patch = (url, data?, config?) => API.patch(transformUrl(url), data, config);
export default {
  get: (url, config?) => API.get(transformUrl(url), config),
  post,
  patch,
  delete: (url, config?) => API.delete(url, config),
  save: (url, id?, data?, config?) =>
    id ? patch([url, id], data, config) : post(url, data, config),
};
