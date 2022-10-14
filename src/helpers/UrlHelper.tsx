import { Platform, Linking } from 'react-native';

import { store } from '../store';

export const getBaseUrl = () => {
  const __url = 'http://localhost:8000/api';
  return __url;
};

export const openURL = ({ URL }) => {
  //   if (Platform.OS === 'ios') {
  //     SafariView.show({
  //       url: URL,
  //     });
  //   } else {
  //     Linking.openURL(URL);
  //   }
};

export const openNumber = ({ Number }) => {
  Linking.openURL(`tel:${Number}`);
};
