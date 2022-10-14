import { NativeModules } from 'react-native';

export default {
  get: () => {
    return {
      visitor_id: NativeModules.PlatformConstants.Fingerprint,
    };
  },
};
