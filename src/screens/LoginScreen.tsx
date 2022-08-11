import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button as RNButton, TextInput, ImageBackground } from 'react-native';
import useStorage from '../utils/use-storage';
import { Button,   ErrorMessage } from '../components';
import Input from '../components/Input';
import useForm from '../utils/use-form';
import { NativeModules } from 'react-native' 
import { fetchApi, useHeader } from '../utils/use-fetch';
import Config from 'react-native-config';
import { defineComponent, reactive } from 'reactivue';
import { useAuth } from '../auth-provider';
import useConsole from '../utils/use-console';
 
// import Firebase from '../config/firebase';
// import {useTailwind} from 'tailwind-rn';
// const auth = Firebase.auth();

const LoginScreen =   ({navigation}) => { 



  const {handleLogin} = useAuth();

 
  const  form = useForm({
    user: '',
    password: '',
    _url: 'v1/auth/login',
    _rememberKey: "login_form",
   _transformData(data) {
    return {
      user: 'pcruz321@gmail.com',
      password: ',./'
    }
   },
     async  _success({data}) { 
      useHeader.login(data.token)
        await handleLogin(_transformUser(data))
      if(data.token)
    navigation.navigate('App')
      // this.props.navigation
   }
  });   
   function _test(k) {
    form.user = {
      'admin': 'pcruz321@gmail.com',
      'installer': 'ariza0611@gmail.com',
      'producer': 'samuel65@gmail.com',
    }[k]
    form.password = ',./'
    form._submit();
  }
  function _transformUser(data) {
    const {viewInstallation,viewProject,viewProduction } = data?.can ?? {}
    return {
      ...data,
      isAdmin: viewProject,
      isInstaller: viewInstallation && !viewProject,
      isProducer: viewProduction && !viewProject
    }
  }
  const [loginError, setLoginError] = useState(''); 
  const onLogin = async () => {
    try {
      if (form.state.email !== '' && form.state.password !== '') {
        // await auth.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setLoginError(error.message);
    }
  };
  const image = { uri: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' };
 
   
  
  return (
    <View className="flex-1"> 
    <ImageBackground source={image} resizeMode="cover" className="flex-1 justify-center">
        {/* <View class='bg-red-' */}

      {/* <StatusBar style="dark-content" /> */}
      <View  className="bg-white p-4 m-4 rounded-lg">
        <Text  className="mb-6 text-2xl font-bold">
          Login
        </Text>
      
      <Input placeholder="Email/Username"  autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress" autoFocus={true}  useForm={form} name="user"   label="Email/Username"/>

      <Input placeholder="Enter Password"  autoCapitalize="none"
        keyboardType="email-address"
         textContentType="password"  label="Password" type="password"
        autoCorrect={false} 
        password useForm={form} name="password" />
       
     
      {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
      <Button
        onPress={form._submit}
        backgroundColor="#f57c00"
        title="Login"
        tileColor="#fff"
        titleSize={20}
        containerStyle={{
          marginBottom: 24,
        }}
      />
      {
        ['admin','installer','producer'].map(k => (<Button
        onPress={_test(k)}
        backgroundColor="#f57c00"
        title={k}
        tileColor="#fff"
        titleSize={20}
        containerStyle={{
          marginBottom: 24,
        }}
      />))
      }
      </View> 
      {/* a */}

    </ImageBackground>
    </View>
  );
}
export default LoginScreen;
 
 
