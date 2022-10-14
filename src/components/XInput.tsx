import React from 'react';
import { Controller } from 'react-hook-form';
import { TextInput } from 'react-native-paper';
export default function XInput({ label = '', name = '', control, ...props }) {
  return (
    <Controller
      control={control}
      {...props}
      className="mb-4"
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          mode="outlined"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          label={label}
        />
      )}
      name={name}
    />
  );
}
