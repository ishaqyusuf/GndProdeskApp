import { LogBox } from 'react-native';

export default {
  log(...args) {
    console.warn('.');
    console.warn('.');
    console.log(...args);
    console.warn('.');
    console.warn('.');
    // LogBox.
  },
};
