import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
  async set(name, value) {
    console.log(['SETTING STORAGE', name, value]);
    return AsyncStorage.setItem(name, JSON.stringify({ value }));
  },
  async get(key, _default: any = null) {
    let data: any = await AsyncStorage.getItem(key);
    if (data) {
      let _ = JSON.parse(data);
      // console.log(['GETTING STORAGE', key, _.value]);
      console.log('GET STORAGE:', key);
      return _.value;
    } else {
      console.log('NO SAVED DATA FOR: ', key);
    }
    // let _value = JSON.parse(data?.value ?? '{}')?.value ?? _default;
    // console.log([JSON.parse(data), data]);
    return _default;
  },
  remove(key) {
    console.log(['REMOVING  STORAGE', key]);
    AsyncStorage.removeItem(key);
  },
};
