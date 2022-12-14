import React from 'react';
import { useState } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { Button, ErrorMessage } from '../components';
import useForm from '../utils/use-form';
import { useHeader } from '../utils/use-fetch';
import { Button as PaperButton } from 'react-native-paper';
import { useAuth } from '@src/redux/reducers/auth';

// import Firebase from '../config/firebase';
// import { useTailwind } from 'tailwind-rn';
// const auth = Firebase.auth();

const LoginScreen = ({ navigation }) => {
  const auth = useAuth();

  const Form = useForm({
    user: '',
    password: '',
    _url: 'v1/auth/login',
    _rememberKey: 'login_form',
    //  _transformData(data) {
    //   return {
    //     user: 'pcruz321@gmail.com',
    //     password: ',./'
    //   }
    //  },
    async _success({ data }) {
      useHeader.login(data.token);
      // await handleLogin(_transformUser(data));

      auth.handleLogin(_transformUser(data), true);
      if (data.token) navigation.navigate('App');
      // this.props.navigation
    },
  });
  function _test(k) {
    Form._set(
      'user',
      {
        admin: 'pcruz321@gmail.com',
        installer: 'ariza0611@gmail.com',
        producer: 'samuel65@gmail.com',
      }[k],
      false
    );
    Form._set('password', ',./', false);
    Form._submit();
  }
  function _transformUser(data) {
    const { view_installation, view_project, view_production } = data?.can ?? {};
    return {
      ...data,
      isAdmin: view_project,
      isInstaller: view_installation && !view_project,
      isProducer: view_production && !view_project,
    };
  }
  const [loginError, setLoginError] = useState('');

  const image = {
    uri: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  };

  return (
    <View className="flex-1">
      <ImageBackground source={image} resizeMode="cover" className="flex-1 justify-center">
        {/* <View class='bg-red-' */}

        {/* <StatusBar style="dark-content" /> */}
        <View className="bg-white p-4 m-4 rounded-lg">
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

          {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
          <Button
            onPress={Form._submit}
            backgroundColor="#f57c00"
            title="Login"
            tileColor="#fff"
            titleSize={20}
            containerStyle={{
              marginBottom: 24,
            }}
          />
          {['admin', 'installer', 'producer'].map((k) => (
            <PaperButton onPress={() => _test(k)} className="my-2">
              {k}
            </PaperButton>
          ))}
        </View>
        {/* a */}
      </ImageBackground>
    </View>
  );
};
export default LoginScreen;
