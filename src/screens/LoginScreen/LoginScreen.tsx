import React, { useEffect } from 'react';
import { ImageBackground, ScrollView, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
// import { useForm, Controller } from 'react-hook-form';
import { doLogin } from '../../actions/auth';
import Button from '../../components/Button';
import useForm from '../../components/Form';
import XInput from '../../components/XInput';
const defaultProps = {
  onLogin: () => {},
  isLoggingIn: false,
};
const propTypes = {
  // eva: PropTypes.shape({
  //   style: PropTypes.object,
  // }).isRequired,
  onLogin: PropTypes.func,
  isLoggingIn: PropTypes.bool,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  resetAuth: PropTypes.func,
  installationUrl: PropTypes.string,
};
const LoginScreenComponent = ({ navigation }) => {
  const dispatch = useDispatch();
  const isLoggingIn = useSelector<any, any>((state) => state.auth.isLoggingIn);
  const onSubmit = (data) => {
    console.log('SUBMITED!');
    dispatch(doLogin(data));
  };
  const Form = useForm({
    user: 'pcruz321@gmail.com',
    password: ',./',
    // user: '',
    // password: '',
    _url: 'auth/login',
    _rememberKey: 'login_form',
    _success: onSubmit,
  });

  // const {
  //   control,
  //   handleSubmit,
  //   register,
  //   formState: { errors, ...ext },
  // } = useForm({
  //   mode: 'onBlur',
  //   defaultValues: {
  //     email: '',
  //     password: '',
  //   },
  // });
  const image = {
    uri: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  };
  return (
    <View className="flex-1">
      <ImageBackground source={image} resizeMode="cover" className="flex-1 justify-center">
        <View className="bg-white p-4 m-4 rounded-lg ">
          <Text>{JSON.stringify(Form._data())}</Text>
          <Text className="mb-6 text-2xl font-bold">Login</Text>
          <Form.Input
            placeholder="Email/Username"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            name="user"
            label="Email/Username"
          />
          <Form.Input
            placeholder="Enter Password"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="password"
            label="Password"
            type="password"
            autoCorrect={false}
            password
            name="password"
          />
          <Form.Button submit>Login</Form.Button>
        </View>
      </ImageBackground>
    </View>
  );
};

LoginScreenComponent.propTypes = propTypes;
LoginScreenComponent.defaultProps = defaultProps;
const LoginScreen = LoginScreenComponent;
export default LoginScreen;
