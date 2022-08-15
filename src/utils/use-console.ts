import { LogBox } from 'react-native';

export default {
  logScreen(screen) {
    console.log('**^^^**^^**      ', screen, '**^^**^^**^^');
  },
  log(...args) {
    console.log('.');
    console.log('.');
    console.log(...args);
    console.log('.');
    console.log('.');
    // LogBox.
  },
};
