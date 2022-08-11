module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['tailwindcss-react-native/babel'],
    [
      'module-resolver',
      {
        alias: {
          // '@': './src',
          '@src': './src',
        },
      },
    ],
  ],
};
