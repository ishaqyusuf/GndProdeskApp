import { Icon } from '@rneui/themed';
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Label from './Label';
import {  TextInput as PaperTextInput } from 'react-native-paper';
const Input: React.FC<any> = ({ prefix = null,
  useForm = null as any,
  rightIcon = null, dark = false, password = false, label = null, ...rest }) => {

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordIcon, setPasswordIcon] = useState('eye');
  const {state,ctx,_set,_saveState} = useForm; 
const [isFocused, setIsFocused] = useState(false);
const handlePasswordVisibility = () => {
    if (passwordIcon === 'eye') {
      setPasswordIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (passwordIcon === 'eye-off') {
      setPasswordIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };
  function onBlur() {
    setIsFocused(false)
    console.log("Blured")
    _saveState();
  }
  // ss 
  return (
    <View
    className="mb-4"
    >
      <Label dark={dark}>{label}</Label>
      <View className={
        `flex-row items-center mt-2 border-2 rounded-lg ${isFocused ? 'border-red-500' : 'border-gray-400'}`
      }>
        {
          prefix && <Text className="ml-2 font-semibold">
            {prefix}
          </Text>
        }
        <TextInput
        {...rest}
        value={state[rest.name]}
           onBlur={() => onBlur}
      onFocus={() => setIsFocused(true)}
        onChangeText={(text) => _set(rest.name,text)}
         secureTextEntry={passwordVisibility}
        className="px-3  flex-1"
      />
      {password ? (
        <TouchableOpacity className="pr-4" onPress={handlePasswordVisibility}>
          <Icon name={passwordIcon} size={20} iconColor="#000"  className="self-center ml-10" />
        </TouchableOpacity>
      ) : null}
      </View>
    </View>
  );
}
export default Input;
 